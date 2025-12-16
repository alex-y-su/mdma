import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import scriptAPI from "services/entities/scripts";
import { NotificationContext } from "context/notification";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import { AxiosResponse } from "axios";
import { IApiError } from "../../../../../interfaces/errors";
import { getErrorMessage } from "../ScriptUploadModal/helpers";

const baseClass = "delete-script-modal";

interface IDeleteScriptModalProps {
  scriptName: string;
  scriptId: number;
  onCancel: () => void;
  afterDelete: () => void;
  isHidden?: boolean;
}

const DeleteScriptModal = ({
  scriptName,
  scriptId,
  onCancel,
  afterDelete,
  isHidden = false,
}: IDeleteScriptModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const onClickDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await scriptAPI.deleteScript(id);
      renderFlash("success", "Successfully deleted!");
    } catch (e) {
      const error = e as AxiosResponse<IApiError>;
      const apiErrMessage = getErrorMessage(error);
      renderFlash(
        "error",
        apiErrMessage.includes("Policy automation")
          ? apiErrMessage
          : "Couldn’t delete. Please try again."
      );
    }
    setIsDeleting(false);
    afterDelete();
  };

  return (
    <Modal
      className={baseClass}
      title={t("controls.scripts.modals.delete.title")}
      onExit={onCancel}
      onEnter={() => onClickDelete(scriptId)}
      isHidden={isHidden}
      isContentDisabled={isDeleting}
    >
      <>
        <p>
          {t("controls.scripts.modals.delete.message", { name: scriptName })}
        </p>
        <p>{t("controls.scripts.modals.delete.warning")}</p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={() => onClickDelete(scriptId)}
            variant="alert"
            className="delete-loading"
            isLoading={isDeleting}
          >
            {t("controls.scripts.deleteScript")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteScriptModal;

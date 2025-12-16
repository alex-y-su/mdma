import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import mdmAppleAPI from "services/entities/mdm_apple";
import { NotificationContext } from "context/notification";

import Button from "components/buttons/Button";
import Modal from "components/Modal";

const baseClass = "delete-vpp-modal";

interface IDeleteVppModalProps {
  orgName: string;
  tokenId: number;
  onCancel: () => void;
  onDeletedToken: () => void;
}

const DeleteVppModal = ({
  orgName,
  tokenId,
  onCancel,
  onDeletedToken,
}: IDeleteVppModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);

  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteToken = useCallback(async () => {
    setIsDeleting(true);

    try {
      await mdmAppleAPI.deleteVppToken(tokenId);
      renderFlash("success", t("mdmSettings.vpp.deleteModal.deleteSuccess"));
      onDeletedToken();
    } catch (e) {
      // TODO: Check API sends back correct error messages
      renderFlash("error", t("mdmSettings.vpp.deleteModal.deleteError"));
      onCancel();
    }
  }, [onCancel, onDeletedToken, renderFlash, tokenId, t]);

  return (
    <Modal
      title={t("mdmSettings.vpp.deleteModal.title")}
      className={baseClass}
      onExit={onCancel}
      isContentDisabled={isDeleting}
    >
      <>
        <p>{t("mdmSettings.vpp.deleteModal.warning", { orgName })}</p>
        <p>{t("mdmSettings.vpp.deleteModal.reEnableInfo")}</p>

        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onDeleteToken}
            disabled={isDeleting}
            isLoading={isDeleting}
          >
            {t("mdmSettings.vpp.deleteModal.deleteButton")}
          </Button>
          <Button
            onClick={onCancel}
            disabled={isDeleting}
            variant="inverse-alert"
          >
            {t("mdmSettings.vpp.deleteModal.cancelButton")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteVppModal;

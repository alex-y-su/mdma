import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "components/Modal";
import Button from "components/buttons/Button";
import TooltipTruncatedText from "components/TooltipTruncatedText";
import { ISecret } from "interfaces/secrets";
import { NotificationContext } from "context/notification";

import formatErrorResponse from "utilities/format_error_response";
import secretsAPI from "services/entities/secrets";

interface DeleteSecretModalProps {
  secret: ISecret | undefined;
  onExit: () => void;
  onDeleteSecret: () => void;
}

const baseClass = "fleet-delete-secret-modal";

const DeleteSecretModal = ({
  secret,
  onExit,
  onDeleteSecret,
}: DeleteSecretModalProps) => {
  const { t } = useTranslation("settings");
  const [isDeleting, setIsDeleting] = useState(false);

  const { renderFlash } = useContext(NotificationContext);

  const onClickDelete = async () => {
    if (!secret) {
      return;
    }
    setIsDeleting(true);
    try {
      await secretsAPI.deleteSecret(secret.id);
      renderFlash("success", "Variable successfully deleted.");
      onDeleteSecret();
    } catch (error) {
      const errorObject = formatErrorResponse(error);
      const isInUseError =
        errorObject.http_status === 409 &&
        /used by/.test(errorObject?.base ?? "");
      const message =
        isInUseError && typeof errorObject?.base === "string"
          ? errorObject.base
          : "An error occurred while deleting the custom variable. Please try again.";
      renderFlash("error", message);
      onExit();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      title={t("controls.secrets.modals.delete.title")}
      onExit={onExit}
      className={baseClass}
    >
      <>
        <div className={`${baseClass}__message`}>
          <span>
            {t("controls.secrets.modals.delete.message", {
              name: secret?.name,
            })}
          </span>
          <br />
          <br />
          {t("controls.secrets.modals.delete.warning")}
        </div>
        <div className="modal-cta-wrap">
          <Button
            variant="alert"
            onClick={onClickDelete}
            isLoading={isDeleting}
            disabled={isDeleting}
          >
            Delete
          </Button>
          <Button variant="inverse-alert" onClick={onExit}>
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteSecretModal;

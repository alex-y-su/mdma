import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import CustomLink from "components/CustomLink";

interface IDeleteSecretModal {
  onDeleteSecret: () => void;
  toggleDeleteSecretModal: () => void;
  isUpdatingSecret: boolean;
}

const baseClass = "delete-secret-modal";

const DeleteSecretModal = ({
  onDeleteSecret,
  toggleDeleteSecretModal,
  isUpdatingSecret,
}: IDeleteSecretModal): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      onExit={toggleDeleteSecretModal}
      onEnter={onDeleteSecret}
      title={t("common:enrollSecrets.deleteTitle")}
      className={baseClass}
    >
      <div className={baseClass}>
        <div className={`${baseClass}__description`}>
          <p>{t("common:enrollSecrets.deleteWarning")}</p>
          <p>
            <CustomLink
              url="https://fleetdm.com/learn-more-about/rotating-enroll-secrets"
              text={t("common:enrollSecrets.learnRotating")}
              newTab
            />
          </p>
        </div>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onDeleteSecret}
            className="delete-loading"
            isLoading={isUpdatingSecret}
          >
            {t("common:buttons.delete")}
          </Button>
          <Button onClick={toggleDeleteSecretModal} variant="inverse-alert">
            {t("common:buttons.cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteSecretModal;

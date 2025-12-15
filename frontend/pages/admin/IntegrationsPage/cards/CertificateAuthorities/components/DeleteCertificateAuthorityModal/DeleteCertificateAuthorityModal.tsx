import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { ICertificateAuthorityPartial } from "interfaces/certificates";
import certificatesAPI from "services/entities/certificates";
import { NotificationContext } from "context/notification";

import Button from "components/buttons/Button";
import Modal from "components/Modal";

const baseClass = "delete-certificate-authority-modal";

interface IDeleteCertificateAuthorityModalProps {
  certAuthority: ICertificateAuthorityPartial;
  onExit: () => void;
}

const DeleteCertificateAuthorityModal = ({
  certAuthority,
  onExit,
}: IDeleteCertificateAuthorityModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const onDeleteCertAuthority = async () => {
    setIsUpdating(true);
    try {
      await certificatesAPI.deleteCertificateAuthority(certAuthority.id);
      renderFlash(
        "success",
        t("certificateAuthorities.deleteModal.successMessage")
      );
      setIsUpdating(false);
      onExit();
    } catch (e) {
      setIsUpdating(false);
      renderFlash(
        "error",
        t("certificateAuthorities.deleteModal.errorMessage")
      );
    }
  };

  return (
    <Modal
      className={baseClass}
      title={t("certificateAuthorities.deleteModal.title")}
      onExit={onExit}
    >
      <>
        <p>
          {t("certificateAuthorities.deleteModal.warningMessage", {
            name: certAuthority.name,
          })}
        </p>
        <div className="modal-cta-wrap">
          <Button
            variant="alert"
            onClick={onDeleteCertAuthority}
            isLoading={isUpdating}
            disabled={isUpdating}
          >
            {t("certificateAuthorities.deleteModal.deleteButton")}
          </Button>
          <Button variant="inverse-alert" onClick={onExit}>
            {t("certificateAuthorities.deleteModal.cancelButton")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteCertificateAuthorityModal;

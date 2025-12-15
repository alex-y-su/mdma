import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "bootstrap-package-modal";

interface IBootstrapPackageModalProps {
  packageName: string;
  details: string;
  onClose: () => void;
}

const BootstrapPackageModal = ({
  packageName,
  details,
  onClose,
}: IBootstrapPackageModalProps) => {
  const { t } = useTranslation("hosts");

  return (
    <Modal
      title={t("modals.bootstrapPackage.title")}
      onExit={onClose}
      onEnter={onClose}
      className={baseClass}
    >
      <>
        <p className={`${baseClass}__package-name`}>
          <b>{packageName}</b> {t("modals.bootstrapPackage.failedToInstall")}
        </p>
        <p className={`${baseClass}__details`}>{details}</p>

        <div className="modal-cta-wrap">
          <Button type="button" onClick={onClose} className="delete-loading">
            {t("modals.bootstrapPackage.done")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default BootstrapPackageModal;

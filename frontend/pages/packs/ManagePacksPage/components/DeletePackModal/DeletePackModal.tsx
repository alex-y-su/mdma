import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "remove-pack-modal";

interface IDeletePackModalProps {
  onCancel: () => void;
  onSubmit: () => void;
  isUpdatingPack: boolean;
}

const DeletePackModal = ({
  onCancel,
  onSubmit,
  isUpdatingPack,
}: IDeletePackModalProps): JSX.Element => {
  const { t } = useTranslation("queries");

  return (
    <Modal
      title={t("packs.modals.delete.title")}
      onExit={onCancel}
      onEnter={onSubmit}
      className={baseClass}
    >
      <div className={baseClass}>
        {t("packs.modals.delete.message")}
        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onSubmit}
            className="delete-loading"
            isLoading={isUpdatingPack}
          >
            {t("packs.modals.delete.deleteButton")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("packs.modals.delete.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePackModal;

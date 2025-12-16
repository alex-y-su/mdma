import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "delete-eula-modal";

interface IDeleteEulaModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteEulaModal = ({ onDelete, onCancel }: IDeleteEulaModalProps) => {
  const { t } = useTranslation("settings");

  return (
    <Modal
      className={baseClass}
      title={t("integrations.eula.delete_modal_title")}
      onExit={onCancel}
      onEnter={() => onDelete()}
    >
      <>
        <p>{t("integrations.eula.delete_modal_content")}</p>
        <div className="modal-cta-wrap">
          <Button type="button" onClick={() => onDelete()} variant="alert">
            {t("common:delete")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("common:cancel")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteEulaModal;

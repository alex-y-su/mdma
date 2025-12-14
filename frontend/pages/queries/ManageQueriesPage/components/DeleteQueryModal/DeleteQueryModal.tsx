import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "delete-query-modal";

interface IDeleteQueryModalProps {
  isUpdatingQueries: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const DeleteQueryModal = ({
  isUpdatingQueries,
  onCancel,
  onSubmit,
}: IDeleteQueryModalProps): JSX.Element => {
  const { t } = useTranslation("queries");

  return (
    <Modal
      title={t("modals.delete.title")}
      onExit={onCancel}
      onEnter={onSubmit}
      className={baseClass}
    >
      <div className={baseClass}>
        {t("modals.delete.warning")}
        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onSubmit}
            className="delete-loading"
            isLoading={isUpdatingQueries}
          >
            {t("modals.delete.deleteButton")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("modals.delete.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteQueryModal;

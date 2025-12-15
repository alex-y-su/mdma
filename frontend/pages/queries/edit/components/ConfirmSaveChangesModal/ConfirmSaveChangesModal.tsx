import React from "react";
import { useTranslation } from "react-i18next";

import Button from "components/buttons/Button";
import Modal from "components/Modal";

const baseClass = "save-changes-modal";

export interface IConfirmSaveChangesModalProps {
  isUpdating: boolean;
  onSaveChanges: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  showChangedSQLCopy?: boolean;
}

const ConfirmSaveChangesModal = ({
  isUpdating,
  onSaveChanges,
  onClose,
  showChangedSQLCopy = false,
}: IConfirmSaveChangesModalProps) => {
  const { t } = useTranslation("queries");

  const warningText = showChangedSQLCopy
    ? t("modals.confirmSaveChanges.sqlChangeWarning")
    : t("modals.confirmSaveChanges.deleteResultsWarning");

  return (
    <Modal title={t("modals.confirmSaveChanges.title")} onExit={onClose}>
      <form className={`${baseClass}__form`}>
        <p>{warningText}</p>
        <p>{t("modals.confirmSaveChanges.cannotUndo")}</p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onSaveChanges}
            className="save-loading"
            isLoading={isUpdating}
          >
            {t("modals.confirmSaveChanges.save")}
          </Button>
          <Button onClick={onClose} variant="inverse">
            {t("modals.confirmSaveChanges.cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmSaveChangesModal;

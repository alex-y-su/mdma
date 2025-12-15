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
    ? "Changing this query's SQL will delete its previous results, since the existing report does not reflect the updated query."
    : "The changes you are making to this query will delete its previous results.";

  return (
    <Modal title={t("modals.confirmSave.title")} onExit={onClose}>
      <form className={`${baseClass}__form`}>
        <p>{warningText}</p>
        <p>{t("modals.delete.warning")}</p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onSaveChanges}
            className="save-loading"
            isLoading={isUpdating}
          >
            {t("modals.saveNew.saveButton")}
          </Button>
          <Button onClick={onClose} variant="inverse">
            {t("modals.saveNew.cancelButton")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmSaveChangesModal;

import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "delete-policy-modal";

interface IDeletePoliciesModalProps {
  isUpdatingPolicies: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const DeletePoliciesModal = ({
  isUpdatingPolicies, // shared state from parent, not only for deletes
  onCancel,
  onSubmit,
}: IDeletePoliciesModalProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("policies:delete.title")}
      onExit={onCancel}
      onEnter={onSubmit}
      className={baseClass}
    >
      <div className={baseClass}>
        {t("policies:delete.message")}
        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onSubmit}
            className="delete-loading"
            isLoading={isUpdatingPolicies}
          >
            {t("policies:delete.delete")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("policies:delete.cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePoliciesModal;

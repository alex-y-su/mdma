import React from "react";
import { useTranslation } from "react-i18next";
import Button from "components/buttons/Button";
import Modal from "components/Modal";

const baseClass = "delete-user-form";

interface IDeleteUserModal {
  name: string;
  onDelete: () => void;
  onCancel: () => void;
  isUpdatingUsers: boolean;
}

const DeleteUserModal = ({
  name,
  onDelete,
  onCancel,
  isUpdatingUsers,
}: IDeleteUserModal): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("settings:admin.users.modals.deleteUser.title")}
      onExit={onCancel}
      onEnter={onDelete}
    >
      <div className={baseClass}>
        <p>{t("settings:admin.users.modals.deleteUser.message", { name })}</p>
        <p className={`${baseClass}__warning`}>
          {t("settings:admin.users.modals.deleteUser.warning")}
        </p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            variant="alert"
            onClick={onDelete}
            className="delete-loading"
            isLoading={isUpdatingUsers}
          >
            {t("settings:admin.users.modals.deleteUser.deleteButton")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("settings:admin.users.modals.deleteUser.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;

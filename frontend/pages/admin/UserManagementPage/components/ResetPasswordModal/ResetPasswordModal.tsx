import React from "react";
import { useTranslation } from "react-i18next";
import { IUser } from "interfaces/user";
import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "reset-password-modal";

interface IResetPasswordModal {
  user: IUser;
  onResetConfirm: (user: IUser) => void;
  onResetCancel: () => void;
}

const ResetPasswordModal = ({
  user,
  onResetConfirm,
  onResetCancel,
}: IResetPasswordModal): JSX.Element => {
  const { t } = useTranslation("settings");

  return (
    <Modal
      title={t("admin.users.modals.resetPassword.title")}
      onExit={onResetCancel}
      onEnter={() => onResetConfirm(user)}
    >
      <div className={baseClass}>
        <p>
          {t("admin.users.modals.resetPassword.message")}
          <br />
          {t("admin.users.modals.resetPassword.revokeTokens")}
        </p>
        <div className="modal-cta-wrap">
          <Button type="button" onClick={() => onResetConfirm(user)}>
            {t("admin.users.modals.resetPassword.confirmButton")}
          </Button>
          <Button onClick={onResetCancel} variant="inverse">
            {t("admin.users.modals.resetPassword.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;

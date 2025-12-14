import React from "react";
import { useTranslation } from "react-i18next";
import { IUser } from "interfaces/user";
import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "reset-sessions-modal";

interface IResetSessionsModal {
  user: IUser;
  onResetConfirm: (user: IUser) => void;
  onResetCancel: () => void;
}

const ResetSessionsModal = ({
  user,
  onResetConfirm,
  onResetCancel,
}: IResetSessionsModal): JSX.Element => {
  const { t } = useTranslation("settings");

  return (
    <Modal
      title={t("admin.users.modals.resetSessions.title")}
      onExit={onResetCancel}
      onEnter={() => onResetConfirm(user)}
    >
      <div className={baseClass}>
        <p>
          {t("admin.users.modals.resetSessions.message")}
          <br />
          {t("admin.users.modals.resetSessions.revokeTokens")}
        </p>
        <div className="modal-cta-wrap">
          <Button type="button" onClick={() => onResetConfirm(user)}>
            {t("admin.users.modals.resetSessions.confirmButton")}
          </Button>
          <Button onClick={onResetCancel} variant="inverse">
            {t("admin.users.modals.resetSessions.cancelButton")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetSessionsModal;

import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "delete-team-modal";

interface IDeleteTeamModalProps {
  name: string;
  isUpdatingTeams: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const DeleteTeamModal = ({
  name,
  isUpdatingTeams,
  onSubmit,
  onCancel,
}: IDeleteTeamModalProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("settings:admin.teams.modals.deleteTeam.title")}
      onExit={onCancel}
      onEnter={onSubmit}
      className={baseClass}
    >
      <>
        <p>{t("settings:admin.teams.modals.deleteTeam.message", { name })}</p>
        <p>{t("settings:admin.teams.modals.deleteTeam.warning")}</p>
        <p className={`${baseClass}__warning`}>
          {t("settings:admin.teams.modals.deleteTeam.cannotUndo")}
        </p>
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onSubmit}
            variant="alert"
            className="delete-loading"
            isLoading={isUpdatingTeams}
          >
            {t("settings:admin.teams.modals.deleteTeam.deleteButton")}
          </Button>
          <Button onClick={onCancel} variant="inverse-alert">
            {t("settings:admin.teams.modals.deleteTeam.cancelButton")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteTeamModal;

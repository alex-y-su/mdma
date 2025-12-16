import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AppContext } from "context/app";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "rerun-script-modal";

interface IRerunScriptModalProps {
  scriptName: string;
  scriptId: number;
  onCancel: () => void;
  onRerun: (scriptId: number) => void;
}

const generateMessageSuffix = (isPremiumTier?: boolean, teamId?: number) => {
  if (!isPremiumTier) {
    return "";
  }
  return teamId ? " assigned to this team" : " with no team";
};

const RerunScriptModal = ({
  scriptName,
  scriptId,
  onCancel,
  onRerun,
}: IRerunScriptModalProps) => {
  const { t } = useTranslation("settings");
  const { isPremiumTier, currentTeam } = useContext(AppContext);

  const messageSuffix = generateMessageSuffix(isPremiumTier, currentTeam?.id);

  return (
    <Modal
      className={baseClass}
      title={t("controls.scripts.modals.rerun.title")}
      onExit={onCancel}
      onEnter={() => onRerun(scriptId)}
    >
      <>
        <p>{t("controls.scripts.modals.rerun.message")}</p>
        <p>This may cause the script to run more than once on some hosts.</p>
        <div className="modal-cta-wrap">
          <Button type="button" onClick={() => onRerun(scriptId)}>
            {t("controls.scripts.rerunScript")}
          </Button>
          <Button onClick={onCancel} variant="inverse">
            Cancel
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default RerunScriptModal;

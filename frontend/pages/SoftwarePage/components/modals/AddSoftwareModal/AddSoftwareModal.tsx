import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import PremiumFeatureMessage from "components/PremiumFeatureMessage";

const baseClass = "add-software-modal";

interface IAllTeamsMessageProps {
  onExit: () => void;
}

const AllTeamsMessage = ({ onExit }: IAllTeamsMessageProps) => {
  const { t } = useTranslation("software");

  return (
    <>
      <p>
        {t("modals.add.allTeamsMessage")}{" "}
        <b>{t("modals.add.allTeams")}</b> {t("modals.add.isSelected")}.
      </p>
      <div className="modal-cta-wrap">
        <Button onClick={onExit}>{t("modals.add.doneButton")}</Button>
      </div>
    </>
  );
};

interface IAddSoftwareModalProps {
  onExit: () => void;
  isFreeTier?: boolean;
}

const AddSoftwareModal = ({ onExit, isFreeTier }: IAddSoftwareModalProps) => {
  const { t } = useTranslation("software");

  const renderModalContent = () => {
    if (isFreeTier) {
      return (
        <>
          <PremiumFeatureMessage alignment="left" />{" "}
          <div className="modal-cta-wrap">
            <Button onClick={onExit}>{t("modals.add.doneButton")}</Button>
          </div>
        </>
      );
    }

    return <AllTeamsMessage onExit={onExit} />;
  };

  return (
    <Modal title={t("modals.add.title")} onExit={onExit} className={baseClass}>
      {renderModalContent()}
    </Modal>
  );
};

export default AddSoftwareModal;

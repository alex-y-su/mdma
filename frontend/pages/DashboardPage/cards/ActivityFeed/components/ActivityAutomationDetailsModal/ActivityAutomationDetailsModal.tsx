import React from "react";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import Textarea from "components/Textarea";
import { IActivityDetails } from "interfaces/activity";

const baseClass = "activity-automation-details-modal";

interface IActivityAutomationDetailsModalProps {
  details: IActivityDetails;
  onCancel: () => void;
}

const ActivityAutomationDetailsModal = ({
  details,
  onCancel,
}: IActivityAutomationDetailsModalProps) => {
  const { t } = useTranslation("dashboard");
  const renderContent = () => {
    return (
      <>
        <div className={`${baseClass}__modal-content`}>
          <Textarea
            label={t("activityDetails.automationModal.webhookLabel")}
            className={`${baseClass}__webhook-url`}
            variant="code"
          >
            {details.webhook_url}
          </Textarea>
        </div>
        <div className="modal-cta-wrap">
          <Button onClick={onCancel}>{t("activityDetails.automationModal.done")}</Button>
        </div>
      </>
    );
  };

  return (
    <Modal
      title={t("activityDetails.automationModal.title")}
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
    >
      {renderContent()}
    </Modal>
  );
};

export default ActivityAutomationDetailsModal;

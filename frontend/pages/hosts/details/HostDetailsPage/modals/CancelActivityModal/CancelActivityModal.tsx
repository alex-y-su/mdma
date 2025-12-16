import React, { useContext } from "react";
import { noop } from "lodash";
import { useTranslation } from "react-i18next";

import { IHostUpcomingActivity } from "interfaces/activity";
import activitiesAPI from "services/entities/activities";
import { NotificationContext } from "context/notification";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

import { upcomingActivityComponentMap } from "pages/hosts/details/cards/Activity/ActivityConfig";

import { getErrorMessage } from "./helpers";

const baseClass = "cancel-activity-modal";

interface ICancelActivityModalProps {
  hostId: number;
  activity: IHostUpcomingActivity;
  onCancelActivity: (activity: IHostUpcomingActivity) => void;
  onSuccessCancel: (activity: IHostUpcomingActivity) => void;
  onExit: () => void;
}

const CancelActivityModal = ({
  hostId,
  activity,
  onCancelActivity,
  onSuccessCancel,
  onExit,
}: ICancelActivityModalProps) => {
  const { t } = useTranslation("hosts");
  const { renderFlash } = useContext(NotificationContext);
  const [isCanceling, setIsCanceling] = React.useState(false);

  const ActivityItemComponent = upcomingActivityComponentMap[activity.type];

  const onAttemptyCancel = async () => {
    setIsCanceling(true);
    try {
      await activitiesAPI.cancelHostActivity(hostId, activity.uuid);
      renderFlash("success", t("modals.cancelActivity.successMessage"));
      onSuccessCancel(activity);
    } catch (err) {
      renderFlash("error", getErrorMessage(err));
    }
    onCancelActivity(activity);
    onExit();
  };

  return (
    <Modal
      className={baseClass}
      title={t("modals.cancelActivity.title")}
      onExit={onExit}
      isContentDisabled={isCanceling}
    >
      <>
        <div className={`${baseClass}__content`}>
          <p>{t("modals.cancelActivity.description")}</p>
          <ActivityItemComponent
            tab="upcoming"
            activity={activity}
            onCancel={noop}
            onShowDetails={noop}
            isSoloActivity
          />
        </div>
        <div className="modal-cta-wrap">
          <Button
            disabled={isCanceling}
            isLoading={isCanceling}
            variant="alert"
            onClick={onAttemptyCancel}
          >
            {t("modals.cancelActivity.confirmButton")}
          </Button>
          <Button variant="inverse-alert" onClick={onExit}>
            {t("modals.cancelActivity.cancelButton")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default CancelActivityModal;

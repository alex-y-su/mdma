import React, { useContext } from "react";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import mdmAndroidAPI from "services/entities/mdm_android";
import { NotificationContext } from "context/notification";

import Modal from "components/Modal";
import Button from "components/buttons/Button";

const baseClass = "turn-off-android-mdm-modal";

interface ITurnOffAndroidMdmModalProps {
  onExit: () => void;
  router: InjectedRouter;
}

const TurnOffAndroidMdmModal = ({
  onExit,
  router,
}: ITurnOffAndroidMdmModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);

  const onTurnOffAndroidMdm = async () => {
    try {
      await mdmAndroidAPI.turnOffAndroidMdm();
      renderFlash("success", t("mdmSettings.android.turnOffSuccess"), {
        persistOnPageChange: true,
      });
      router.push(PATHS.ADMIN_INTEGRATIONS_MDM);
    } catch (e) {
      onExit();
      renderFlash("error", t("mdmSettings.android.turnOffError"));
    }
  };

  return (
    <Modal
      title={t("mdmSettings.android.turnOffModalTitle")}
      className={baseClass}
      onExit={onExit}
    >
      <>
        <p>{t("mdmSettings.android.turnOffModalWarning1")}</p>
        <p>{t("mdmSettings.android.turnOffModalWarning2")}</p>
        <div className="modal-cta-wrap">
          <Button onClick={onTurnOffAndroidMdm} variant="alert">
            {t("mdmSettings.android.turnOffConfirm")}
          </Button>
          <Button onClick={onExit} variant="inverse-alert">
            {t("mdmSettings.android.turnOffCancel")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default TurnOffAndroidMdmModal;

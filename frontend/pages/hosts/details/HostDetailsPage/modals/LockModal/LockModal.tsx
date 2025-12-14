import React, { useContext } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import { NotificationContext } from "context/notification";
import { getErrorReason } from "interfaces/errors";
import hostAPI from "services/entities/hosts";
import { isIPadOrIPhone } from "interfaces/platform";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import Checkbox from "components/forms/fields/Checkbox";
import CustomLink from "components/CustomLink";
import Card from "components/Card";

import IphoneLockPreview from "../../../../../../../assets/images/iphone-lock-preview.png";

const baseClass = "lock-modal";

const IosOrIpadLockPreview = () => {
  const { t } = useTranslation("hosts");
  return (
    <Card
      color="grey"
      paddingSize="xlarge"
      className={`${baseClass}__ios-ipad-lock-preview`}
    >
      <h3>{t("modals.lock.endUserExperience")}</h3>
      <p>
        {t("modals.lock.organizationNameNote")}
      </p>
      <img src={IphoneLockPreview} alt="iPhone with a lock screen message" />
    </Card>
  );
};

interface ILockModalProps {
  id: number;
  platform: string;
  hostName: string;
  onSuccess: () => void;
  onClose: () => void;
}

const LockModal = ({
  id,
  platform,
  hostName,
  onSuccess,
  onClose,
}: ILockModalProps) => {
  const { t } = useTranslation("hosts");
  const { renderFlash } = useContext(NotificationContext);
  const [lockChecked, setLockChecked] = React.useState(false);
  const [isLocking, setIsLocking] = React.useState(false);

  const onLock = async () => {
    setIsLocking(true);
    try {
      await hostAPI.lockHost(id);
      onSuccess();
      renderFlash("success", t("modals.lock.successMessage"));
    } catch (e) {
      renderFlash("error", getErrorReason(e));
    }
    onClose();
    setIsLocking(false);
  };

  const renderDescription = () => {
    if (isIPadOrIPhone(platform)) {
      // if (true) {
      return (
        <p>
          {t("modals.lock.descriptionIos")}
        </p>
      );
    }

    return (
      <>
        <p>{t("modals.lock.description")}</p>
        {platform === "darwin" && (
          <p>{t("modals.lock.generatePin")}</p>
        )}
      </>
    );
  };

  return (
    <Modal className={baseClass} title={t("modals.lock.title")} onExit={onClose}>
      <>
        <div className={`${baseClass}__modal-content`}>
          <div className={`${baseClass}__description`}>
            {renderDescription()}
          </div>
          <div className={`${baseClass}__confirm-message`}>
            <span>
              <b>{t("modals.lock.confirmMessage")}</b>
            </span>
            <Checkbox
              wrapperClassName={`${baseClass}__lock-checkbox`}
              value={lockChecked}
              onChange={(value: boolean) => setLockChecked(value)}
            >
              {t("modals.lock.confirmCheckbox")} <b>{hostName}</b>
            </Checkbox>
          </div>
        </div>
        {isIPadOrIPhone(platform) && <IosOrIpadLockPreview />}
        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onLock}
            className="delete-loading"
            disabled={!lockChecked}
            isLoading={isLocking}
          >
            {t("modals.lock.buttonLock")}
          </Button>
          <Button onClick={onClose} variant="inverse">
            {t("modals.lock.buttonCancel")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default LockModal;

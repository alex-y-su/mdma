import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import hostAPI from "services/entities/hosts";
import { getErrorReason } from "interfaces/errors";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import Checkbox from "components/forms/fields/Checkbox";
import { NotificationContext } from "context/notification";

const baseClass = "wipe-modal";

interface IWipeModalProps {
  id: number;
  hostName: string;
  onSuccess: () => void;
  onClose: () => void;
}

const WipeModal = ({ id, hostName, onSuccess, onClose }: IWipeModalProps) => {
  const { t } = useTranslation("hosts");
  const { renderFlash } = useContext(NotificationContext);
  const [lockChecked, setLockChecked] = React.useState(false);
  const [isWiping, setIsWiping] = React.useState(false);

  const onWipe = async () => {
    setIsWiping(true);
    try {
      await hostAPI.wipeHost(id);
      onSuccess();
      renderFlash(
        "success",
        t("modals.wipe.successMessage")
      );
    } catch (e) {
      renderFlash("error", getErrorReason(e));
    }
    onClose();
    setIsWiping(false);
  };

  return (
    <Modal className={baseClass} title={t("modals.wipe.title")} onExit={onClose}>
      <>
        <div className={`${baseClass}__modal-content`}>
          <p>{t("modals.wipe.description")}</p>
          <div className={`${baseClass}__confirm-message`}>
            <span>
              <b>{t("modals.wipe.confirmMessage")}</b>
            </span>
            <Checkbox
              wrapperClassName={`${baseClass}__wipe-checkbox`}
              value={lockChecked}
              onChange={(value: boolean) => setLockChecked(value)}
            >
              {t("modals.wipe.confirmCheckbox")} <b>{hostName}</b>
            </Checkbox>
          </div>
        </div>

        <div className="modal-cta-wrap">
          <Button
            type="button"
            onClick={onWipe}
            variant="alert"
            className="delete-loading"
            disabled={!lockChecked}
            isLoading={isWiping}
          >
            {t("modals.wipe.buttonWipe")}
          </Button>
          <Button onClick={onClose} variant="inverse-alert">
            {t("modals.wipe.buttonCancel")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default WipeModal;

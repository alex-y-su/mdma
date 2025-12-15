import React, { useContext } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

import { NotificationContext } from "context/notification";
import { getErrorReason } from "interfaces/errors";
import { isIPadOrIPhone } from "interfaces/platform";
import hostAPI, { IUnlockHostResponse } from "services/entities/hosts";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import Spinner from "components/Spinner";
import DataError from "components/DataError";

const baseClass = "unlock-modal";

interface IUnlockModalProps {
  id: number;
  platform: string;
  hostName: string;
  onSuccess: () => void;
  onClose: () => void;
}

const UnlockModal = ({
  id,
  platform,
  hostName,
  onSuccess,
  onClose,
}: IUnlockModalProps) => {
  const { t } = useTranslation("hosts");
  const { renderFlash } = useContext(NotificationContext);
  const [isUnlocking, setIsUnlocking] = React.useState(false);

  const {
    data: macUnlockData,
    isLoading: macIsLoading,
    isError: macIsError,
  } = useQuery<IUnlockHostResponse, AxiosError>(
    ["mac-unlock-pin", id],
    () => hostAPI.unlockHost(id),
    {
      enabled: platform === "darwin",
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    }
  );

  const onUnlock = async () => {
    setIsUnlocking(true);
    try {
      await hostAPI.unlockHost(id);
      onSuccess();
      renderFlash(
        "success",
        t("modals.unlock.successMessage")
      );
    } catch (e) {
      renderFlash("error", getErrorReason(e));
    }
    onClose();
    setIsUnlocking(false);
  };

  const renderModalContent = () => {
    if (platform === "darwin") {
      if (macIsLoading) return <Spinner />;
      if (macIsError) return <DataError />;

      if (!macUnlockData) return null;

      return (
        <>
          {/* TODO: replace with DataSet component */}
          <p>
            {t("modals.unlock.pinDescription")}
          </p>
          <div className={`${baseClass}__pin`}>
            <b>{t("modals.unlock.pinLabel")}</b>
            <span>{macUnlockData.unlock_pin}</span>
          </div>
        </>
      );
    }

    if (isIPadOrIPhone(platform)) {
      return (
        <p>
          {t("modals.unlock.descriptionIos")}
        </p>
      );
    }

    return (
      <>
        <p>
          {t("modals.unlock.confirmMessage")} <b>{hostName}</b>?
        </p>
      </>
    );
  };

  const renderModalButtons = () => {
    if (platform === "darwin") {
      return (
        <>
          <Button type="button" onClick={onClose}>
            {t("modals.unlock.buttonDone")}
          </Button>
        </>
      );
    }

    return (
      <>
        <Button
          type="button"
          onClick={onUnlock}
          className="delete-loading"
          isLoading={isUnlocking}
        >
          {t("modals.unlock.buttonUnlock")}
        </Button>
        <Button onClick={onClose} variant="inverse">
          {t("modals.unlock.buttonCancel")}
        </Button>
      </>
    );
  };

  return (
    <Modal className={baseClass} title={t("modals.unlock.title")} onExit={onClose}>
      <>
        <div className={`${baseClass}__modal-content`}>
          {renderModalContent()}
        </div>

        <div className="modal-cta-wrap">{renderModalButtons()}</div>
      </>
    </Modal>
  );
};

export default UnlockModal;

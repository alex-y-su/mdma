import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";

import DataError from "components/DataError";
import Button from "components/buttons/Button";
import Modal from "components/Modal";
import { NotificationContext } from "context/notification";

import mdmAPI from "services/entities/mdm";
import { isAndroid, isIPadOrIPhone } from "interfaces/platform";
import {
  isAutomaticDeviceEnrollment,
  isBYODAccountDrivenUserEnrollment,
  isBYODManualEnrollment,
  MdmEnrollmentStatus,
} from "interfaces/mdm";

const baseClass = "unenroll-mdm-modal";

interface IUnenrollMdmModalProps {
  hostId: number;
  hostPlatform: string;
  hostName: string;
  enrollmentStatus: MdmEnrollmentStatus | null;
  onClose: () => void;
}

const UnenrollMdmModal = ({
  hostId,
  hostPlatform,
  hostName,
  enrollmentStatus,
  onClose,
}: IUnenrollMdmModalProps) => {
  const { t } = useTranslation("hosts");
  const [requestState, setRequestState] = useState<
    undefined | "unenrolling" | "error"
  >(undefined);

  const { renderFlash } = useContext(NotificationContext);

  const submitUnenrollMdm = async () => {
    setRequestState("unenrolling");
    try {
      if (isAndroid(hostPlatform)) {
        await mdmAPI.unenrollAndroidHostFromMdm(hostId, 5000);
      } else {
        await mdmAPI.unenrollHostFromMdm(hostId, 5000);
      }
      const successMessage =
        isIPadOrIPhone(hostPlatform) || isAndroid(hostPlatform) ? (
          <>
            <b>{hostName}</b> {t("modals.unenrollMdm.successMessage.mobile")}
          </>
        ) : (
          <>
            {t("modals.unenrollMdm.successMessage.macosPrefix")}{" "}
            <b>{hostName}</b>{" "}
            {t("modals.unenrollMdm.successMessage.macosSuffix")}
          </>
        );
      renderFlash("success", successMessage);
      onClose();
    } catch (unenrollMdmError: unknown) {
      const errorMessage =
        isIPadOrIPhone(hostPlatform) || isAndroid(hostPlatform) ? (
          t("modals.unenrollMdm.errorMessage.mobile")
        ) : (
          <>
            {t("modals.unenrollMdm.errorMessage.macosPrefix")} <b>{hostName}</b>
            . {t("modals.unenrollMdm.errorMessage.macosSuffix")}
          </>
        );
      renderFlash("error", errorMessage);
    }
    setRequestState(undefined);
  };

  const generateIosOrIpadosDescription = () => {
    if (isBYODManualEnrollment(enrollmentStatus)) {
      return <p>{t("modals.unenrollMdm.reenrollInstructions.iosManual")}</p>;
    } else if (isBYODAccountDrivenUserEnrollment(enrollmentStatus)) {
      return (
        <p>{t("modals.unenrollMdm.reenrollInstructions.iosAccountDriven")}</p>
      );
    } else if (isAutomaticDeviceEnrollment(enrollmentStatus)) {
      return <p>{t("modals.unenrollMdm.reenrollInstructions.iosAutomatic")}</p>;
    }
    return null;
  };

  const generateDescription = () => {
    if (isIPadOrIPhone(hostPlatform)) {
      return (
        <>
          <p>{t("modals.unenrollMdm.description.ios")}</p>
          {generateIosOrIpadosDescription()}
        </>
      );
    }
    if (isAndroid(hostPlatform)) {
      return (
        <>
          <p>{t("modals.unenrollMdm.description.android")}</p>
          <p>{t("modals.unenrollMdm.reenrollInstructions.android")}</p>
        </>
      );
    }
    return (
      <>
        <p>{t("modals.unenrollMdm.description.macos")}</p>
        <p>{t("modals.unenrollMdm.reenrollInstructions.macos")}</p>
      </>
    );
  };

  const renderModalContent = () => {
    if (requestState === "error") {
      return <DataError />;
    }

    const buttonText =
      isIPadOrIPhone(hostPlatform) || isAndroid(hostPlatform)
        ? t("modals.unenrollMdm.confirmButton.mobile")
        : t("modals.unenrollMdm.confirmButton.macos");

    return (
      <>
        <div className={`${baseClass}__description`}>
          {generateDescription()}
        </div>
        <div className="modal-cta-wrap">
          <Button
            type="submit"
            variant="alert"
            onClick={submitUnenrollMdm}
            isLoading={requestState === "unenrolling"}
          >
            {buttonText}
          </Button>
          <Button onClick={onClose} variant="inverse-alert">
            {t("modals.unenrollMdm.cancelButton")}
          </Button>
        </div>
      </>
    );
  };

  const title =
    isIPadOrIPhone(hostPlatform) || isAndroid(hostPlatform)
      ? t("modals.unenrollMdm.title.mobile")
      : t("modals.unenrollMdm.title.macos");

  return (
    <Modal
      title={title}
      onExit={onClose}
      className={baseClass}
      width="medium"
      isContentDisabled={requestState === "unenrolling"}
    >
      {renderModalContent()}
    </Modal>
  );
};

export default UnenrollMdmModal;

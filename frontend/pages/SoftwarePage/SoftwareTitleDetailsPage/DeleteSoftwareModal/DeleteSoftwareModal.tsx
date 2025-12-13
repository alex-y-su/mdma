import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import softwareAPI from "services/entities/software";
import { NotificationContext } from "context/notification";

import { getErrorReason } from "interfaces/errors";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import InfoBanner from "components/InfoBanner";

const baseClass = "delete-software-modal";

interface IDeleteSoftwareModalProps {
  softwareId: number;
  teamId: number;
  softwareTitleName?: string;
  softwareDisplayName?: string;
  onExit: () => void;
  onSuccess: () => void;
  gitOpsModeEnabled?: boolean;
}

const DeleteSoftwareModal = ({
  softwareId,
  teamId,
  softwareTitleName,
  softwareDisplayName,
  onExit,
  onSuccess,
  gitOpsModeEnabled,
}: IDeleteSoftwareModalProps) => {
  const { t } = useTranslation();
  const { renderFlash } = useContext(NotificationContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteSoftware = useCallback(async () => {
    setIsDeleting(true);
    try {
      await softwareAPI.deleteSoftwareInstaller(softwareId, teamId);
      renderFlash("success", t("software:modals.delete.successMessage"));
      onSuccess();
    } catch (error) {
      const reason = getErrorReason(error);
      if (reason.includes("Policy automation uses this software")) {
        renderFlash("error", t("software:modals.delete.errorPolicyUsed"));
      } else if (reason.includes("This software is installed when")) {
        renderFlash("error", t("software:modals.delete.errorSetupExperience"));
      } else {
        renderFlash("error", t("software:modals.delete.errorGeneric"));
      }
    }
    setIsDeleting(false);
    onExit();
  }, [softwareId, teamId, renderFlash, onSuccess, onExit, t]);

  return (
    <Modal
      className={baseClass}
      title={t("software:modals.delete.title")}
      onExit={onExit}
      isContentDisabled={isDeleting}
    >
      <>
        {gitOpsModeEnabled && (
          <InfoBanner className={`${baseClass}__gitops-warning`}>
            {t("software:modals.delete.gitopsWarning")}
          </InfoBanner>
        )}
        <p>
          {t("software:modals.delete.confirmText")}{" "}
          <strong>{softwareDisplayName || softwareTitleName}</strong>?
        </p>
        <ul>
          <li>{t("software:modals.delete.warning1")}</li>{" "}
          <li>{t("software:modals.delete.warning2")}</li>
          <li>
            {t("software:modals.delete.warning3")}{" "}
            <strong>{softwareTitleName}</strong>{" "}
            {t("software:modals.delete.warning3Suffix")}
          </li>
        </ul>
        <p>{t("software:modals.delete.warning4")}</p>
        <div className="modal-cta-wrap">
          <Button
            variant="alert"
            onClick={onDeleteSoftware}
            isLoading={isDeleting}
          >
            {t("software:modals.delete.deleteButton")}
          </Button>
          <Button variant="inverse-alert" onClick={onExit}>
            {t("software:modals.delete.cancelButton")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default DeleteSoftwareModal;

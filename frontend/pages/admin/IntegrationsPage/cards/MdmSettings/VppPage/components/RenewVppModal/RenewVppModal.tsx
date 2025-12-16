import React, { useState, useContext, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { NotificationContext } from "context/notification";

import mdmAppleAPI from "services/entities/mdm_apple";

import Button from "components/buttons/Button";
import { FileUploader } from "components/FileUploader/FileUploader";
import Modal from "components/Modal";
import VppSetupSteps from "../VppSetupSteps";
import { getErrorMessage } from "./helpers";

const baseClass = "modal renew-vpp-modal";

interface IRenewVppModalProps {
  tokenId: number;
  orgName: string;
  onCancel: () => void;
  onRenewedToken: () => void;
}

const RenewVppModal = ({
  tokenId,
  orgName,
  onCancel,
  onRenewedToken,
}: IRenewVppModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);
  const [isRenewing, setIsRenewing] = useState(false);
  const [tokenFile, setTokenFile] = useState<File | null>(null);

  const onSelectFile = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setTokenFile(file);
    }
  };

  const onRenewToken = useCallback(async () => {
    setIsRenewing(true);

    if (!tokenFile) {
      setIsRenewing(false);
      renderFlash("error", t("mdmSettings.vpp.renewModal.noTokenSelected"));
      return;
    }

    try {
      await mdmAppleAPI.renewVppToken(tokenId, tokenFile);
      renderFlash("success", t("mdmSettings.vpp.renewModal.renewSuccess"));
      onRenewedToken();
    } catch (e) {
      renderFlash("error", getErrorMessage(e));
      onCancel();
    }
    setIsRenewing(false);
  }, [onCancel, onRenewedToken, renderFlash, tokenFile, tokenId, t]);

  return (
    <Modal
      title={t("mdmSettings.vpp.renewModal.title")}
      onExit={onCancel}
      className={baseClass}
      isContentDisabled={isRenewing}
      width="large"
    >
      <>
        <p className={`${baseClass}__description`}>
          {t("mdmSettings.vpp.renewModal.description", { orgName })}
        </p>
        <VppSetupSteps />
        <FileUploader
          className={`${baseClass}__file-uploader`}
          accept=".vpptoken"
          message={t("mdmSettings.vpp.renewModal.contentToken")}
          graphicName="file-vpp"
          buttonType="brand-inverse-icon"
          buttonMessage={t("mdmSettings.vpp.renewModal.upload")}
          fileDetails={tokenFile ? { name: tokenFile.name } : undefined}
          onFileUpload={onSelectFile}
        />
        <div className="modal-cta-wrap">
          <Button
            onClick={onRenewToken}
            isLoading={isRenewing}
            disabled={!tokenFile}
          >
            {t("mdmSettings.vpp.renewModal.renewButton")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default RenewVppModal;

import React, { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { NotificationContext } from "context/notification";
import mdmAppleAPI from "services/entities/mdm_apple";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import FileUploader from "components/FileUploader";

import VppSetupSteps from "../VppSetupSteps";
import { getErrorMessage } from "./helpers";

const baseClass = "add-vpp-modal";

interface IAddVppModalProps {
  onCancel: () => void;
  onAdded: () => void;
}

const AddVppModal = ({ onCancel, onAdded }: IAddVppModalProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);

  const [tokenFile, setTokenFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onSelectFile = useCallback((files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      setTokenFile(file);
    }
  }, []);

  const uploadVppToken = useCallback(async () => {
    setIsUploading(true);
    if (!tokenFile) {
      setIsUploading(false);
      renderFlash("error", t("mdmSettings.vpp.addModal.noTokenSelected"));
      return;
    }

    try {
      await mdmAppleAPI.uploadVppToken(tokenFile);
      renderFlash("success", t("mdmSettings.vpp.addModal.addSuccess"));
      onAdded();
    } catch (e) {
      renderFlash("error", getErrorMessage(e));
      onCancel();
    } finally {
      setIsUploading(false);
    }
  }, [tokenFile, renderFlash, onAdded, onCancel, t]);

  return (
    <Modal
      className={baseClass}
      title={t("mdmSettings.vpp.addModal.title")}
      onExit={onCancel}
      width="large"
    >
      <>
        <VppSetupSteps extendendSteps />
        <FileUploader
          className={`${baseClass}__file-uploader ${
            isUploading ? `${baseClass}__file-uploader--loading` : ""
          }`}
          accept=".vpptoken"
          message={t("mdmSettings.vpp.addModal.contentToken")}
          graphicName="file-vpp"
          buttonType="brand-inverse-icon"
          buttonMessage={
            isUploading
              ? t("mdmSettings.vpp.addModal.uploading")
              : t("mdmSettings.vpp.addModal.upload")
          }
          fileDetails={tokenFile ? { name: tokenFile.name } : undefined}
          onFileUpload={onSelectFile}
        />
        <div className="modal-cta-wrap">
          <Button
            onClick={uploadVppToken}
            isLoading={isUploading}
            disabled={!tokenFile || isUploading}
          >
            {t("mdmSettings.vpp.addVpp")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default AddVppModal;

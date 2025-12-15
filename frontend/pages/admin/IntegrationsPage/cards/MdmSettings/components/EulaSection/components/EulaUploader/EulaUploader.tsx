import React, { useContext, useState } from "react";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";

import { IApiError } from "interfaces/errors";
import mdmAPI from "services/entities/mdm";
import { NotificationContext } from "context/notification";

import FileUploader from "components/FileUploader/FileUploader";
import CustomLink from "components/CustomLink";

import { UPLOAD_ERROR_MESSAGES, getErrorMessage } from "./helpers";

const baseClass = "eula-uploader";

interface IEulaUploaderProps {
  onUpload: () => void;
}

const EulaUploader = ({ onUpload }: IEulaUploaderProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);
  const [showLoading, setShowLoading] = useState(false);

  const onUploadFile = async (files: FileList | null) => {
    setShowLoading(true);

    if (!files || files.length === 0) {
      setShowLoading(false);
      return;
    }

    const file = files[0];

    // quick exit if the file type is incorrect
    if (!file.name.includes(".pdf")) {
      renderFlash("error", UPLOAD_ERROR_MESSAGES.wrongType.message);
      setShowLoading(false);
      return;
    }

    try {
      await mdmAPI.uploadEULA(file);
      renderFlash("success", t("integrations.eula.upload_success"));
      onUpload();
    } catch (e) {
      const error = e as AxiosResponse<IApiError>;
      const errMessage = getErrorMessage(error);
      renderFlash("error", errMessage);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className={baseClass}>
      <p>
        {t("integrations.eula.description")}{" "}
        <CustomLink
          url="https://fleetdm.com/learn-more-about/end-user-license-agreement"
          text={t("integrations.eula.learn_more")}
          newTab
        />
      </p>
      <FileUploader
        graphicName="file-pdf"
        message={t("integrations.eula.upload_message")}
        onFileUpload={onUploadFile}
        accept=".pdf"
        isLoading={showLoading}
        gitopsCompatible
      />
    </div>
  );
};

export default EulaUploader;

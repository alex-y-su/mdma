import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import mdmAPI, { IEulaMetadataResponse } from "services/entities/mdm";
import { NotificationContext } from "context/notification";

import SettingsSection from "pages/admin/components/SettingsSection";

import EulaUploader from "./components/EulaUploader/EulaUploader";
import UploadedEulaView from "./components/UploadedEulaView/UploadedEulaView";
import DeleteEulaModal from "./components/DeleteEulaModal/DeleteEulaModal";

const baseClass = "eula-section";

interface IEulaSectionProps {
  eulaMetadata?: IEulaMetadataResponse;
  isEulaUploaded: boolean;
  onUpload: () => void;
  onDelete: () => void;
}

const EulaSection = ({
  eulaMetadata,
  isEulaUploaded,
  onUpload,
  onDelete,
}: IEulaSectionProps) => {
  const { t } = useTranslation("settings");
  const { renderFlash } = useContext(NotificationContext);
  const [showDeleteEulaModal, setShowDeleteEulaModal] = useState(false);

  const onDeleteEula = async () => {
    if (!eulaMetadata) return;

    try {
      await mdmAPI.deleteEULA(eulaMetadata.token);
      renderFlash("success", t("integrations.eula.delete_success"));
    } catch {
      renderFlash("error", t("integrations.eula.delete_error"));
    } finally {
      setShowDeleteEulaModal(false);
      onDelete();
    }
  };

  return (
    <SettingsSection
      className={baseClass}
      title={t("integrations.eula.title")}
      id="end-user-license-agreement"
    >
      <div className={`${baseClass}__content`}>
        {!isEulaUploaded || !eulaMetadata ? (
          <EulaUploader onUpload={onUpload} />
        ) : (
          <UploadedEulaView
            eulaMetadata={eulaMetadata}
            onDelete={() => setShowDeleteEulaModal(true)}
          />
        )}
      </div>
      {showDeleteEulaModal && (
        <DeleteEulaModal
          onDelete={onDeleteEula}
          onCancel={() => setShowDeleteEulaModal(false)}
        />
      )}
    </SettingsSection>
  );
};

export default EulaSection;

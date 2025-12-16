// Used in both Apple App Store (VPP) and Android Play Store details modals

import React from "react";
import { useTranslation } from "react-i18next";

import { IActivityDetails } from "interfaces/activity";
import { isAndroid } from "interfaces/platform";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import DataSet from "components/DataSet";
import {
  TargetTitle,
  TargetValue,
} from "../LibrarySoftwareDetailsModal/LibrarySoftwareDetailsModal";

const baseClass = "app-store-details-modal";

interface IAppStoreDetailsModalProps {
  details: IActivityDetails;
  onCancel: () => void;
}

const AppStoreDetailsModal = ({
  details,
  onCancel,
}: IAppStoreDetailsModalProps) => {
  const { t } = useTranslation("dashboard");
  const { labels_include_any, labels_exclude_any } = details;

  return (
    <Modal
      title={t("activityDetails.appStoreModal.title")}
      width="large"
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
    >
      <>
        <div className={`${baseClass}__modal-content`}>
          <DataSet
            title={t("activityDetails.appStoreModal.name")}
            value={details.software_display_name || details.software_title}
          />
          <DataSet
            title={
              isAndroid(details.platform || "")
                ? t("activityDetails.appStoreModal.googlePlayId")
                : t("activityDetails.appStoreModal.appStoreId")
            }
            value={details.app_store_id}
          />
          <DataSet
            title={t("activityDetails.appStoreModal.selfService")}
            value={
              details.self_service
                ? t("activityDetails.appStoreModal.yes")
                : t("activityDetails.appStoreModal.no")
            }
          />
          <DataSet
            title={
              <TargetTitle
                labelIncludeAny={labels_include_any}
                labelExcludeAny={labels_exclude_any}
                t={t}
              />
            }
            value={
              <TargetValue
                labelIncludeAny={labels_include_any}
                labelExcludeAny={labels_exclude_any}
                t={t}
              />
            }
          />
        </div>
        <div className="modal-cta-wrap">
          <Button onClick={onCancel}>
            {t("activityDetails.appStoreModal.done")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default AppStoreDetailsModal;

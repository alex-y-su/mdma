import React from "react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import { IActivityDetails } from "interfaces/activity";
import { ILabelSoftwareTitle } from "interfaces/label";

import Modal from "components/Modal";
import Button from "components/buttons/Button";
import DataSet from "components/DataSet";
import TooltipWrapper from "components/TooltipWrapper";

const baseClass = "library-software-details-modal";

interface ITargetValueProps {
  labelIncludeAny?: ILabelSoftwareTitle[];
  labelExcludeAny?: ILabelSoftwareTitle[];
  t?: TFunction;
}

// Shared with global activity VPP details modal
export const TargetTitle = ({
  labelIncludeAny,
  labelExcludeAny,
  t,
}: ITargetValueProps) => {
  let suffix = "";

  if (labelIncludeAny) {
    suffix = ` (${
      t?.("activityDetails.librarySoftwareModal.includeAny") || "include any"
    })`;
  } else if (labelExcludeAny) {
    suffix = ` (${
      t?.("activityDetails.librarySoftwareModal.excludeAny") || "exclude any"
    })`;
  }

  return (
    <>
      {t?.("activityDetails.librarySoftwareModal.target") || "Target"}
      {suffix}
    </>
  );
};

// Shared with global activity VPP details modal
export const TargetValue = ({
  labelIncludeAny,
  labelExcludeAny,
  t,
}: ITargetValueProps) => {
  if (!labelIncludeAny && !labelExcludeAny) {
    return (
      <>{t?.("activityDetails.librarySoftwareModal.allHosts") || "All hosts"}</>
    );
  }

  let labels: ILabelSoftwareTitle[] = [];
  if (labelIncludeAny) {
    labels = labelIncludeAny;
  } else if (labelExcludeAny) {
    labels = labelExcludeAny;
  }

  // Single label targeted: Show label name
  if (labels.length === 1) {
    return <>{labels[0].name}</>;
  }

  // Multiple labels targeted: Show label count with tooltip of targeted label names
  return (
    <TooltipWrapper
      tipContent={labels.map((label) => (
        <>
          {label.name}
          <br />
        </>
      ))}
    >
      {labels.length}{" "}
      {t?.("activityDetails.librarySoftwareModal.labels") || "labels"}
    </TooltipWrapper>
  );
};

interface ILibrarySoftwareDetailsModalProps {
  details: IActivityDetails;
  onCancel: () => void;
}

const LibrarySoftwareDetailsModal = ({
  details,
  onCancel,
}: ILibrarySoftwareDetailsModalProps) => {
  const { t } = useTranslation("dashboard");
  const { labels_include_any, labels_exclude_any } = details;

  return (
    <Modal
      title={t("activityDetails.librarySoftwareModal.title")}
      width="large"
      onExit={onCancel}
      onEnter={onCancel}
      className={baseClass}
    >
      <>
        <div className={`${baseClass}__modal-content`}>
          <DataSet
            title={t("activityDetails.librarySoftwareModal.name")}
            value={details.software_display_name || details.software_title}
          />
          <DataSet
            title={t("activityDetails.librarySoftwareModal.packageName")}
            value={details.software_package}
          />
          <DataSet
            title={t("activityDetails.librarySoftwareModal.selfService")}
            value={
              details.self_service
                ? t("activityDetails.librarySoftwareModal.yes")
                : t("activityDetails.librarySoftwareModal.no")
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
            {t("activityDetails.librarySoftwareModal.done")}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default LibrarySoftwareDetailsModal;

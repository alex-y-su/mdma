import React from "react";
import { useTranslation } from "react-i18next";

import { SetupStepStatus } from "interfaces/setup";

import Icon from "components/Icon";
import { IconNames } from "components/icons";
import Spinner from "components/Spinner";

const baseClass = "setup-software-status-cell";

interface ISetupSoftwareStatusCell {
  status: SetupStepStatus;
}

const SetupSoftwareStatusCell = ({ status }: ISetupSoftwareStatusCell) => {
  const { t } = useTranslation("common");

  const serverToUiStatus = (
    status: SetupStepStatus
  ): { label: string; icon: IconNames | "spinner" } => {
    switch (status) {
      case "pending":
        return { label: t("setupStatus.pending"), icon: "pending-outline" };
      case "running":
        return { label: t("setupStatus.installing"), icon: "spinner" };
      case "success":
        return { label: t("setupStatus.installed"), icon: "success" };
      case "failure":
      case "cancelled":
        return { label: t("setupStatus.failed"), icon: "error" };
      default:
        return { label: t("setupStatus.pending"), icon: "pending-outline" };
    }
  };

  const { label, icon } = serverToUiStatus(status);
  return (
    <div className={baseClass}>
      {icon === "spinner" ? <Spinner size="x-small" /> : <Icon name={icon} />}
      {label}
    </div>
  );
};

export default SetupSoftwareStatusCell;

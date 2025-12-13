import React from "react";
import { useTranslation } from "react-i18next";
import PATHS from "router/paths";

import { getPathWithQueryParams } from "utilities/url";

import HostCountCard from "../HostCountCard";

const baseClass = "hosts-low-space";

interface ILowDiskSpaceHostsProps {
  lowDiskSpaceGb: number;
  lowDiskSpaceCount: number;
  selectedPlatformLabelId?: number;
  currentTeamId?: number;
  notSupported: boolean;
}

const LowDiskSpaceHosts = ({
  lowDiskSpaceGb,
  lowDiskSpaceCount,
  selectedPlatformLabelId,
  currentTeamId,
  notSupported = false, // default to supporting this feature
}: ILowDiskSpaceHostsProps): JSX.Element => {
  const { t } = useTranslation();

  // build the manage hosts URL filtered by low disk space only
  // currently backend cannot filter by both low disk space and label
  const endpoint = selectedPlatformLabelId
    ? PATHS.MANAGE_HOSTS_LABEL(selectedPlatformLabelId)
    : PATHS.MANAGE_HOSTS;
  const path = getPathWithQueryParams(endpoint, {
    low_disk_space: lowDiskSpaceGb,
    team_id: currentTeamId,
  });

  const tooltipText = notSupported
    ? t("dashboard:lowDiskSpace.notSupported")
    : t("dashboard:lowDiskSpace.tooltip", { gb: lowDiskSpaceGb });

  return (
    <HostCountCard
      iconName="low-disk-space-hosts"
      count={lowDiskSpaceCount}
      title={t("dashboard:lowDiskSpace.title")}
      tooltip={tooltipText}
      path={path}
      notSupported={notSupported}
      className={baseClass}
      iconPosition="left"
    />
  );
};

export default LowDiskSpaceHosts;

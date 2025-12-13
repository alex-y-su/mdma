import React from "react";
import { useTranslation } from "react-i18next";
import PATHS from "router/paths";

import { getPathWithQueryParams } from "utilities/url";

import HostCountCard from "../HostCountCard";

const baseClass = "hosts-missing";

interface IMissingHostsProps {
  missingCount: number;
  selectedPlatformLabelId?: number;
  currentTeamId?: number;
}

const MissingHosts = ({
  missingCount,
  selectedPlatformLabelId,
  currentTeamId,
}: IMissingHostsProps): JSX.Element => {
  const { t } = useTranslation();

  // build the manage hosts URL filtered by missing and platform
  const queryParams = {
    status: "missing",
    team_id: currentTeamId,
  };

  const endpoint = selectedPlatformLabelId
    ? PATHS.MANAGE_HOSTS_LABEL(selectedPlatformLabelId)
    : PATHS.MANAGE_HOSTS;
  const path = getPathWithQueryParams(endpoint, queryParams);

  return (
    <HostCountCard
      iconName="missing-hosts"
      count={missingCount}
      title={t("dashboard:missingHosts.title")}
      tooltip={t("dashboard:missingHosts.tooltip")}
      path={path}
      className={baseClass}
      iconPosition="left"
    />
  );
};

export default MissingHosts;

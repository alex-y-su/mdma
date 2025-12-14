import React from "react";
import { useTranslation } from "react-i18next";
import PATHS from "router/paths";

import { getPathWithQueryParams } from "utilities/url";

import HostCountCard from "../HostCountCard";

const baseClass = "hosts-total";

interface ITotalHostsProps {
  totalCount?: number;
  selectedPlatformLabelId?: number;
  currentTeamId?: number;
}

const TotalHosts = ({
  totalCount,
  selectedPlatformLabelId,
  currentTeamId,
}: ITotalHostsProps): JSX.Element => {
  const { t } = useTranslation();

  // build the manage hosts URL filtered by low disk space only
  // currently backend cannot filter by both low disk space and label
  const endpoint = selectedPlatformLabelId
    ? PATHS.MANAGE_HOSTS_LABEL(selectedPlatformLabelId)
    : PATHS.MANAGE_HOSTS;
  const path = getPathWithQueryParams(endpoint, {
    team_id: currentTeamId,
  });

  return (
    <HostCountCard
      iconName="total-hosts"
      count={totalCount || 0}
      title={t("dashboard:totalHosts.title")}
      tooltip={t("dashboard:totalHosts.tooltip")}
      path={path}
      className={baseClass}
      iconPosition="left"
    />
  );
};

export default TotalHosts;

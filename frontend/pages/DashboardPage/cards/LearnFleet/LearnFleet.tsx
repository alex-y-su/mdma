import React from "react";
import { useTranslation } from "react-i18next";

import Icon from "components/Icon/Icon";

const baseClass = "learn-fleet";

const LearnFleet = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={baseClass}>
      <p>{t("dashboard:learnFleet.description")}</p>
      <a
        className="dashboard-info-card__action-button"
        href="https://fleetdm.com/docs/using-fleet/learn-how-to-use-fleet"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("dashboard:learnFleet.linkText")}
        <Icon name="arrow-internal-link" color="ui-fleet-black-75" />
      </a>
    </div>
  );
};

export default LearnFleet;

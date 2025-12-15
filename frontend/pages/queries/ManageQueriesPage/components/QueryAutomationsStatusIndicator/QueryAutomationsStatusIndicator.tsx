import StatusIndicator from "components/StatusIndicator";
import React from "react";
import { useTranslation } from "react-i18next";

interface IQueryAutomationsStatusIndicator {
  automationsEnabled: boolean;
  interval: number;
}

const QueryAutomationsStatusIndicator = ({
  automationsEnabled,
  interval,
}: IQueryAutomationsStatusIndicator) => {
  const { t } = useTranslation("queries");

  let status;
  if (automationsEnabled) {
    if (interval === 0) {
      status = "paused";
    } else {
      status = "on";
    }
  } else {
    status = "off";
  }

  const tooltip =
    status === "paused"
      ? {
          tooltipText: (
            <>
              <strong>{t("automations.title")}</strong> {t("automations.pausedMessage")}
            </>
          ),
        }
      : undefined;
  return (
    <StatusIndicator
      value={status}
      tooltip={tooltip}
      customIndicatorType="query-automations"
    />
  );
};

export default QueryAutomationsStatusIndicator;

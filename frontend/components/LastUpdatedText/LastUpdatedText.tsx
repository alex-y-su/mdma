import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useTranslation } from "react-i18next";
import { abbreviateTimeUnits } from "utilities/helpers";

import TooltipWrapper from "components/TooltipWrapper";

const baseClass = "component__last-updated-text";

interface ILastUpdatedTextBase {
  lastUpdatedAt?: string | null;
}

interface ILastUpdatedTextWithCustomTooltip extends ILastUpdatedTextBase {
  customTooltipText: React.ReactNode;
  whatToRetrieve?: never;
}

interface ILastUpdatedTextWithWhatToRetrieve extends ILastUpdatedTextBase {
  customTooltipText?: never;
  whatToRetrieve: string;
}

const LastUpdatedText = ({
  lastUpdatedAt,
  whatToRetrieve,
  customTooltipText,
}:
  | ILastUpdatedTextWithCustomTooltip
  | ILastUpdatedTextWithWhatToRetrieve): JSX.Element => {
  const { t } = useTranslation("common");

  let timeText: string;
  if (!lastUpdatedAt || lastUpdatedAt === "0001-01-01T00:00:00Z") {
    timeText = t("lastUpdated.never");
  } else {
    timeText = abbreviateTimeUnits(
      formatDistanceToNowStrict(new Date(lastUpdatedAt), {
        addSuffix: true,
      })
    );
  }

  const tooltipContent =
    customTooltipText ||
    t("lastUpdated.fleetPeriodicallyQueries", { whatToRetrieve });

  return (
    <span className={baseClass}>
      <TooltipWrapper tipContent={tooltipContent}>
        {t("lastUpdated.updated", { time: timeText })}
      </TooltipWrapper>
    </span>
  );
};

export default LastUpdatedText;

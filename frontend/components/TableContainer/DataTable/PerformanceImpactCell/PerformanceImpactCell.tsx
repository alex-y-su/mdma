import React from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { uniqueId } from "lodash";

import ReactTooltip from "react-tooltip";
import { COLORS } from "styles/var/colors";

interface IPerformanceImpactCellValue {
  indicator: string;
  id?: number;
}
interface IPerformanceImpactCellProps {
  value: IPerformanceImpactCellValue;
  isHostSpecific?: boolean;
  customIdPrefix?: string;
}

const generateClassTag = (rawValue: string): string => {
  return rawValue.replace(" ", "-").toLowerCase();
};

const baseClass = "performance-impact-cell";

const PerformanceImpactCell = ({
  value,
  isHostSpecific = false,
  customIdPrefix,
}: IPerformanceImpactCellProps): JSX.Element => {
  const { t } = useTranslation("common");
  const { indicator, id } = value;
  const pillClassName = classnames(
    "data-table__pill",
    `data-table__pill--${generateClassTag(indicator || "")}`,
    "tooltip"
  );

  const disableTooltip = ![
    "Minimal",
    "Considerable",
    "Excessive",
    "Undetermined",
  ].includes(indicator);

  const tooltipText = () => {
    switch (indicator) {
      case "Minimal":
        return t("performanceImpact.minimalTooltip");
      case "Considerable":
        return t("performanceImpact.considerableTooltip");
      case "Excessive":
        return t("performanceImpact.excessiveTooltip");
      case "Denylisted":
        return t("performanceImpact.denylistedTooltip");
      case "Undetermined":
        return t("performanceImpact.undeterminedTooltip", {
          queryType: isHostSpecific ? t("performanceImpact.the") : t("performanceImpact.this"),
          hostSuffix: isHostSpecific ? t("performanceImpact.onThisHost") : ""
        });
      default:
        return null;
    }
  };
  const tooltipId = uniqueId();

  return (
    <span className={`${baseClass}`}>
      <span
        data-tip
        data-for={`${customIdPrefix || "pill"}__${id?.toString() || tooltipId}`}
        data-tip-disable={disableTooltip}
      >
        <span className={pillClassName}>
          {indicator === "Minimal" && t("performanceImpact.minimal")}
          {indicator === "Considerable" && t("performanceImpact.considerable")}
          {indicator === "Excessive" && t("performanceImpact.excessive")}
          {indicator === "Undetermined" && t("performanceImpact.undetermined")}
          {indicator === "Denylisted" && t("performanceImpact.denylisted")}
          {!["Minimal", "Considerable", "Excessive", "Undetermined", "Denylisted"].includes(indicator) && indicator}
        </span>
      </span>
      <ReactTooltip
        place="top"
        effect="solid"
        backgroundColor={COLORS["tooltip-bg"]}
        id={`${customIdPrefix || "pill"}__${id?.toString() || tooltipId}`}
        data-html
      >
        <span
          className={`tooltip ${generateClassTag(
            indicator || ""
          )}__tooltip-text`}
        >
          {tooltipText()}
        </span>
      </ReactTooltip>
    </span>
  );
};

export default PerformanceImpactCell;

import React from "react";
import i18n from "i18next";
import { MdmProfileStatus } from "interfaces/mdm";
import { IndicatorStatus } from "components/StatusIndicatorWithIcon/StatusIndicatorWithIcon";

interface IAggregateDisplayOption {
  value: MdmProfileStatus;
  text: string;
  iconName: IndicatorStatus;
  tooltipText: JSX.Element;
}

const AGGREGATE_STATUS_DISPLAY_OPTIONS: IAggregateDisplayOption[] = [
  {
    value: "verified",
    text: i18n.t("controls.osSettings.profileStatus.verified", { ns: "settings" }),
    iconName: "success",
    tooltipText: <>These hosts applied all OS settings. Fleet verified.</>,
  },
  {
    value: "verifying",
    text: i18n.t("controls.osSettings.diskEncryption.status.verifying", { ns: "settings" }),
    iconName: "successPartial",
    tooltipText: (
      <>
        These hosts acknowledged all MDM commands to apply OS settings. Fleet is
        verifying the OS settings are applied.
      </>
    ),
  },
  {
    value: "pending",
    text: i18n.t("controls.osSettings.profileStatus.pending", { ns: "settings" }),
    iconName: "pendingPartial",
    tooltipText: (
      <>
        These hosts will apply the latest OS settings. <br />
        Click on a host to view which settings.
      </>
    ),
  },
  {
    value: "failed",
    text: i18n.t("controls.osSettings.profileStatus.failed", { ns: "settings" }),
    iconName: "error",
    tooltipText: (
      <>
        These hosts failed to apply the latest OS settings. <br />
        Click on a host to view error(s).
      </>
    ),
  },
];

export default AGGREGATE_STATUS_DISPLAY_OPTIONS;

import React from "react";
import classnames from "classnames";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslation } from "react-i18next";
import {
  IHostMdmProfile,
  BootstrapPackageStatus,
  isWindowsDiskEncryptionStatus,
  isLinuxDiskEncryptionStatus,
} from "interfaces/mdm";
import { IOSSettings, IHostMaintenanceWindow } from "interfaces/host";
import { IAppleDeviceUpdates } from "interfaces/config";
import {
  DiskEncryptionSupportedPlatform,
  isAndroid,
  isIPadOrIPhone,
  isDiskEncryptionSupportedLinuxPlatform,
  isOsSettingsDisplayPlatform,
  platformSupportsDiskEncryption,
} from "interfaces/platform";
import { ROLLING_ARCH_LINUX_VERSIONS } from "interfaces/software";

import getHostStatusTooltipText from "pages/hosts/helpers";

import TooltipWrapperArchLinuxRolling from "components/TooltipWrapperArchLinuxRolling";
import TooltipWrapper from "components/TooltipWrapper";
import Icon from "components/Icon/Icon";
import Card from "components/Card";
import DataSet from "components/DataSet";
import StatusIndicator from "components/StatusIndicator";
import IssuesIndicator from "pages/hosts/components/IssuesIndicator";
import DiskSpaceIndicator from "pages/hosts/components/DiskSpaceIndicator";
import {
  humanHostMemory,
  wrapFleetHelper,
  removeOSPrefix,
  compareVersions,
} from "utilities/helpers";
import {
  DATE_FNS_FORMAT_STRINGS,
  DEFAULT_EMPTY_CELL_VALUE,
} from "utilities/constants";

import OSSettingsIndicator from "./OSSettingsIndicator";
import BootstrapPackageIndicator from "./BootstrapPackageIndicator/BootstrapPackageIndicator";

import {
  generateLinuxDiskEncryptionSetting,
  generateWinDiskEncryptionSetting,
} from "../../helpers";

const baseClass = "host-summary-card";

interface IBootstrapPackageData {
  status?: BootstrapPackageStatus | "";
  details?: string;
}

interface IHostSummaryProps {
  summaryData: any; // TODO: create interfaces for this and use consistently across host pages and related helpers
  bootstrapPackageData?: IBootstrapPackageData;
  isPremiumTier?: boolean;
  toggleOSSettingsModal?: () => void;
  toggleBootstrapPackageModal?: () => void;
  hostSettings?: IHostMdmProfile[];
  osVersionRequirement?: IAppleDeviceUpdates;
  osSettings?: IOSSettings;
  className?: string;
}

const getDiskEncryptionMessages = (t: any) => ({
  darwin: {
    enabled: (
      <>
        {t("diskEncryption.darwin.enabled.line1")}
        <br /> {t("diskEncryption.darwin.enabled.line2")}
      </>
    ),
    disabled: (
      <>
        {t("diskEncryption.darwin.disabled.line1")}
        <br /> {t("diskEncryption.darwin.disabled.line2")}
      </>
    ),
  },
  windows: {
    enabled: (
      <>
        {t("diskEncryption.windows.enabled.line1")}
        <br /> {t("diskEncryption.windows.enabled.line2")}
      </>
    ),
    disabled: t("diskEncryption.windows.disabled"),
  },
  linux: {
    enabled: t("diskEncryption.linux.enabled"),
    unknown: t("diskEncryption.linux.unknown"),
  },
});

const getHostDiskEncryptionTooltipMessage = (
  platform: DiskEncryptionSupportedPlatform, // TODO: improve this type
  diskEncryptionEnabled = false,
  t: any
) => {
  const DISK_ENCRYPTION_MESSAGES = getDiskEncryptionMessages(t);

  if (platform === "chrome") {
    return t("diskEncryption.chrome.default");
  }

  if (
    platform === "rhel" ||
    platform === "ubuntu" ||
    platform === "arch" ||
    platform === "archarm" ||
    platform === "manjaro" ||
    platform === "manjaro-arm"
  ) {
    return DISK_ENCRYPTION_MESSAGES.linux[
      diskEncryptionEnabled ? "enabled" : "unknown"
    ];
  }

  // mac or windows
  return DISK_ENCRYPTION_MESSAGES[platform][
    diskEncryptionEnabled ? "enabled" : "disabled"
  ];
};

const HostSummary = ({
  summaryData,
  bootstrapPackageData,
  isPremiumTier,
  toggleOSSettingsModal,
  toggleBootstrapPackageModal,
  hostSettings,
  osVersionRequirement,
  osSettings,
  className,
}: IHostSummaryProps): JSX.Element => {
  const { t } = useTranslation("hosts");
  const classNames = classnames(baseClass, className);

  const {
    status,
    platform,
    os_version,
    disk_encryption_enabled: diskEncryptionEnabled,
  } = summaryData;

  const isAndroidHost = isAndroid(platform);
  const isChromeHost = platform === "chrome";
  const isIosOrIpadosHost = isIPadOrIPhone(platform);

  const renderIssues = () => (
    <DataSet
      title={t("summary.issues")}
      value={
        <IssuesIndicator
          totalIssuesCount={summaryData.issues.total_issues_count}
          criticalVulnerabilitiesCount={
            summaryData.issues.critical_vulnerabilities_count
          }
          failingPoliciesCount={summaryData.issues.failing_policies_count}
          tooltipPosition="bottom"
        />
      }
    />
  );

  const renderHostTeam = () => (
    <DataSet
      title={t("summary.team")}
      value={
        summaryData.team_name !== "---" ? (
          `${summaryData.team_name}`
        ) : (
          <span className="no-team">{t("summary.noTeam")}</span>
        )
      }
    />
  );

  const renderDiskSpaceSummary = () => {
    // Hide disk space field if storage measurement is not supported (sentinel value -1)
    if (
      typeof summaryData.gigs_disk_space_available === "number" &&
      summaryData.gigs_disk_space_available < 0
    ) {
      return null;
    }

    const title = isAndroidHost ? (
      <TooltipWrapper tipContent={t("summary.diskSpace.androidTooltip")}>
        {t("summary.diskSpace")}
      </TooltipWrapper>
    ) : (
      t("summary.diskSpace")
    );

    return (
      <DataSet
        title={title}
        value={
          <DiskSpaceIndicator
            gigsDiskSpaceAvailable={summaryData.gigs_disk_space_available}
            percentDiskSpaceAvailable={summaryData.percent_disk_space_available}
            gigsTotalDiskSpace={summaryData.gigs_total_disk_space}
            gigsAllDiskSpace={summaryData.gigs_all_disk_space}
            platform={platform}
            tooltipPosition="bottom"
          />
        }
      />
    );
  };
  const renderDiskEncryptionSummary = () => {
    if (!platformSupportsDiskEncryption(platform, os_version)) {
      return <></>;
    }
    const tooltipMessage = getHostDiskEncryptionTooltipMessage(
      platform,
      diskEncryptionEnabled,
      t
    );

    let statusText;
    switch (true) {
      case isChromeHost:
        statusText = t("summary.diskEncryption.status.alwaysOn");
        break;
      case diskEncryptionEnabled === true:
        statusText = t("summary.diskEncryption.status.on");
        break;
      case diskEncryptionEnabled === false:
        statusText = t("summary.diskEncryption.status.off");
        break;
      case (diskEncryptionEnabled === null ||
        diskEncryptionEnabled === undefined) &&
        platformSupportsDiskEncryption(platform, os_version):
        statusText = t("summary.diskEncryption.status.unknown");
        break;
      default:
        // something unexpected happened on the way to this component, display whatever we got or
        // "Unknown" to draw attention to the issue.
        statusText =
          diskEncryptionEnabled || t("summary.diskEncryption.status.unknown");
    }

    return (
      <DataSet
        title={t("summary.diskEncryption.title")}
        value={
          <TooltipWrapper tipContent={tooltipMessage}>
            {statusText}
          </TooltipWrapper>
        }
      />
    );
  };

  const renderOperatingSystemSummary = () => {
    // No tooltip if minimum version is not set, including all Windows, Linux, ChromeOS, Android operating systems
    if (!osVersionRequirement?.minimum_version) {
      const version = summaryData.os_version;
      const versionForRender = ROLLING_ARCH_LINUX_VERSIONS.includes(version) ? (
        // wrap a tooltip around the "rolling" suffix
        <>
          {version.slice(0, -8)}
          <TooltipWrapperArchLinuxRolling />
        </>
      ) : (
        version
      );
      return (
        <DataSet
          title={t("summary.operatingSystem")}
          value={versionForRender}
          className={`${baseClass}__os-data-set`}
        />
      );
    }

    const osVersionWithoutPrefix = removeOSPrefix(summaryData.os_version);
    const osVersionRequirementMet =
      compareVersions(
        osVersionWithoutPrefix,
        osVersionRequirement.minimum_version
      ) >= 0;

    return (
      <DataSet
        title={t("summary.operatingSystem")}
        value={
          <>
            {!osVersionRequirementMet && (
              <Icon name="error-outline" color="ui-fleet-black-75" />
            )}
            <TooltipWrapper
              tipContent={
                osVersionRequirementMet ? (
                  t("summary.os.meetsRequirement")
                ) : (
                  <>
                    {t("summary.os.doesNotMeetRequirement")}
                    <br />
                    {t("summary.os.deadlineToUpdate")}:{" "}
                    {osVersionRequirement.deadline}
                  </>
                )
              }
            >
              {summaryData.os_version}
            </TooltipWrapper>
          </>
        }
      />
    );
  };

  const renderAgentSummary = () => {
    if (isIosOrIpadosHost || isAndroidHost) {
      return null;
    }

    if (isChromeHost) {
      return (
        <DataSet
          title={t("summary.agent")}
          value={summaryData.osquery_version}
        />
      );
    }

    if (summaryData.orbit_version !== DEFAULT_EMPTY_CELL_VALUE) {
      return (
        <DataSet
          title={t("summary.agent")}
          value={
            <TooltipWrapper
              tipContent={
                <>
                  {t("summary.agent.osquery")}: {summaryData.osquery_version}
                  <br />
                  {t("summary.agent.orbit")}: {summaryData.orbit_version}
                  {summaryData.fleet_desktop_version !==
                    DEFAULT_EMPTY_CELL_VALUE && (
                    <>
                      <br />
                      {t("summary.agent.fleetDesktop")}:{" "}
                      {summaryData.fleet_desktop_version}
                    </>
                  )}
                </>
              }
            >
              {summaryData.orbit_version}
            </TooltipWrapper>
          }
        />
      );
    }
    return (
      <DataSet
        title={t("summary.agent.osquery")}
        value={summaryData.osquery_version}
      />
    );
  };

  const renderMaintenanceWindow = ({
    starts_at,
    timezone,
  }: IHostMaintenanceWindow) => {
    const formattedStartsAt = formatInTimeZone(
      starts_at,
      // since startsAt is already localized and contains offset information, this 2nd parameter is
      // logically redundant. It's included here to allow use of date-fns-tz.formatInTimeZone instead of date-fns.format, which
      // allows us to format a UTC datetime without converting to the user-agent local time.
      timezone || "UTC",
      DATE_FNS_FORMAT_STRINGS.dateAtTime
    );

    const tip =
      timezone && timezone !== "UTC" ? (
        <>
          {t("summary.maintenance.endUserTimezone")}:
          <br />
          (GMT{starts_at.slice(-6)}) {timezone.replace("_", " ")}
        </>
      ) : (
        <>
          {t("summary.maintenance.timezoneUnavailable")}.
          <br />
          {t("summary.maintenance.displayingInUTC")}.
        </>
      );

    return (
      <DataSet
        title={t("summary.maintenance.scheduledMaintenance")}
        value={
          <TooltipWrapper tipContent={tip}>{formattedStartsAt}</TooltipWrapper>
        }
      />
    );
  };

  // for windows and linux hosts we have to manually add a profile for disk encryption
  // as this is not currently included in the `profiles` value from the API
  // response for windows and linux hosts.
  if (
    platform === "windows" &&
    osSettings?.disk_encryption?.status &&
    isWindowsDiskEncryptionStatus(osSettings.disk_encryption.status)
  ) {
    const winDiskEncryptionSetting: IHostMdmProfile = generateWinDiskEncryptionSetting(
      osSettings.disk_encryption.status,
      osSettings.disk_encryption.detail
    );
    hostSettings = hostSettings
      ? [...hostSettings, winDiskEncryptionSetting]
      : [winDiskEncryptionSetting];
  }

  if (
    isDiskEncryptionSupportedLinuxPlatform(platform, os_version) &&
    osSettings?.disk_encryption?.status &&
    isLinuxDiskEncryptionStatus(osSettings.disk_encryption.status)
  ) {
    const linuxDiskEncryptionSetting: IHostMdmProfile = generateLinuxDiskEncryptionSetting(
      osSettings.disk_encryption.status,
      osSettings.disk_encryption.detail
    );
    hostSettings = hostSettings
      ? [...hostSettings, linuxDiskEncryptionSetting]
      : [linuxDiskEncryptionSetting];
  }

  return (
    <Card
      borderRadiusSize="xxlarge"
      paddingSize="xlarge"
      className={classNames}
    >
      {!isIosOrIpadosHost && !isAndroidHost && (
        <DataSet
          title={t("summary.status")}
          value={
            <StatusIndicator
              value={status || ""} // temporary work around of integration test bug
              tooltip={{
                tooltipText: getHostStatusTooltipText(status),
                position: "bottom",
              }}
            />
          }
        />
      )}
      {summaryData.issues?.total_issues_count > 0 &&
        !isIosOrIpadosHost &&
        !isAndroidHost &&
        renderIssues()}
      {isPremiumTier && renderHostTeam()}
      {/* Rendering of OS Settings data */}
      {isOsSettingsDisplayPlatform(platform, os_version) &&
        hostSettings &&
        hostSettings.length > 0 && (
          <DataSet
            title={t("summary.osSettings")}
            value={
              <OSSettingsIndicator
                profiles={hostSettings}
                onClick={toggleOSSettingsModal}
              />
            }
          />
        )}
      {bootstrapPackageData?.status && !isIosOrIpadosHost && !isAndroidHost && (
        <DataSet
          title={t("summary.bootstrapPackage")}
          value={
            <BootstrapPackageIndicator
              status={bootstrapPackageData.status}
              onClick={toggleBootstrapPackageModal}
            />
          }
        />
      )}
      {!isChromeHost && renderDiskSpaceSummary()}
      {renderDiskEncryptionSummary()}
      {!isIosOrIpadosHost && (
        <DataSet
          title={t("summary.memory")}
          value={wrapFleetHelper(humanHostMemory, summaryData.memory)}
        />
      )}
      {!isIosOrIpadosHost && (
        <DataSet
          title={t("summary.processorType")}
          value={summaryData.cpu_type}
        />
      )}
      {renderOperatingSystemSummary()}
      {renderAgentSummary()}
      {isPremiumTier &&
        // TODO - refactor normalizeEmptyValues pattern
        !!summaryData.maintenance_window &&
        summaryData.maintenance_window !== "---" &&
        renderMaintenanceWindow(summaryData.maintenance_window)}
    </Card>
  );
};

export default HostSummary;

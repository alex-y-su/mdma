/* eslint-disable react/prop-types */
// disable this rule as it was throwing an error in Header and Cell component
// definitions for the selection row for some reason when we dont really need it.
import React from "react";
import { CellProps, Column } from "react-table";
import ReactTooltip from "react-tooltip";
import { TFunction } from "i18next";

import { IDeviceUser, IHost } from "interfaces/host";
import {
  isAndroid,
  isAppleDevice,
  isMobilePlatform,
} from "interfaces/platform";
import { isBYODAccountDrivenUserEnrollment } from "interfaces/mdm";
import { ROLLING_ARCH_LINUX_VERSIONS } from "interfaces/software";

import TooltipWrapperArchLinuxRolling from "components/TooltipWrapperArchLinuxRolling";
import Checkbox from "components/forms/fields/Checkbox";
import DiskSpaceIndicator from "pages/hosts/components/DiskSpaceIndicator";
import HeaderCell from "components/TableContainer/DataTable/HeaderCell/HeaderCell";
import HostMdmStatusCell from "components/TableContainer/DataTable/HostMdmStatusCell/HostMdmStatusCell";
import IssueCell from "components/TableContainer/DataTable/IssueCell/IssueCell";
import LinkCell from "components/TableContainer/DataTable/LinkCell/LinkCell";
import StatusIndicator from "components/StatusIndicator";
import TextCell from "components/TableContainer/DataTable/TextCell/TextCell";
import TooltipTruncatedTextCell from "components/TableContainer/DataTable/TooltipTruncatedTextCell";
import TooltipWrapper from "components/TooltipWrapper";
import { HumanTimeDiffWithFleetLaunchCutoff } from "components/HumanTimeDiffWithDateTip";
import NotSupported from "components/NotSupported";

import {
  humanHostMemory,
  humanHostLastSeen,
  hostTeamName,
  tooltipTextWithLineBreaks,
} from "utilities/helpers";
import { COLORS } from "styles/var/colors";
import {
  IHeaderProps,
  IStringCellProps,
  INumberCellProps,
} from "interfaces/datatable_config";
import PATHS from "router/paths";
import { DEFAULT_EMPTY_CELL_VALUE } from "utilities/constants";
import getHostStatusTooltipText from "../helpers";

type IHostTableColumnConfig = Column<IHost> & {
  // This is used to prevent these columns from being hidden. This will be
  // used in EditColumnsModal to prevent these columns from being hidden.
  disableHidden?: boolean;
  // We add title in the column config to be able to use it in the EditColumnsModal
  // as well
  title?: string;
};

type IHostTableHeaderProps = IHeaderProps<IHost>;
type IHostTableStringCellProps = IStringCellProps<IHost>;
type IHostTableNumberCellProps = INumberCellProps<IHost>;
type ISelectionCellProps = CellProps<IHost>;
type IIssuesCellProps = CellProps<IHost, IHost["issues"]>;
type IDeviceUserCellProps = CellProps<IHost, IHost["device_mapping"]>;

const condenseDeviceUsers = (users: IDeviceUser[]): string[] => {
  if (!users?.length) {
    return [];
  }
  const condensed =
    users.length === 4
      ? users
          .slice(-4)

          .map((u) => u.email)
          .reverse()
      : users
          .slice(-3)
          .map((u) => u.email)
          .reverse() || [];
  return users.length > 4
    ? condensed.concat(`+${users.length - 3} more`) // TODO: confirm limit
    : condensed;
};

const lastSeenTime = (
  status: string,
  seenTime: string,
  t: TFunction
): string => {
  if (status !== "online") {
    return `${t("hosts:tooltips.lastSeenPrefix")} ${humanHostLastSeen(
      seenTime
    )}`;
  }
  return t("hosts:tooltips.lastSeenOnline");
};

const getAllHostTableHeaders = (t: TFunction): IHostTableColumnConfig[] => [
  // We are using React Table useRowSelect functionality for the selection header.
  // More information on its API can be found here
  // https://react-table.tanstack.com/docs/api/useRowSelect
  {
    id: "selection",
    Header: (cellProps: IHostTableHeaderProps) => {
      const props = cellProps.getToggleAllRowsSelectedProps();
      const checkboxProps = {
        value: props.checked,
        indeterminate: props.indeterminate,
        onChange: () => cellProps.toggleAllRowsSelected(),
      };
      return <Checkbox {...checkboxProps} enableEnterToCheck />;
    },
    Cell: (cellProps: ISelectionCellProps) => {
      const props = cellProps.row.getToggleRowSelectedProps();
      const checkboxProps = {
        value: props.checked,
        onChange: () => cellProps.row.toggleRowSelected(),
      };
      return <Checkbox {...checkboxProps} enableEnterToCheck />;
    },
    disableHidden: true,
  },
  {
    title: t("hosts:columns.host"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.host")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "display_name",
    id: "display_name",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (
        // if the host is pending, we want to disable the link to host details
        cellProps.row.original.mdm.enrollment_status === "Pending" &&
        // pending status is only supported for Apple devices
        (cellProps.row.original.platform === "darwin" ||
          cellProps.row.original.platform === "ios" ||
          cellProps.row.original.platform === "ipados") &&
        // osquery version is populated along with the rest of host details so use it
        // here to check if we already have host details and don't need to disable the link
        !cellProps.row.original.osquery_version
      ) {
        return (
          <>
            <span
              className="text-cell"
              data-tip
              data-for={`host__${cellProps.row.original.id}`}
            >
              {cellProps.cell.value}
            </span>
            <ReactTooltip
              effect="solid"
              backgroundColor={COLORS["tooltip-bg"]}
              id={`host__${cellProps.row.original.id}`}
              data-html
            >
              <span className={`tooltip__tooltip-text`}>
                {t("hosts:tooltips.pendingHost")}
              </span>
            </ReactTooltip>
          </>
        );
      }
      return (
        <LinkCell
          value={cellProps.cell.value}
          path={PATHS.HOST_DETAILS(cellProps.row.original.id)}
          title={lastSeenTime(
            cellProps.row.original.status,
            cellProps.row.original.seen_time,
            t
          )}
        />
      );
    },
    disableHidden: true,
  },
  {
    title: t("hosts:columns.hostname"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.hostname")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "hostname",
    id: "hostname",
    Cell: (cellProps: IHostTableStringCellProps) => (
      <TooltipTruncatedTextCell value={cellProps.cell.value} />
    ),
  },
  {
    title: t("hosts:columns.computerName"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.computerName")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "computer_name",
    id: "computer_name",
    Cell: (cellProps: IHostTableStringCellProps) => (
      <TextCell value={cellProps.cell.value} />
    ),
  },
  {
    title: t("hosts:columns.team"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.team")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "team_name",
    id: "team_name",
    Cell: (cellProps) => (
      <TextCell value={cellProps.cell.value} formatter={hostTeamName} />
    ),
  },
  {
    title: t("hosts:columns.status"),
    Header: (cellProps: IHostTableHeaderProps) => {
      const titleWithToolTip = (
        <TooltipWrapper
          tipContent={<>{t("hosts:tooltips.statusHeader")}</>}
          className="status-header"
        >
          {t("hosts:columns.status")}
        </TooltipWrapper>
      );
      return (
        <HeaderCell
          value={
            cellProps.rows.length === 1
              ? t("hosts:columns.status")
              : titleWithToolTip
          }
          disableSortBy
        />
      );
    },
    disableSortBy: true,
    accessor: "status",
    id: "status",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (isMobilePlatform(cellProps.row.original.platform)) {
        return NotSupported;
      }

      // Show "---" for ABM devices with Pending enrollment status
      if (
        cellProps.row.original.mdm?.enrollment_status === "Pending" &&
        isAppleDevice(cellProps.row.original.platform)
      ) {
        const tooltip = {
          tooltipText: getHostStatusTooltipText("---"),
        };
        return <StatusIndicator value="---" tooltip={tooltip} />;
      }

      const value = cellProps.cell.value;
      const tooltip = {
        tooltipText: getHostStatusTooltipText(value),
      };
      return <StatusIndicator value={value} tooltip={tooltip} />;
    },
  },
  {
    title: t("hosts:columns.issues"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.issues")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "issues",
    id: "issues",
    sortDescFirst: true,
    Cell: (cellProps: IIssuesCellProps) => {
      if (isMobilePlatform(cellProps.row.original.platform)) {
        return NotSupported;
      }
      return (
        <IssueCell
          issues={cellProps.row.original.issues}
          rowId={cellProps.row.original.id}
        />
      );
    },
  },
  {
    title: t("hosts:columns.diskSpaceAvailable"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.diskSpaceAvailable")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    id: "gigs_disk_space_available",
    Cell: (cellProps: IHostTableNumberCellProps) => {
      const {
        platform,
        percent_disk_space_available,
        gigs_disk_space_available,
        gigs_total_disk_space,
        gigs_all_disk_space,
      } = cellProps.row.original;
      if (platform === "chrome") {
        return NotSupported;
      }
      return (
        <DiskSpaceIndicator
          inTableCell
          gigsDiskSpaceAvailable={gigs_disk_space_available}
          percentDiskSpaceAvailable={percent_disk_space_available}
          gigsTotalDiskSpace={gigs_total_disk_space}
          gigsAllDiskSpace={gigs_all_disk_space}
          platform={platform}
        />
      );
    },
  },
  {
    title: t("hosts:columns.operatingSystem"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.operatingSystem")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "os_version",
    id: "os_version",
    // TODO(android): is Android supported? what about the os versions endpoint and dashboard card?
    Cell: (cellProps: IHostTableStringCellProps) => {
      const os_version = cellProps.cell.value;
      const versionForRender = ROLLING_ARCH_LINUX_VERSIONS.includes(
        os_version
      ) ? (
        // wrap a tooltip around the "rolling" suffix
        <>
          {os_version.slice(0, -8)}&nbsp;
          <TooltipWrapperArchLinuxRolling />
        </>
      ) : (
        os_version
      );
      return <TooltipTruncatedTextCell value={versionForRender} />;
    },
  },
  {
    title: t("hosts:columns.osquery"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.osquery")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "osquery_version",
    id: "osquery_version",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (isMobilePlatform(cellProps.row.original.platform)) {
        return NotSupported;
      }
      return <TextCell value={cellProps.cell.value} />;
    },
  },
  {
    title: t("hosts:columns.usedBy"),
    Header: t("hosts:columns.usedBy"),
    disableSortBy: true,
    accessor: "device_mapping",
    id: "device_mapping",
    Cell: (cellProps: IDeviceUserCellProps) => {
      // TODO(android): is android supported?
      const numUsers = cellProps.cell.value?.length || 0;
      const users = condenseDeviceUsers(cellProps.cell.value || []);
      if (users.length > 1) {
        return (
          <TooltipWrapper
            tipContent={tooltipTextWithLineBreaks(users)}
            underline={false}
            showArrow
            position="top"
            tipOffset={10}
          >
            <TextCell
              italic
              value={t("hosts:usersCount", { count: numUsers })}
            />
          </TooltipWrapper>
        );
      }
      if (users.length === 1) {
        return <TextCell value={users[0]} />;
      }
      return <TextCell />;
    },
  },
  {
    title: t("hosts:columns.privateIpAddress"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.privateIpAddress")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "primary_ip",
    id: "primary_ip",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (isMobilePlatform(cellProps.row.original.platform)) {
        return NotSupported;
      }
      return <TextCell value={cellProps.cell.value} />;
    },
  },
  {
    title: t("hosts:columns.mdmStatus"),
    Header: () => {
      const titleWithToolTip = (
        <TooltipWrapper tipContent={<>{t("hosts:tooltips.mdmStatus")}</>}>
          {t("hosts:columns.mdmStatus")}
        </TooltipWrapper>
      );
      return <HeaderCell value={titleWithToolTip} disableSortBy />;
    },
    disableSortBy: true,
    accessor: (originalRow) => originalRow.mdm.enrollment_status,
    id: "mdm.enrollment_status",
    Cell: HostMdmStatusCell,
  },
  {
    title: t("hosts:columns.mdmServerUrl"),
    Header: () => {
      const titleWithToolTip = (
        <TooltipWrapper tipContent={<>{t("hosts:tooltips.mdmServerUrl")}</>}>
          {t("hosts:columns.mdmServerUrl")}
        </TooltipWrapper>
      );
      return <HeaderCell value={titleWithToolTip} disableSortBy />;
    },
    disableSortBy: true,
    accessor: (originalRow) => originalRow.mdm.server_url,
    id: "mdm.server_url",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (cellProps.row.original.platform === "chrome") {
        return NotSupported;
      }
      if (cellProps.cell.value) {
        return <TooltipTruncatedTextCell value={cellProps.cell.value} />;
      }
      return <span className="text-muted">{DEFAULT_EMPTY_CELL_VALUE}</span>;
    },
  },
  {
    title: t("hosts:columns.publicIpAddress"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={
          <TooltipWrapper tipContent={t("hosts:tooltips.publicIpAddress")}>
            {t("hosts:columns.publicIpAddress")}
          </TooltipWrapper>
        }
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "public_ip",
    id: "public_ip",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (isMobilePlatform(cellProps.row.original.platform)) {
        return NotSupported;
      }
      return (
        <TextCell value={cellProps.cell.value ?? DEFAULT_EMPTY_CELL_VALUE} />
      );
    },
  },
  {
    title: t("hosts:columns.lastFetched"),
    Header: (cellProps: IHostTableHeaderProps) => {
      const titleWithToolTip = (
        <TooltipWrapper tipContent={<>{t("hosts:tooltips.lastFetched")}</>}>
          {t("hosts:columns.lastFetched")}
        </TooltipWrapper>
      );
      return (
        <HeaderCell
          value={titleWithToolTip}
          isSortedDesc={cellProps.column.isSortedDesc}
        />
      );
    },
    accessor: "detail_updated_at",
    id: "detail_updated_at",
    Cell: (cellProps: IHostTableStringCellProps) => (
      // TODO(android): android doesn't support refetch?
      <TextCell
        value={{ timeString: cellProps.cell.value }}
        formatter={HumanTimeDiffWithFleetLaunchCutoff}
      />
    ),
  },
  {
    title: t("hosts:columns.lastSeen"),
    Header: (cellProps: IHostTableHeaderProps) => {
      const titleWithToolTip = (
        <TooltipWrapper tipContent={<>{t("hosts:tooltips.lastSeen")}</>}>
          {t("hosts:columns.lastSeen")}
        </TooltipWrapper>
      );
      return (
        <HeaderCell
          value={titleWithToolTip}
          isSortedDesc={cellProps.column.isSortedDesc}
        />
      );
    },
    accessor: "seen_time",
    id: "seen_time",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (isMobilePlatform(cellProps.row.original.platform)) {
        return NotSupported;
      }
      return (
        <TextCell
          value={{ timeString: cellProps.cell.value }}
          formatter={HumanTimeDiffWithFleetLaunchCutoff}
        />
      );
    },
  },
  {
    title: t("hosts:columns.uuid"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.uuid")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "uuid",
    id: "uuid",
    Cell: ({ cell: { value } }: IHostTableStringCellProps) =>
      value ? <TooltipTruncatedTextCell value={value} /> : <TextCell />,
  },
  {
    title: t("hosts:columns.lastRestarted"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.lastRestarted")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "last_restarted_at",
    id: "last_restarted_at",
    Cell: (cellProps: IHostTableStringCellProps) => {
      const { platform, last_restarted_at } = cellProps.row.original;

      if (isMobilePlatform(platform) || platform === "chrome") {
        return NotSupported;
      }
      return (
        <TextCell
          value={{
            timeString: last_restarted_at,
          }}
          formatter={HumanTimeDiffWithFleetLaunchCutoff}
        />
      );
    },
  },
  {
    title: t("hosts:columns.cpu"),
    Header: t("hosts:columns.cpu"),
    disableSortBy: true,
    accessor: "cpu_type",
    id: "cpu_type",
    Cell: (cellProps: IHostTableStringCellProps) => {
      if (
        cellProps.row.original.platform === "ios" ||
        cellProps.row.original.platform === "ipados"
      ) {
        return NotSupported;
      }
      return <TextCell value={cellProps.cell.value} />;
    },
  },
  {
    title: t("hosts:columns.ram"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.ram")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "memory",
    id: "memory",
    Cell: (cellProps: IHostTableNumberCellProps) => {
      if (
        cellProps.row.original.platform === "ios" ||
        cellProps.row.original.platform === "ipados"
      ) {
        return NotSupported;
      }
      return (
        <TextCell value={cellProps.cell.value} formatter={humanHostMemory} />
      );
    },
  },
  {
    title: t("hosts:columns.macAddress"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.macAddress")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "primary_mac",
    id: "primary_mac",
    Cell: (cellProps: IHostTableStringCellProps) => {
      // TODO(android): is iOS/iPadOS supported?
      if (isAndroid(cellProps.row.original.platform)) {
        return NotSupported;
      }
      return <TextCell value={cellProps.cell.value} />;
    },
  },
  {
    title: t("hosts:columns.serialNumber"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.serialNumber")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "hardware_serial",
    id: "hardware_serial",
    Cell: (cellProps: IHostTableStringCellProps) => {
      // TODO(android): is iOS/iPadOS supported?
      if (
        isAndroid(cellProps.row.original.platform) ||
        isBYODAccountDrivenUserEnrollment(
          cellProps.row.original.mdm.enrollment_status
        )
      ) {
        return NotSupported;
      }
      return <TextCell value={cellProps.cell.value} />;
    },
  },
  {
    title: t("hosts:columns.hardwareModel"),
    Header: (cellProps: IHostTableHeaderProps) => (
      <HeaderCell
        value={t("hosts:columns.hardwareModel")}
        isSortedDesc={cellProps.column.isSortedDesc}
      />
    ),
    accessor: "hardware_model",
    id: "hardware_model",
    Cell: (cellProps: IHostTableStringCellProps) => (
      <TextCell value={cellProps.cell.value} />
    ),
  },
];

const defaultHiddenColumns = [
  "hostname",
  "computer_name",
  "device_mapping",
  "primary_mac",
  "public_ip",
  "cpu_type",
  // TODO: should those be mdm.<blah>?
  "mdm.server_url",
  "mdm.enrollment_status",
  "memory",
  "uptime",
  "uuid",
  "seen_time",
  "hardware_model",
  "hardware_serial",
];

/**
 * Will generate a host table column configuration based off of the current user
 * permissions and license tier of fleet they are on.
 */
const generateAvailableTableHeaders = ({
  t,
  isFreeTier = true,
  isOnlyObserver = true,
}: {
  t: TFunction;
  isFreeTier: boolean | undefined;
  isOnlyObserver: boolean | undefined;
}): IHostTableColumnConfig[] => {
  return getAllHostTableHeaders(t).reduce(
    (columns: Column<IHost>[], currentColumn: Column<IHost>) => {
      // skip over column headers that are not shown in free observer tier
      if (isFreeTier) {
        if (
          isOnlyObserver &&
          ["selection", "team_name"].includes(currentColumn.id || "")
        ) {
          return columns;
          // skip over column headers that are not shown in free admin/maintainer
        }
        if (
          currentColumn.id === "team_name" ||
          currentColumn.id === "mdm.server_url" ||
          currentColumn.id === "mdm.enrollment_status"
        ) {
          return columns;
        }
      } else if (isOnlyObserver && currentColumn.id === "selection") {
        // In premium tier, we want to check user role to enable/disable select column
        return columns;
      }

      columns.push(currentColumn);
      return columns;
    },
    []
  );
};

/**
 * Will generate a host table column configuration that a user currently sees.
 */
const generateVisibleTableColumns = ({
  t,
  hiddenColumns,
  isFreeTier = true,
  isOnlyObserver = true,
}: {
  t: TFunction;
  hiddenColumns: string[];
  isFreeTier: boolean | undefined;
  isOnlyObserver: boolean | undefined;
}): IHostTableColumnConfig[] => {
  // remove columns set as hidden by the user.
  return generateAvailableTableHeaders({
    t,
    isFreeTier,
    isOnlyObserver,
  }).filter((column) => {
    return !hiddenColumns.includes(column.id as string);
  });
};

export {
  defaultHiddenColumns,
  generateAvailableTableHeaders,
  generateVisibleTableColumns,
};

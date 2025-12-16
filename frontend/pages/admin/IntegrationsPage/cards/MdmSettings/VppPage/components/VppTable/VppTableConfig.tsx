import React from "react";
import { CellProps, Column } from "react-table";
import i18n from "i18next";

import { IMdmAbmToken, IMdmVppToken } from "interfaces/mdm";
import { IHeaderProps, IStringCellProps } from "interfaces/datatable_config";
import { IDropdownOption } from "interfaces/dropdownOption";

import HeaderCell from "components/TableContainer/DataTable/HeaderCell";
import ActionsDropdown from "components/ActionsDropdown";
import TextCell from "components/TableContainer/DataTable/TextCell";
import { getGitOpsModeTipContent } from "utilities/helpers";

import RenewDateCell from "../../../components/RenewDateCell";
import { IRenewDateCellStatusConfig } from "../../../components/RenewDateCell/RenewDateCell";
import TeamsCell from "./TeamsCell";

type IAbmTableConfig = Column<IMdmVppToken>;
type ITableStringCellProps = IStringCellProps<IMdmVppToken>;
type IRenewDateCellProps = CellProps<IMdmVppToken, IMdmVppToken["renew_date"]>;
type ITeamsCellProps = CellProps<IMdmVppToken, IMdmVppToken["teams"]>;

type ITableHeaderProps = IHeaderProps<IMdmVppToken>;

const getDefaultActionOptions = (): IDropdownOption[] => {
  const t = i18n.getFixedT(null, "settings");
  return [
    {
      value: "editTeams",
      label: t("mdmSettings.vpp.table.actions.editTeams"),
      disabled: false,
    },
    {
      value: "renew",
      label: t("mdmSettings.vpp.table.actions.renew"),
      disabled: false,
    },
    {
      value: "delete",
      label: t("mdmSettings.vpp.table.actions.delete"),
      disabled: false,
    },
  ];
};

const generateActions = (gitopsModeEnabled: boolean, repoURL: string) => {
  const defaultOptions = getDefaultActionOptions();

  if (!gitopsModeEnabled) {
    return defaultOptions;
  }

  return defaultOptions.map((option) => {
    if (option.value !== "editTeams") {
      return option;
    }

    return {
      ...option,
      disabled: true,
      tooltipContent: getGitOpsModeTipContent(repoURL),
    };
  });
};

const getRenewDateCellStatusConfig = (): IRenewDateCellStatusConfig => {
  const t = i18n.getFixedT(null, "settings");
  return {
    warning: {
      tooltipText: (
        <>
          {t("mdmSettings.vpp.table.renewWarning")}
          <br />
          {t("mdmSettings.vpp.table.renewInstructions")}
        </>
      ),
    },
    error: {
      tooltipText: (
        <>
          {t("mdmSettings.vpp.table.renewError")}
          <br />
          {t("mdmSettings.vpp.table.renewInstructions")}
        </>
      ),
    },
  };
};

export const generateTableConfig = (
  actionSelectHandler: (value: string, team: IMdmVppToken) => void,
  gitopsModeEnabled: boolean,
  repoURL: string
): IAbmTableConfig[] => {
  const t = i18n.getFixedT(null, "settings");
  const renewDateConfig = getRenewDateCellStatusConfig();

  return [
    {
      accessor: "org_name",
      sortType: "caseInsensitive",
      Header: (cellProps: ITableHeaderProps) => (
        <HeaderCell
          value={t("mdmSettings.vpp.table.orgName")}
          isSortedDesc={cellProps.column.isSortedDesc}
        />
      ),
      Cell: (cellProps: ITableStringCellProps) => (
        <TextCell value={cellProps.cell.value} />
      ),
    },
    {
      accessor: "location",
      Header: t("mdmSettings.vpp.table.location"),
      disableSortBy: true,
      Cell: (cellProps: ITableStringCellProps) => (
        <TextCell value={cellProps.cell.value} />
      ),
    },
    {
      accessor: "renew_date",
      Header: t("mdmSettings.vpp.table.renewDate"),
      disableSortBy: true,
      Cell: (cellProps: IRenewDateCellProps) => (
        <RenewDateCell
          value={cellProps.cell.value}
          statusConfig={renewDateConfig}
          className="vpp-renew-date-cell"
        />
      ),
    },

    {
      accessor: "teams",
      Header: t("mdmSettings.vpp.table.teams"),
      disableSortBy: true,
      Cell: (cellProps: ITeamsCellProps) => (
        <TeamsCell teams={cellProps.cell.value} className="vpp-teams-cell" />
      ),
    },
    {
      Header: "",
      disableSortBy: true,
      // the accessor here is insignificant, we just need it as its required
      // but we don't use it.
      accessor: "id",
      Cell: (cellProps) => (
        <ActionsDropdown
          options={generateActions(gitopsModeEnabled, repoURL)}
          onChange={(value: string) =>
            actionSelectHandler(value, cellProps.row.original)
          }
          placeholder={t("mdmSettings.vpp.table.actions.placeholder")}
          variant="small-button"
        />
      ),
    },
  ];
};

export const generateTableData = (data: IMdmAbmToken[]) => {
  return data;
};

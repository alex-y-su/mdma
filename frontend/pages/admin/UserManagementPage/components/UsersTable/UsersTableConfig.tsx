import React from "react";
import { TFunction } from "i18next";

import HeaderCell from "components/TableContainer/DataTable/HeaderCell/HeaderCell";
import StatusIndicator from "components/StatusIndicator";
import TextCell from "components/TableContainer/DataTable/TextCell/TextCell";
import TooltipTruncatedTextCell from "components/TableContainer/DataTable/TooltipTruncatedTextCell";
import TooltipWrapper from "components/TooltipWrapper";
import { IInvite } from "interfaces/invite";
import { IUser, UserRole } from "interfaces/user";
import { IDropdownOption } from "interfaces/dropdownOption";
import { generateRole, generateTeam, greyCell } from "utilities/helpers";
import { DEFAULT_EMPTY_CELL_VALUE } from "utilities/constants";
import { renderApiUserIndicator } from "pages/admin/TeamManagementPage/TeamDetailsWrapper/UsersPage/UsersPageTableConfig";
import ActionsDropdown from "../../../../../components/ActionsDropdown";

interface IHeaderProps {
  column: {
    title: string;
    isSortedDesc: boolean;
  };
}

interface IRowProps {
  row: {
    original: IUser | IInvite;
  };
}

interface ICellProps extends IRowProps {
  cell: {
    value: string;
  };
}

interface IActionsDropdownProps extends IRowProps {
  cell: {
    value: IDropdownOption[];
  };
}

interface IDataColumn {
  title: string;
  Header: ((props: IHeaderProps) => JSX.Element) | string;
  accessor: string;
  Cell:
    | ((props: ICellProps) => JSX.Element)
    | ((props: IActionsDropdownProps) => JSX.Element);
  disableHidden?: boolean;
  disableSortBy?: boolean;
}

export interface IUserTableData {
  name: string;
  status: string;
  email: string;
  teams: string;
  role: UserRole;
  actions: IDropdownOption[];
  id: number;
  type: string;
  api_only: boolean;
}

// NOTE: cellProps come from react-table
// more info here https://react-table.tanstack.com/docs/api/useTable#cell-properties
const generateTableHeaders = (
  actionSelectHandler: (value: string, user: IUser | IInvite) => void,
  isPremiumTier: boolean | undefined,
  t?: TFunction
): IDataColumn[] => {
  const tableHeaders: IDataColumn[] = [
    {
      title: t ? t("settings:admin.users.table.name") : "Name",
      Header: t ? t("settings:admin.users.table.name") : "Name",
      disableSortBy: true,
      accessor: "name",
      Cell: (cellProps: ICellProps) => {
        const apiOnlyUser =
          "api_only" in cellProps.row.original
            ? cellProps.row.original.api_only
            : false;

        return (
          <TooltipTruncatedTextCell
            value={cellProps.cell.value}
            suffix={apiOnlyUser && renderApiUserIndicator()}
          />
        );
      },
    },
    {
      title: t ? t("settings:admin.users.table.role") : "Role",
      Header: t ? t("settings:admin.users.table.role") : "Role",
      accessor: "role",
      disableSortBy: true,
      Cell: (cellProps: ICellProps) => {
        if (cellProps.cell.value === "GitOps") {
          return (
            <TooltipWrapper
              tipContent={
                t ? (
                  t("settings:admin.users.roleTooltips.gitops")
                ) : (
                  <>
                    The GitOps role is only available on the command-line
                    <br />
                    when creating an API-only user. This user has no
                    <br />
                    access to the UI.
                  </>
                )
              }
            >
              GitOps
            </TooltipWrapper>
          );
        }
        if (cellProps.cell.value === "Observer+") {
          return (
            <TooltipWrapper
              tipContent={
                t ? (
                  t("settings:admin.users.roleTooltips.observerPlus")
                ) : (
                  <>
                    Users with the Observer+ role have access to all of
                    <br />
                    the same functions as an Observer, with the added
                    <br />
                    ability to run any live query against all hosts.
                  </>
                )
              }
            >
              {cellProps.cell.value}
            </TooltipWrapper>
          );
        }
        const greyAndItalic = greyCell(cellProps.cell.value);
        return (
          <TextCell
            value={cellProps.cell.value}
            grey={greyAndItalic}
            italic={greyAndItalic}
          />
        );
      },
    },
    {
      title: t ? t("settings:admin.users.table.status") : "Status",
      Header: (cellProps) => (
        <HeaderCell
          value={cellProps.column.title}
          isSortedDesc={cellProps.column.isSortedDesc}
        />
      ),
      accessor: "status",
      Cell: (cellProps: ICellProps) => (
        <StatusIndicator value={cellProps.cell.value} />
      ),
    },
    {
      title: t ? t("settings:admin.users.table.email") : "Email",
      Header: t ? t("settings:admin.users.table.email") : "Email",
      disableSortBy: true,
      accessor: "email",
      Cell: (cellProps: ICellProps) => (
        <TextCell value={cellProps.cell.value} />
      ),
    },
    {
      title: t ? t("settings:admin.users.table.actions") : "Actions",
      Header: "",
      disableSortBy: true,
      accessor: "actions",
      Cell: (cellProps: IActionsDropdownProps) => (
        <ActionsDropdown
          options={cellProps.cell.value}
          onChange={(value: string) =>
            actionSelectHandler(value, cellProps.row.original)
          }
          placeholder={t ? t("settings:admin.users.table.actions") : "Actions"}
          menuAlign="right"
          variant="small-button"
        />
      ),
    },
  ];

  // Add Teams column for premium tier
  if (isPremiumTier) {
    tableHeaders.splice(2, 0, {
      title: t ? t("settings:users.columns.teams") : "Teams",
      Header: t ? t("settings:users.columns.teams") : "Teams",
      accessor: "teams",
      disableSortBy: true,
      Cell: (cellProps: ICellProps) => (
        <TextCell value={cellProps.cell.value} />
      ),
    });
  }

  return tableHeaders;
};

const generateStatus = (
  type: string,
  data: IUser | IInvite,
  t?: TFunction
): string => {
  const { teams, global_role } = data;
  if (global_role === null && teams.length === 0) {
    return t ? t("settings:admin.users.statusValues.noAccess") : "No access";
  }

  return type === "invite"
    ? t
      ? t("settings:admin.users.statusValues.invitePending")
      : "Invite pending"
    : t
    ? t("settings:admin.users.statusValues.active")
    : "Active";
};

const generateActionDropdownOptions = (
  isCurrentUser: boolean,
  isInvitePending: boolean,
  isSsoEnabled: boolean,
  t?: TFunction
): IDropdownOption[] => {
  let dropdownOptions = [
    {
      label: t ? t("settings:admin.users.actions.edit") : "Edit",
      disabled: false,
      value: isCurrentUser ? "editMyAccount" : "edit",
    },
    {
      label: t
        ? t("settings:admin.users.actions.requirePasswordReset")
        : "Require password reset",
      disabled: isInvitePending,
      value: "passwordReset",
    },
    {
      label: t
        ? t("settings:admin.users.actions.resetSessions")
        : "Reset sessions",
      disabled: isInvitePending,
      value: "resetSessions",
    },
    {
      label: t ? t("settings:admin.users.actions.delete") : "Delete",
      disabled: isCurrentUser,
      value: "delete",
    },
  ];

  if (isCurrentUser) {
    // remove "Reset sessions" from dropdownOptions
    dropdownOptions = dropdownOptions.filter(
      (option) => option.value !== "resetSessions"
    );
  }

  if (isSsoEnabled) {
    // remove "Require password reset" from dropdownOptions
    dropdownOptions = dropdownOptions.filter(
      (option) => option.value !== "passwordReset"
    );
  }
  return dropdownOptions;
};

const enhanceUserData = (
  users: IUser[],
  currentUserId: number,
  t?: TFunction
): IUserTableData[] => {
  return users.map((user) => {
    return {
      name: user.name || DEFAULT_EMPTY_CELL_VALUE,
      status: generateStatus("user", user, t),
      email: user.email,
      teams: generateTeam(user.teams, user.global_role),
      role: generateRole(user.teams, user.global_role),
      actions: generateActionDropdownOptions(
        user.id === currentUserId,
        false,
        user.sso_enabled,
        t
      ),
      id: user.id,
      type: "user",
      api_only: user.api_only,
    };
  });
};

const enhanceInviteData = (
  invites: IInvite[],
  t?: TFunction
): IUserTableData[] => {
  return invites.map((invite) => {
    return {
      name: invite.name || DEFAULT_EMPTY_CELL_VALUE,
      status: generateStatus("invite", invite, t),
      email: invite.email,
      teams: generateTeam(invite.teams, invite.global_role),
      role: generateRole(invite.teams, invite.global_role),
      actions: generateActionDropdownOptions(
        false,
        true,
        invite.sso_enabled,
        t
      ),
      id: invite.id,
      type: "invite",
      api_only: false, // api only users are created through fleetctl and not invites
    };
  });
};

const combineDataSets = (
  users: IUser[],
  invites: IInvite[],
  currentUserId: number,
  t?: TFunction
): IUserTableData[] => {
  return [
    ...enhanceUserData(users, currentUserId, t),
    ...enhanceInviteData(invites, t),
  ];
};

export { generateTableHeaders, combineDataSets };

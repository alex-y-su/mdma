import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";

import { IHostUser } from "interfaces/host_users";
import TableContainer from "components/TableContainer";
import {
  DEFAULT_PAGE_SIZE,
  ITableQueryData,
} from "components/TableContainer/TableContainer";
import TableCount from "components/TableContainer/TableCount";
import EmptyTable from "components/EmptyTable";
import CustomLink from "components/CustomLink";
import Card from "components/Card";
import CardHeader from "components/CardHeader";

import generateTableHeaders from "./LocalUserAccountsTable/LocalUserAccountsTableConfig";

interface ILocalUserAccountsProps {
  users: IHostUser[];
  usersState: { username: string }[];
  isLoading: boolean;
  onUsersTableSearchChange: (queryData: ITableQueryData) => void;
  hostUsersEnabled?: boolean;
  className?: string;
}

const baseClass = "local-user-accounts-card";

const LocalUserAccounts = ({
  users,
  usersState,
  isLoading,
  onUsersTableSearchChange,
  hostUsersEnabled,
  className,
}: ILocalUserAccountsProps): JSX.Element => {
  const { t } = useTranslation();
  const tableHeaders = generateTableHeaders();

  const renderUsersCount = useCallback(() => {
    return <TableCount name="items" count={usersState.length} />;
  }, [usersState.length]);

  if (!hostUsersEnabled) {
    return (
      <Card
        className={baseClass}
        borderRadiusSize="xxlarge"
        paddingSize="xlarge"
      >
        <CardHeader header={t("hosts:localUserAccounts.title")} />
        <EmptyTable
          header={t("hosts:localUserAccounts.collectionDisabled")}
          info={
            <>
              {t("hosts:localUserAccounts.checkDocs")}{" "}
              <CustomLink
                url="https://fleetdm.com/learn-more-about/enable-user-collection"
                text={t("hosts:localUserAccounts.enableFeature")}
                newTab
              />
            </>
          }
        />
      </Card>
    );
  }

  const classNames = classnames(baseClass, className);

  return (
    <Card
      className={classNames}
      borderRadiusSize="xxlarge"
      paddingSize="xlarge"
    >
      <>
        <CardHeader header={t("hosts:localUserAccounts.title")} />
        {users?.length ? (
          <TableContainer
            columnConfigs={tableHeaders}
            data={usersState}
            isLoading={isLoading}
            defaultSortHeader="username"
            defaultSortDirection="asc"
            inputPlaceHolder={t("hosts:localUserAccounts.searchPlaceholder")}
            onQueryChange={onUsersTableSearchChange}
            emptyComponent={() => (
              <EmptyTable
                header={t("hosts:localUserAccounts.noMatchingUsers")}
                info={t("hosts:localUserAccounts.tryDifferentSearch")}
              />
            )}
            showMarkAllPages={false}
            isAllPagesSelected={false}
            searchable
            wideSearch
            renderCount={renderUsersCount}
            isClientSidePagination
            hideFooter={usersState.length < DEFAULT_PAGE_SIZE}
          />
        ) : (
          <EmptyTable
            header={t("hosts:localUserAccounts.noUsersDetected")}
            info={t("hosts:localUserAccounts.expectingUsers")}
          />
        )}
      </>
    </Card>
  );
};

export default LocalUserAccounts;

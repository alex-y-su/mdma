import React, { useCallback, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

import { isAndroid } from "interfaces/platform";
import { IQueryStats } from "interfaces/query_stats";
import { SUPPORT_LINK } from "utilities/constants";
import TableContainer from "components/TableContainer";
import EmptyTable from "components/EmptyTable";
import CustomLink from "components/CustomLink";
import CardHeader from "components/CardHeader";
import PATHS from "router/paths";
import { InjectedRouter } from "react-router";
import { Row } from "react-table";

import {
  generateColumnConfigs,
  generateDataSet,
} from "./HostQueriesTableConfig";

const baseClass = "host-queries-card";

interface IHostQueriesProps {
  hostId: number;
  schedule?: IQueryStats[];
  hostPlatform: string;
  queryReportsDisabled?: boolean;
  router: InjectedRouter;
}

interface IHostQueriesRowProps extends Row {
  original: {
    id?: number;
    should_link_to_hqr?: boolean;
    hostId?: number;
  };
}

const HostQueries = ({
  hostId,
  schedule,
  hostPlatform,
  queryReportsDisabled,
  router,
}: IHostQueriesProps): JSX.Element => {
  const { t } = useTranslation();

  const renderEmptyQueriesTab = () => {
    if (hostPlatform === "chrome") {
      return (
        <EmptyTable
          header={t("hosts:queries.scheduledNotSupported")}
          info={
            <>
              <span>{t("hosts:queries.interestedChromebooks")} </span>
              <CustomLink
                url="https://www.fleetdm.com/contact"
                text={t("hosts:queries.letUsKnow")}
                newTab
              />
            </>
          }
        />
      );
    }

    if (hostPlatform === "ios" || hostPlatform === "ipados") {
      return (
        <EmptyTable
          header={t("hosts:queries.notSupported")}
          info={
            <>
              {hostPlatform === "ios"
                ? t("hosts:queries.interestedIos")
                : t("hosts:queries.interestedIpados")}{" "}
              <CustomLink
                url={SUPPORT_LINK}
                text={t("hosts:queries.letUsKnow")}
                newTab
              />
            </>
          }
        />
      );
    }

    if (isAndroid(hostPlatform)) {
      return (
        <EmptyTable
          header={t("hosts:queries.notSupported")}
          info={
            <>
              {t("hosts:queries.interestedAndroid")}{" "}
              <CustomLink
                url={SUPPORT_LINK}
                text={t("hosts:queries.letUsKnow")}
                newTab
              />
            </>
          }
        />
      );
    }

    return (
      <EmptyTable
        header={t("hosts:queries.noScheduledQueries")}
        info={
          <Trans
            i18nKey="hosts:queries.expectingQueries"
            components={{ strong: <b /> }}
          />
        }
      />
    );
  };

  const onSelectSingleRow = useCallback(
    (row: IHostQueriesRowProps) => {
      const { id: queryId, should_link_to_hqr } = row.original;

      if (!hostId || !queryId || !should_link_to_hqr || queryReportsDisabled) {
        return;
      }
      router.push(`${PATHS.HOST_QUERY_REPORT(hostId, queryId)}`);
    },
    [hostId, queryReportsDisabled, router]
  );

  const tableData = useMemo(() => generateDataSet(schedule ?? []), [schedule]);

  const columnConfigs = useMemo(
    () => generateColumnConfigs(hostId, queryReportsDisabled),
    [hostId, queryReportsDisabled]
  );

  const renderHostQueries = () => {
    if (
      !schedule ||
      !schedule.length ||
      hostPlatform === "chrome" ||
      hostPlatform === "ios" ||
      hostPlatform === "ipados"
    ) {
      return renderEmptyQueriesTab();
    }

    return (
      <div>
        <TableContainer
          columnConfigs={columnConfigs}
          data={tableData}
          onQueryChange={() => null}
          resultsTitle="queries"
          defaultSortHeader="query_name"
          defaultSortDirection="asc"
          showMarkAllPages={false}
          isAllPagesSelected={false}
          emptyComponent={() => <></>}
          disablePagination
          disableCount
          disableMultiRowSelect={!queryReportsDisabled} // Removes hover/click state if reports are disabled
          isLoading={false} // loading state handled at parent level
          onSelectSingleRow={onSelectSingleRow}
        />
      </div>
    );
  };

  return (
    <div className={baseClass}>
      <CardHeader header={t("hosts:queries.title")} />
      {renderHostQueries()}
    </div>
  );
};

export default HostQueries;

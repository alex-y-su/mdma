import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import simpleSearch from "utilities/simple_search";
import { IScheduledQuery } from "interfaces/scheduled_query";

import TableContainer from "components/TableContainer";
import { ITableQueryData } from "components/TableContainer/TableContainer";
import Button from "components/buttons/Button";
import EmptyTable from "components/EmptyTable";
import Icon from "components/Icon/Icon";
import {
  generateTableHeaders,
  generateDataSet,
} from "./PackQueriesTable/PackQueriesTableConfig";

const baseClass = "pack-queries-table";

interface IPackQueriesTableProps {
  onAddPackQuery: () => void;
  onEditPackQuery: (selectedQuery: IScheduledQuery) => void;
  onRemovePackQueries: (selectedTableQueryIds: number[]) => void;
  scheduledQueries: IScheduledQuery[] | undefined;
  isLoadingPackQueries: boolean;
}

const PackQueriesTable = ({
  onAddPackQuery,
  onEditPackQuery,
  onRemovePackQueries,
  scheduledQueries,
  isLoadingPackQueries,
}: IPackQueriesTableProps): JSX.Element => {
  const { t } = useTranslation("queries");
  const [querySearchText, setQuerySearchText] = useState("");

  // NOTE: this is called once on the initial rendering. The initial render of
  // the TableContainer child component will call this handler.
  const onTableQueryChange = (queryData: ITableQueryData) => {
    const { searchQuery, sortHeader, sortDirection } = queryData;
    let sortBy = [];
    if (sortHeader !== "") {
      sortBy = [{ id: sortHeader, direction: sortDirection }];
    }

    if (!searchQuery) {
      setQuerySearchText("");
      return;
    }

    setQuerySearchText(searchQuery);
  };

  const getQueries = () => {
    return simpleSearch(querySearchText, scheduledQueries);
  };

  const onActionSelection = (
    action: string,
    selectedQuery: IScheduledQuery
  ) => {
    switch (action) {
      case "edit":
        onEditPackQuery(selectedQuery);
        break;
      case "remove":
        onRemovePackQueries([selectedQuery.id]);
        break;
      default:
    }
  };

  const tableHeaders = generateTableHeaders(onActionSelection, t);
  const tableData = generateDataSet(getQueries(), t);

  return (
    <div className={`${baseClass}`}>
      {scheduledQueries?.length ? (
        <TableContainer
          columnConfigs={tableHeaders}
          data={tableData}
          isLoading={isLoadingPackQueries}
          defaultSortHeader="name"
          defaultSortDirection="asc"
          inputPlaceHolder={t("packs.queries.searchPlaceholder")}
          onQueryChange={onTableQueryChange}
          resultsTitle={t("packs.queries.title").toLowerCase()}
          emptyComponent={() =>
            EmptyTable({
              header: t("packs.queries.noMatchTitle"),
              info: t("packs.queries.noMatchInfo"),
            })
          }
          showMarkAllPages={false}
          actionButton={{
            name: "add query",
            buttonText: t("packs.queries.addButton"),
            iconSvg: "plus",
            variant: "inverse",
            onClick: onAddPackQuery,
          }}
          primarySelectAction={{
            name: "remove query",
            buttonText: t("packs.queries.removeButton"),
            iconSvg: "close",
            variant: "inverse",
            onClick: onRemovePackQueries,
          }}
          searchable
          disablePagination
          isAllPagesSelected={false}
        />
      ) : (
        <div className={`${baseClass}__no-queries`}>
          <p>{t("packs.queries.noQueries")}</p>
          <Button onClick={onAddPackQuery} variant="inverse" iconStroke>
            <>
              {t("packs.queries.addButton")}
              <Icon name="plus" />
            </>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PackQueriesTable;

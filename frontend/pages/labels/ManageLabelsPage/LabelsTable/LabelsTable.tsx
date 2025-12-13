import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { ILabel } from "interfaces/label";

import { IUser } from "interfaces/user";

import TableContainer from "components/TableContainer";
import TableCount from "components/TableContainer/TableCount";
import EmptyTable from "components/EmptyTable";

import { generateDataSet, generateTableHeaders } from "./LabelsTableConfig";

const baseClass = "labels-table";

interface ILabelsTable {
  labels: ILabel[];
  onClickAction: (action: string, label: ILabel) => void;
  currentUser: IUser;
}

const LabelsTable = ({ labels, onClickAction, currentUser }: ILabelsTable) => {
  const { t } = useTranslation();

  const tableHeaders = generateTableHeaders(currentUser, onClickAction, t);

  const tableData = generateDataSet(labels);

  return (
    <TableContainer
      className={baseClass}
      isLoading={false}
      columnConfigs={tableHeaders}
      data={tableData}
      defaultSortHeader="name"
      defaultSortDirection="asc"
      resultsTitle={t("labels:table.resultsTitle")}
      showMarkAllPages={false}
      isAllPagesSelected={false}
      isClientSidePagination
      renderCount={() =>
        tableData.length ? (
          <TableCount
            name={t("labels:table.resultsTitle")}
            count={tableData.length}
          />
        ) : null
      }
      emptyComponent={() =>
        EmptyTable({
          header: t("labels:table.empty.title"),
          info: t("labels:table.empty.description"),
        })
      }
    />
  );
};

export default memo(LabelsTable);

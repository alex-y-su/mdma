import React from "react";
import { TFunction } from "i18next";

import { IMacadminsResponse } from "interfaces/host";

import TextCell from "components/TableContainer/DataTable/TextCell";

// NOTE: cellProps come from react-table
// more info here https://react-table.tanstack.com/docs/api/useTable#cell-properties
interface ICellProps {
  cell: {
    value: string;
  };
  row: {
    original: IMacadminsResponse;
  };
}

interface IHeaderProps {
  column: {
    title: string;
    isSortedDesc: boolean;
  };
}

const generateMunkiVersionsTableHeaders = (t?: TFunction) => [
  {
    title: t?.("tableHeaders.version") || "Version",
    Header: t?.("tableHeaders.version") || "Version",
    disableSortBy: true,
    accessor: "version",
    Cell: (cellProps: ICellProps) => <TextCell value={cellProps.cell.value} />,
  },
  {
    title: t?.("tableHeaders.hosts") || "Hosts",
    Header: t?.("tableHeaders.hosts") || "Hosts",
    disableSortBy: true,
    accessor: "hosts_count",
    Cell: (cellProps: ICellProps) => <TextCell value={cellProps.cell.value} />,
  },
];

export default generateMunkiVersionsTableHeaders;

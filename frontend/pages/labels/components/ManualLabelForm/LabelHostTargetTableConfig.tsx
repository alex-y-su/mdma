/* eslint-disable react/prop-types */

import React from "react";
import { Column, Row } from "react-table";
import { TFunction } from "i18next";

import { IStringCellProps } from "interfaces/datatable_config";
import { IHost } from "interfaces/host";

import TextCell from "components/TableContainer/DataTable/TextCell";
import Icon from "components/Icon/Icon";

export type ITargestInputHostTableConfig = Column<IHost>;
type ITableStringCellProps = IStringCellProps<IHost>;

// NOTE: cellProps come from react-table
// more info here https://react-table.tanstack.com/docs/api/useTable#cell-properties
export const generateTableHeaders = (
  handleRowRemove?: (value: Row<IHost>) => void,
  t?: TFunction
): ITargestInputHostTableConfig[] => {
  const deleteHeader = handleRowRemove
    ? [
        {
          id: "delete",
          Header: "",
          Cell: (cellProps: ITableStringCellProps) => (
            <div onClick={() => handleRowRemove(cellProps.row)}>
              <Icon name="close-filled" />
            </div>
          ),
          disableHidden: true,
        },
      ]
    : [];

  return [
    {
      Header: t ? t("labels:hostTable.host") : "Host",
      accessor: "display_name",
      Cell: (cellProps) => <TextCell value={cellProps.cell.value} />,
    },
    {
      Header: t ? t("labels:hostTable.hostname") : "Hostname",
      accessor: "hostname",
      Cell: (cellProps) => <TextCell value={cellProps.cell.value} />,
    },
    {
      Header: t ? t("labels:hostTable.serialNumber") : "Serial number",
      accessor: "hardware_serial",
      Cell: (cellProps) => <TextCell value={cellProps.cell.value} />,
    },
    ...deleteHeader,
  ];
};

export default null;

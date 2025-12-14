import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { IPack } from "interfaces/pack";
import { IEmptyTableProps } from "interfaces/empty_table";
import Button from "components/buttons/Button";

import TableContainer from "components/TableContainer";
import EmptyTable from "components/EmptyTable";
import { IActionButtonProps } from "components/TableContainer/DataTable/ActionButton/ActionButton";
import { generateTableHeaders, generateDataSet } from "./PacksTableConfig";

const baseClass = "packs-table";

interface IPacksTableProps {
  onDeletePackClick: (selectedTablePackIds: number[]) => void;
  onEnablePackClick: (selectedTablePackIds: number[]) => void;
  onDisablePackClick: (selectedTablePackIds: number[]) => void;
  onCreatePackClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  packs?: IPack[];
  isLoading: boolean;
}

const PacksTable = ({
  onDeletePackClick,
  onEnablePackClick,
  onDisablePackClick,
  onCreatePackClick,
  packs,
  isLoading,
}: IPacksTableProps): JSX.Element => {
  const { t } = useTranslation("queries");
  const [filteredPacks, setFilteredPacks] = useState<IPack[] | undefined>(
    packs
  );
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    setFilteredPacks(packs);
  }, [packs]);

  useEffect(() => {
    setFilteredPacks(() => {
      return packs?.filter((pack) => {
        return pack.name.toLowerCase().includes(searchString.toLowerCase());
      });
    });
  }, [packs, searchString, setFilteredPacks]);

  const onQueryChange = useCallback(
    (queryData: any) => {
      const { searchQuery } = queryData;
      setSearchString(searchQuery);
    },
    [setSearchString]
  );

  // TODO: useCallback search string
  const emptyState = () => {
    const emptyPacks: IEmptyTableProps = {
      graphicName: "empty-packs",
      header: t("packs.empty.noPacks"),
      info: t("packs.empty.description"),
      primaryButton: (
        <Button
          className={`${baseClass}__create-button`}
          onClick={onCreatePackClick}
        >
          {t("packs.manage.createButton")}
        </Button>
      ),
    };
    if (searchString) {
      delete emptyPacks.graphicName;
      emptyPacks.header = t("packs.empty.noMatch");
      emptyPacks.info = t("packs.empty.tryAgain");
      delete emptyPacks.primaryButton;
    }
    return emptyPacks;
  };

  const tableHeaders = generateTableHeaders(t);

  const secondarySelectActions: IActionButtonProps[] = [
    {
      name: "enable",
      onClick: onEnablePackClick,
      buttonText: t("packs.actions.enable"),
      variant: "inverse",
      iconSvg: "check",
    },
    {
      name: "disable",
      onClick: onDisablePackClick,
      buttonText: t("packs.actions.disable"),
      variant: "inverse",
      iconSvg: "disable",
    },
  ];
  return (
    <div className={`${baseClass}`}>
      <TableContainer
        resultsTitle={t("packs.title").toLowerCase()}
        columnConfigs={tableHeaders}
        data={generateDataSet(filteredPacks)}
        isLoading={isLoading}
        defaultSortHeader="pack"
        defaultSortDirection="desc"
        showMarkAllPages={false}
        isAllPagesSelected={false}
        onQueryChange={onQueryChange}
        inputPlaceHolder={t("packs.table.searchPlaceholder")}
        searchable={packs && packs.length > 0}
        disablePagination
        primarySelectAction={{
          name: "delete pack",
          buttonText: t("packs.actions.delete"),
          iconSvg: "trash",
          variant: "inverse",
          onClick: onDeletePackClick,
        }}
        secondarySelectActions={secondarySelectActions}
        emptyComponent={() =>
          EmptyTable({
            graphicName: emptyState().graphicName,
            header: emptyState().header,
            info: emptyState().info,
            primaryButton: emptyState().primaryButton,
          })
        }
      />
    </div>
  );
};

export default PacksTable;

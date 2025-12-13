import EmptyTable from "components/EmptyTable";
import TableContainer from "components/TableContainer";
import { IOperatingSystemVersion } from "interfaces/operating_system";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  PlatformValueOptions,
  PLATFORM_DISPLAY_NAMES,
} from "utilities/constants";

import generateTableHeaders from "./OSTableConfig";

const DEFAULT_SORT_DIRECTION = "desc";
const DEFAULT_SORT_HEADER = "hosts_count";
const PAGE_SIZE = 8;

const baseClass = "operating-systems";

interface IOSTableProps {
  currentTeamId?: number;
  osVersions: IOperatingSystemVersion[];
  selectedPlatform: PlatformValueOptions;
  isLoading: boolean;
}

const OSTable = ({
  currentTeamId,
  osVersions,
  selectedPlatform,
  isLoading,
}: IOSTableProps) => {
  const { t } = useTranslation();

  const columnConfigs = useMemo(
    () => generateTableHeaders(currentTeamId, undefined),
    [currentTeamId]
  );

  const showPaginationControls = osVersions.length > PAGE_SIZE;

  const EmptyOS = (): JSX.Element => (
    <EmptyTable
      className={`${baseClass}__os-empty-table`}
      header={t("dashboard:operatingSystems.emptyHeader", {
        platform: PLATFORM_DISPLAY_NAMES[selectedPlatform] || "",
      })}
      info={t("dashboard:operatingSystems.emptyInfo")}
    />
  );

  return (
    <TableContainer
      columnConfigs={columnConfigs}
      data={osVersions}
      isLoading={isLoading}
      defaultSortHeader={DEFAULT_SORT_HEADER}
      defaultSortDirection={DEFAULT_SORT_DIRECTION}
      resultsTitle="Operating systems"
      emptyComponent={EmptyOS}
      showMarkAllPages={false}
      isAllPagesSelected={false}
      disableCount
      isClientSidePagination={showPaginationControls}
      disablePagination={!showPaginationControls}
      pageSize={PAGE_SIZE}
    />
  );
};

export default OSTable;

import React, { useMemo, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Row } from "react-table";
import { useTranslation } from "react-i18next";

import { IMdmStatusCardData, IMdmSummaryMdmSolution } from "interfaces/mdm";

import TabNav from "components/TabNav";
import TabText from "components/TabText";
import TableContainer from "components/TableContainer";
import Spinner from "components/Spinner";
import DataError from "components/DataError";
import EmptyTable from "components/EmptyTable";
import CustomLink from "components/CustomLink";

import {
  generateSolutionsTableHeaders,
  generateSolutionsDataSet,
} from "./MDMSolutionsTableConfig";
import {
  generateStatusTableHeaders,
  generateStatusDataSet,
} from "./MDMStatusTableConfig";

export type IMdmSolutionTableData = Pick<
  IMdmSummaryMdmSolution,
  "name" | "hosts_count"
>;

interface IRowProps extends Row {
  original: IMdmSolutionTableData;
}

interface IMdmCardProps {
  error: Error | null;
  isFetching: boolean;
  mdmStatusData: IMdmStatusCardData[];
  mdmSolutions: IMdmSummaryMdmSolution[] | null;
  selectedPlatformLabelId?: number;
  selectedTeamId?: number;
  onClickMdmSolution: (solution: IMdmSolutionTableData) => void;
}

const DEFAULT_SORT_DIRECTION = "desc";
const SOLUTIONS_DEFAULT_SORT_HEADER = "hosts_count";
const STATUS_DEFAULT_SORT_DIRECTION = "asc";
const STATUS_DEFAULT_SORT_HEADER = "status";
const PAGE_SIZE = 8;
const baseClass = "home-mdm";

const EmptyMdmStatus = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <EmptyTable
      header={t("dashboard:mdm.emptyStatusHeader")}
      info={
        <>
          {t("dashboard:mdm.emptyStatusInfo")}&nbsp;
          <CustomLink
            url="https://fleetdm.com/learn-more-about/fleetd"
            newTab
            text={t("dashboard:mdm.emptyStatusLinkText")}
          />
        </>
      }
    />
  );
};

const EmptyMdmSolutions = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <EmptyTable
      header={t("dashboard:mdm.emptySolutionsHeader")}
      info={t("dashboard:mdm.emptySolutionsInfo")}
    />
  );
};

type IMdmSolutionMap = Record<string, IMdmSolutionTableData>;

const reduceSolutionsToObj = (mdmSolutions: IMdmSummaryMdmSolution[]) => {
  return mdmSolutions.reduce<IMdmSolutionMap>((acc, nextSolution) => {
    // The solution name can be an empty string so we add a key for "Unknown"
    // for this case.
    const key = nextSolution.name || "Unknown";
    if (acc[key]) {
      acc[key].hosts_count += nextSolution.hosts_count;
    } else {
      acc[key] = Object.assign({ ...nextSolution });
    }

    return acc;
  }, {});
};

const Mdm = ({
  isFetching,
  error,
  mdmStatusData,
  mdmSolutions,
  selectedPlatformLabelId,
  selectedTeamId,
  onClickMdmSolution,
}: IMdmCardProps): JSX.Element => {
  const { t } = useTranslation();
  const [navTabIndex, setNavTabIndex] = useState(0);

  const onTabChange = (index: number) => {
    setNavTabIndex(index);
  };

  const rolledupMdmSolutionsData = useMemo(() => {
    if (!mdmSolutions) {
      return [];
    }

    return Object.values(reduceSolutionsToObj(mdmSolutions));
  }, [mdmSolutions]);

  const solutionsTableHeaders = useMemo(
    () => generateSolutionsTableHeaders(t),
    [t]
  );
  const statusTableHeaders = useMemo(
    () => generateStatusTableHeaders(selectedTeamId, t),
    [selectedTeamId, t]
  );
  const solutionsDataSet = generateSolutionsDataSet(rolledupMdmSolutionsData, t);
  const statusDataSet = generateStatusDataSet(
    mdmStatusData,
    selectedPlatformLabelId
  );

  // Renders opaque information as host information is loading
  const opacity = isFetching ? { opacity: 0 } : { opacity: 1 };

  const handleSolutionRowClick = (row: IRowProps) => {
    onClickMdmSolution(row.original);
  };

  return (
    <div className={baseClass}>
      {isFetching && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <div style={opacity}>
        <TabNav secondary>
          <Tabs selectedIndex={navTabIndex} onSelect={onTabChange}>
            <TabList>
              <Tab>
                <TabText>{t("dashboard:mdm.tabSolutions")}</TabText>
              </Tab>
              <Tab>
                <TabText>{t("dashboard:mdm.tabStatus")}</TabText>
              </Tab>
            </TabList>
            <TabPanel>
              {error ? (
                <DataError verticalPaddingSize="pad-large" />
              ) : (
                <TableContainer<IRowProps>
                  className={`${baseClass}__mdm-solutions-table`}
                  columnConfigs={solutionsTableHeaders}
                  data={solutionsDataSet}
                  isLoading={isFetching}
                  defaultSortHeader={SOLUTIONS_DEFAULT_SORT_HEADER}
                  defaultSortDirection={DEFAULT_SORT_DIRECTION}
                  resultsTitle="MDM"
                  emptyComponent={EmptyMdmSolutions}
                  showMarkAllPages={false}
                  isAllPagesSelected={false}
                  disableCount
                  disablePagination
                  hideFooter
                  disableMultiRowSelect
                  onClickRow={handleSolutionRowClick}
                  keyboardSelectableRows
                />
              )}
            </TabPanel>
            <TabPanel>
              {error ? (
                <DataError verticalPaddingSize="pad-large" />
              ) : (
                <TableContainer
                  className={`${baseClass}__mdm-status-table`}
                  columnConfigs={statusTableHeaders}
                  data={statusDataSet}
                  isLoading={isFetching}
                  defaultSortHeader={STATUS_DEFAULT_SORT_HEADER}
                  defaultSortDirection={STATUS_DEFAULT_SORT_DIRECTION}
                  resultsTitle="MDM"
                  emptyComponent={EmptyMdmStatus}
                  showMarkAllPages={false}
                  isAllPagesSelected={false}
                  disableCount
                  disablePagination
                  hideFooter
                  pageSize={PAGE_SIZE}
                />
              )}
            </TabPanel>
          </Tabs>
        </TabNav>
      </div>
    </div>
  );
};

export default Mdm;

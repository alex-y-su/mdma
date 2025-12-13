import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import {
  IMunkiIssuesAggregate,
  IMunkiVersionsAggregate,
} from "interfaces/macadmins";

import TabNav from "components/TabNav";
import TabText from "components/TabText";
import TableContainer from "components/TableContainer";
import Spinner from "components/Spinner";
import TableDataError from "components/DataError";
import EmptyTable from "components/EmptyTable";
import CustomLink from "components/CustomLink";

import munkiVersionsTableHeaders from "./MunkiVersionsTableConfig";
import generateMunkiIssuesTableHeaders from "./MunkiIssuesTableConfig";

interface IMunkiCardProps {
  errorMacAdmins: Error | null;
  isMacAdminsFetching: boolean;
  munkiIssuesData: IMunkiIssuesAggregate[];
  munkiVersionsData: IMunkiVersionsAggregate[];
  selectedTeamId?: number;
}

const DEFAULT_SORT_DIRECTION = "desc";
const DEFAULT_SORT_HEADER = "hosts_count";
const PAGE_SIZE = 8;
const baseClass = "home-munki";

const Munki = ({
  errorMacAdmins,
  isMacAdminsFetching,
  munkiIssuesData,
  munkiVersionsData,
  selectedTeamId,
}: IMunkiCardProps): JSX.Element => {
  const { t } = useTranslation();
  const [navTabIndex, setNavTabIndex] = useState<number>(0);

  const tableHeaders = useMemo(
    () => generateMunkiIssuesTableHeaders(selectedTeamId),
    [selectedTeamId]
  );

  const onTabChange = (index: number) => {
    setNavTabIndex(index);
  };

  // Renders opaque information as host information is loading
  const opacity = isMacAdminsFetching ? { opacity: 0 } : { opacity: 1 };

  return (
    <div className={baseClass}>
      {isMacAdminsFetching && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      <div style={opacity}>
        <TabNav secondary>
          <Tabs selectedIndex={navTabIndex} onSelect={onTabChange}>
            <TabList>
              <Tab>
                <TabText>{t("dashboard:munki.issuesTab")}</TabText>
              </Tab>
              <Tab>
                <TabText>{t("dashboard:munki.versionsTab")}</TabText>
              </Tab>
            </TabList>
            <TabPanel>
              {errorMacAdmins ? (
                <TableDataError verticalPaddingSize="pad-large" />
              ) : (
                <TableContainer
                  columnConfigs={tableHeaders}
                  data={munkiIssuesData || []}
                  isLoading={isMacAdminsFetching}
                  defaultSortHeader={DEFAULT_SORT_HEADER}
                  defaultSortDirection={DEFAULT_SORT_DIRECTION}
                  resultsTitle="Munki"
                  emptyComponent={() => (
                    <EmptyTable
                      header={t("dashboard:munki.noIssuesHeader")}
                      info={t("dashboard:munki.noIssuesInfo")}
                    />
                  )}
                  showMarkAllPages={false}
                  isAllPagesSelected={false}
                  isClientSidePagination
                  disableCount
                  disablePagination
                  pageSize={PAGE_SIZE}
                />
              )}
            </TabPanel>
            <TabPanel>
              {errorMacAdmins ? (
                <TableDataError verticalPaddingSize="pad-large" />
              ) : (
                <TableContainer
                  columnConfigs={munkiVersionsTableHeaders}
                  data={munkiVersionsData || []}
                  isLoading={isMacAdminsFetching}
                  defaultSortHeader={DEFAULT_SORT_HEADER}
                  defaultSortDirection={DEFAULT_SORT_DIRECTION}
                  resultsTitle="Munki"
                  emptyComponent={() => (
                    <EmptyTable
                      header={t("dashboard:munki.noVersionsHeader")}
                      info={
                        <>
                          {t("dashboard:munki.noVersionsInfo")}&nbsp;
                          <CustomLink
                            url="https://fleetdm.com/learn-more-about/fleetd"
                            text={t("dashboard:munki.fleetdLink")}
                            newTab
                          />
                          .
                        </>
                      }
                    />
                  )}
                  showMarkAllPages={false}
                  isAllPagesSelected={false}
                  isClientSidePagination
                  disableCount
                  disablePagination
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

export default Munki;

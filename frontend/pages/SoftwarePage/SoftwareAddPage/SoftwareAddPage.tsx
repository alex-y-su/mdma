import React, { useCallback, useContext } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import { InjectedRouter } from "react-router";
import { Location } from "history";
import { useTranslation } from "react-i18next";

import PATHS from "router/paths";
import { getPathWithQueryParams } from "utilities/url";
import { QueryContext } from "context/query";
import useToggleSidePanel from "hooks/useToggleSidePanel";
import { APP_CONTEXT_NO_TEAM_ID } from "interfaces/team";

import SidePanelPage from "components/SidePanelPage";
import MainContent from "components/MainContent";
import BackButton from "components/BackButton";
import TabNav from "components/TabNav";
import TabText from "components/TabText";
import SidePanelContent from "components/SidePanelContent";
import QuerySidePanel from "components/side_panels/QuerySidePanel";

const baseClass = "software-add-page";

interface IAddSoftwareSubNavItem {
  nameKey: string;
  pathname: string;
}

const addSoftwareSubNav: IAddSoftwareSubNavItem[] = [
  {
    nameKey: "software:add.fleetMaintained",
    pathname: PATHS.SOFTWARE_ADD_FLEET_MAINTAINED,
  },
  {
    nameKey: "software:add.appStore",
    pathname: PATHS.SOFTWARE_ADD_APP_STORE,
  },
  {
    nameKey: "software:add.customPackage",
    pathname: PATHS.SOFTWARE_ADD_PACKAGE,
  },
];

const getTabIndex = (path: string): number => {
  return addSoftwareSubNav.findIndex((navItem) => {
    // tab stays highlighted for paths that start with same pathname
    return path.startsWith(navItem.pathname);
  });
};

export interface ISoftwareAddPageQueryParams {
  team_id?: string;
  query?: string;
  page?: string;
  order_key?: string;
  order_direction?: "asc" | "desc";
}

interface ISoftwareAddPageProps {
  children: JSX.Element;
  location: Location<ISoftwareAddPageQueryParams>;
  router: InjectedRouter;
}

const SoftwareAddPage = ({
  children,
  location,
  router,
}: ISoftwareAddPageProps) => {
  const { t } = useTranslation();

  const { selectedOsqueryTable, setSelectedOsqueryTable } = useContext(
    QueryContext
  );
  const { isSidePanelOpen, setSidePanelOpen } = useToggleSidePanel(false);

  const navigateToNav = useCallback(
    (i: number): void => {
      setSidePanelOpen(false);
      // Only query param to persist between tabs is team id
      const navPath = getPathWithQueryParams(addSoftwareSubNav[i].pathname, {
        team_id: location.query.team_id,
      });
      router.replace(navPath);
    },
    [location.query.team_id, router, setSidePanelOpen]
  );

  // Quick exit if no team_id param. This page must have a team id to function
  // correctly. We redirect to the same page with the "No team" context if it
  // is not provieded.
  if (!location.query.team_id) {
    router.replace(
      getPathWithQueryParams(location.pathname, {
        team_id: APP_CONTEXT_NO_TEAM_ID,
      })
    );
    return null;
  }

  const onOsqueryTableSelect = (tableName: string) => {
    setSelectedOsqueryTable(tableName);
  };

  const backUrl = getPathWithQueryParams(PATHS.SOFTWARE_TITLES, {
    team_id: location.query.team_id,
  });

  return (
    <SidePanelPage>
      <>
        <MainContent className={baseClass}>
          <div className={`${baseClass}__header-links`}>
            <BackButton
              text={t("software:page.backToSoftware")}
              path={backUrl}
              className={`${baseClass}__back-to-software`}
            />
          </div>
          <h1>{t("software:add.title")}</h1>
          <TabNav>
            <Tabs
              selectedIndex={getTabIndex(location?.pathname || "")}
              onSelect={navigateToNav}
            >
              <TabList>
                {addSoftwareSubNav.map((navItem) => {
                  const tabName = t(navItem.nameKey);
                  return (
                    <Tab key={navItem.nameKey} data-text={tabName}>
                      <TabText>{tabName}</TabText>
                    </Tab>
                  );
                })}
              </TabList>
            </Tabs>
          </TabNav>
          {React.cloneElement(children, {
            router,
            currentTeamId: parseInt(location.query.team_id, 10),
            isSidePanelOpen,
            setSidePanelOpen,
          })}
        </MainContent>
        {isSidePanelOpen && (
          <SidePanelContent>
            <QuerySidePanel
              key="query-side-panel"
              onOsqueryTableSelect={onOsqueryTableSelect}
              selectedOsqueryTable={selectedOsqueryTable}
              onClose={() => setSidePanelOpen(false)}
            />
          </SidePanelContent>
        )}
      </>
    </SidePanelPage>
  );
};

export default SoftwareAddPage;

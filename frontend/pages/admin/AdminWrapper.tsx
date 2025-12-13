import React, { useContext } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import { InjectedRouter } from "react-router";
import { useTranslation } from "react-i18next";
import PATHS from "router/paths";
import { AppContext } from "context/app";

import TabNav from "components/TabNav";
import MainContent from "components/MainContent";
import TabText from "components/TabText";
import classnames from "classnames";

interface ISettingSubNavItem {
  nameKey: string;
  pathname: string;
  exclude?: boolean;
}

interface ISettingsWrapperProp {
  children: JSX.Element;
  location: {
    pathname: string;
  };
  router: InjectedRouter; // v3
}

const baseClass = "admin-wrapper";

const AdminWrapper = ({
  children,
  location: { pathname },
  router,
}: ISettingsWrapperProp): JSX.Element => {
  const { t } = useTranslation();
  const { isPremiumTier, isSandboxMode } = useContext(AppContext);

  const settingsSubNav: ISettingSubNavItem[] = [
    {
      nameKey: "settings:navigation.organization",
      pathname: PATHS.ADMIN_ORGANIZATION,
      exclude: isSandboxMode,
    },
    {
      nameKey: "settings:navigation.integrations",
      pathname: PATHS.ADMIN_INTEGRATIONS,
    },
    {
      nameKey: "settings:navigation.users",
      pathname: PATHS.ADMIN_USERS,
      exclude: isSandboxMode,
    },
    {
      nameKey: "settings:navigation.teams",
      pathname: PATHS.ADMIN_TEAMS,
      exclude: !isPremiumTier,
    },
  ];

  const filteredSettingsSubNav = settingsSubNav.filter((navItem) => {
    return !navItem.exclude;
  });

  const navigateToNav = (i: number): void => {
    const navPath = filteredSettingsSubNav[i].pathname;
    router.push(navPath);
  };

  const getTabIndex = (path: string): number => {
    return filteredSettingsSubNav.findIndex((navItem) => {
      // tab stays highlighted for paths that start with same pathname
      return path.startsWith(navItem.pathname);
    });
  };

  // we add a conditional sandbox-mode class here as we will need to make some
  // styling changes on the settings page to have the sticky elements work
  // with the sandbox mode expiry message
  const classNames = classnames(baseClass, { "sandbox-mode": isSandboxMode });

  return (
    <MainContent className={classNames}>
      <>
        <h1 className="page-header">{t("settings:admin.pageHeader")}</h1>
        <TabNav>
          <Tabs
            selectedIndex={getTabIndex(pathname)}
            onSelect={(i) => navigateToNav(i)}
          >
            <TabList>
              {filteredSettingsSubNav.map((navItem) => {
                // Bolding text when the tab is active causes a layout shift
                // so we add a hidden pseudo element with the same text string
                const navName = t(navItem.nameKey);
                return (
                  <Tab key={navItem.nameKey} data-text={navName}>
                    <TabText>{navName}</TabText>
                  </Tab>
                );
              })}
            </TabList>
          </Tabs>
        </TabNav>
        {children}
      </>
    </MainContent>
  );
};

export default AdminWrapper;

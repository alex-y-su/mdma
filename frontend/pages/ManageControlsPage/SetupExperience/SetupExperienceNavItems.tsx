import PATHS from "router/paths";
import i18n from "i18next";

import { InjectedRouter } from "react-router";

import { ISideNavItem } from "pages/admin/components/SideNav/SideNav";

import EndUserAuthentication from "./cards/EndUserAuthentication/EndUserAuthentication";
import BootstrapPackage from "./cards/BootstrapPackage";
import SetupAssistant from "./cards/SetupAssistant";
import InstallSoftware from "./cards/InstallSoftware";
import RunScript from "./cards/RunScript";

export interface ISetupExperienceCardProps {
  currentTeamId: number;
  router: InjectedRouter;
  urlPlatformParam?: string; // not yet guaranteed to be a valid platform
}

const SETUP_EXPERIENCE_NAV_ITEMS: ISideNavItem<ISetupExperienceCardProps>[] = [
  {
    get title() {
      return `1. ${i18n.t("controls.setupExperience.navItems.endUserAuth", {
        ns: "settings",
      })}`;
    },
    urlSection: "end-user-auth",
    path: PATHS.CONTROLS_END_USER_AUTHENTICATION,
    Card: EndUserAuthentication,
  },
  {
    get title() {
      return `2. ${i18n.t(
        "controls.setupExperience.navItems.bootstrapPackage",
        { ns: "settings" }
      )}`;
    },
    urlSection: "bootstrap-package",
    path: PATHS.CONTROLS_BOOTSTRAP_PACKAGE,
    Card: BootstrapPackage,
  },
  {
    get title() {
      return `3. ${i18n.t("controls.setupExperience.navItems.installSoftware", {
        ns: "settings",
      })}`;
    },
    urlSection: "install-software",
    path: PATHS.CONTROLS_INSTALL_SOFTWARE("macos"),
    Card: InstallSoftware,
  },
  {
    get title() {
      return `4. ${i18n.t("controls.setupExperience.navItems.runScript", {
        ns: "settings",
      })}`;
    },
    urlSection: "run-script",
    path: PATHS.CONTROLS_RUN_SCRIPT,
    Card: RunScript,
  },
  {
    get title() {
      return `5. ${i18n.t("controls.setupExperience.navItems.setupAssistant", {
        ns: "settings",
      })}`;
    },
    urlSection: "setup-assistant",
    path: PATHS.CONTROLS_SETUP_ASSISTANT,
    Card: SetupAssistant,
  },
];

export default SETUP_EXPERIENCE_NAV_ITEMS;

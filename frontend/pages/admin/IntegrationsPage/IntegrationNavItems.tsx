import PATHS from "router/paths";

import { ISideNavItem } from "../components/SideNav/SideNav";
import Integrations from "./cards/Integrations";
import MdmSettings from "./cards/MdmSettings";
import Calendars from "./cards/Calendars";
import ChangeManagement from "./cards/ChangeManagement";
import CertificateAuthorities from "./cards/CertificateAuthorities";
import ConditionalAccess from "./cards/ConditionalAccess";
import IdentityProviders from "./cards/IdentityProviders";
import Sso from "./cards/Sso";
import GlobalHostStatusWebhook from "../IntegrationsPage/cards/GlobalHostStatusWebhook";

const getIntegrationSettingsNavItems = (): ISideNavItem<any>[] => {
  const items: ISideNavItem<any>[] = [
    {
      title: "settings:admin.integrations.navItems.ticketDestinations",
      urlSection: "ticket-destinations",
      path: PATHS.ADMIN_INTEGRATIONS_TICKET_DESTINATIONS,
      Card: Integrations,
    },
    {
      title: "settings:admin.integrations.navItems.mdm",
      urlSection: "mdm",
      path: PATHS.ADMIN_INTEGRATIONS_MDM,
      Card: MdmSettings,
    },
    {
      title: "settings:admin.integrations.navItems.calendars",
      urlSection: "calendars",
      path: PATHS.ADMIN_INTEGRATIONS_CALENDARS,
      Card: Calendars,
    },
    {
      title: "settings:admin.integrations.navItems.changeManagement",
      urlSection: "change-management",
      path: PATHS.ADMIN_INTEGRATIONS_CHANGE_MANAGEMENT,
      Card: ChangeManagement,
    },
    {
      title: "settings:admin.integrations.navItems.sso",
      urlSection: "sso",
      path: PATHS.ADMIN_INTEGRATIONS_SSO_FLEET_USERS,
      Card: Sso,
    },
    {
      title: "settings:admin.integrations.navItems.certificates",
      urlSection: "certificates",
      path: PATHS.ADMIN_INTEGRATIONS_CERTIFICATE_AUTHORITIES,
      Card: CertificateAuthorities,
    },
    {
      title: "settings:admin.integrations.navItems.identityProvider",
      urlSection: "identity-provider",
      path: PATHS.ADMIN_INTEGRATIONS_IDENTITY_PROVIDER,
      Card: IdentityProviders,
    },
    {
      title: "settings:admin.integrations.navItems.hostStatusWebhook",
      urlSection: "host-status-webhook",
      path: PATHS.ADMIN_INTEGRATIONS_HOST_STATUS_WEBHOOK,
      Card: GlobalHostStatusWebhook,
    },
    {
      title: "settings:admin.integrations.navItems.conditionalAccess",
      urlSection: "conditional-access",
      path: PATHS.ADMIN_INTEGRATIONS_CONDITIONAL_ACCESS,
      Card: ConditionalAccess,
    },
  ];

  return items;
};

export default getIntegrationSettingsNavItems;

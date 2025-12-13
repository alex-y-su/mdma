import { TFunction } from "i18next";

import paths from "router/paths";

/** Select platform - base config with translation keys */
const PLATFORM_DROPDOWN_CONFIG = [
  {
    labelKey: "dashboard:platformDropdown.all",
    value: "all",
    path: paths.DASHBOARD,
  },
  {
    labelKey: "dashboard:platformDropdown.macos",
    value: "darwin",
    path: paths.DASHBOARD_MAC,
  },
  {
    labelKey: "dashboard:platformDropdown.windows",
    value: "windows",
    path: paths.DASHBOARD_WINDOWS,
  },
  {
    labelKey: "dashboard:platformDropdown.linux",
    value: "linux",
    path: paths.DASHBOARD_LINUX,
  },
  {
    labelKey: "dashboard:platformDropdown.chromeos",
    value: "chrome",
    path: paths.DASHBOARD_CHROME,
  },
  {
    labelKey: "dashboard:platformDropdown.ios",
    value: "ios",
    path: paths.DASHBOARD_IOS,
  },
  {
    labelKey: "dashboard:platformDropdown.ipados",
    value: "ipados",
    path: paths.DASHBOARD_IPADOS,
  },
  {
    labelKey: "dashboard:platformDropdown.android",
    value: "android",
    path: paths.DASHBOARD_ANDROID,
  },
] as const;

/** Generate platform dropdown options with translated labels */
export const getPlatformDropdownOptions = (t: TFunction) =>
  PLATFORM_DROPDOWN_CONFIG.map((option) => ({
    label: t(option.labelKey),
    value: option.value,
    path: option.path,
  }));

/** Config for path matching (without labels) */
export const PLATFORM_DROPDOWN_OPTIONS = PLATFORM_DROPDOWN_CONFIG.map(
  (option) => ({
    value: option.value,
    path: option.path,
  })
);

/** Selected platform value mapped to built in label name */
export const PLATFORM_NAME_TO_LABEL_NAME = {
  darwin: "macOS",
  windows: "MS Windows",
  linux: "All Linux",
  chrome: "chrome",
  ios: "iOS",
  ipados: "iPadOS",
  android: "Android",
} as const;

/** Premium feature, Gb must be set between 1-100 */
export const LOW_DISK_SPACE_GB = 32;

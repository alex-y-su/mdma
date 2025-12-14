# i18n Translation Status Report

## Summary

**Components with i18n: 75**
**Total Page Components: ~805**

Based on analysis of `useTranslation` usage across the codebase:

---

## COMPLETED (Already Localized)

### Authentication Pages (auth namespace) - MOSTLY DONE
| Component | File | Status |
|-----------|------|--------|
| LoginPage | `pages/LoginPage/LoginPage.tsx` | ✅ Done |
| LoginForm | `components/forms/LoginForm/LoginForm.tsx` | ✅ Done |
| ForgotPasswordPage | `pages/ForgotPasswordPage/ForgotPasswordPage.tsx` | ✅ Done |
| ResetPasswordPage | `pages/ResetPasswordPage/ResetPasswordPage.tsx` | ✅ Done |
| ResetPasswordForm | `components/forms/ResetPasswordForm/ResetPasswordForm.tsx` | ✅ Done |
| ConfirmInvitePage | `pages/ConfirmInvitePage/ConfirmInvitePage.tsx` | ✅ Done |
| ConfirmInviteForm | `components/forms/ConfirmInviteForm/ConfirmInviteForm.tsx` | ✅ Done |

**Missing:**
- MfaPage
- LogoutPage
- ConfirmSSOInvitePage
- RegistrationPage
- AccountPage/AccountSidePanel

---

### Dashboard Page (dashboard namespace) - MOSTLY DONE
| Component | File | Status |
|-----------|------|--------|
| DashboardPage | `pages/DashboardPage/DashboardPage.tsx` | ✅ Done |
| ActivityFeed | `cards/ActivityFeed/ActivityFeed.tsx` | ✅ Done |
| ActivityFeedFilters | `cards/ActivityFeed/components/ActivityFeedFilters/ActivityFeedFilters.tsx` | ✅ Done |
| ActivityTypeDropdown | `cards/ActivityFeed/components/ActivityTypeDropdown/ActivityTypeDropdown.tsx` | ✅ Done |
| ActivityFeedAutomationsModal | `components/ActivityFeedAutomationsModal/ActivityFeedAutomationsModal.tsx` | ✅ Done |
| LowDiskSpaceHosts | `cards/LowDiskSpaceHosts/LowDiskSpaceHosts.tsx` | ✅ Done |
| MissingHosts | `cards/MissingHosts/MissingHosts.tsx` | ✅ Done |
| TotalHosts | `cards/TotalHosts/TotalHosts.tsx` | ✅ Done |
| WelcomeHost | `cards/WelcomeHost/WelcomeHost.tsx` | ✅ Done |
| Software | `cards/Software/Software.tsx` | ✅ Done |
| MDM | `cards/MDM/MDM.tsx` | ✅ Done |
| Munki | `cards/Munki/Munki.tsx` | ✅ Done |
| OSTable | `cards/OperatingSystems/OSTable.tsx` | ✅ Done |
| LearnFleet | `cards/LearnFleet/LearnFleet.tsx` | ✅ Done |

**Missing:**
- HostCountCard
- MdmSolutionModal
- GlobalActivityItem and activity item modals
- MetricsHostCounts/PlatformHostCounts sections
- InfoCard component

---

### Hosts Pages (hosts namespace) - PARTIALLY DONE
| Component | File | Status |
|-----------|------|--------|
| ManageHostsPage | `ManageHostsPage/ManageHostsPage.tsx` | ✅ Done |
| DeleteHostModal | `components/DeleteHostModal/DeleteHostModal.tsx` | ✅ Done |
| TransferHostModal | `components/TransferHostModal/TransferHostModal.tsx` | ✅ Done |
| EditColumnsModal | `ManageHostsPage/components/EditColumnsModal/EditColumnsModal.jsx` | ✅ Done |
| DeleteLabelModal | `ManageHostsPage/components/DeleteLabelModal/DeleteLabelModal.tsx` | ✅ Done |
| CustomLabelGroupHeading | `ManageHostsPage/components/CustomLabelGroupHeading/CustomLabelGroupHeading.tsx` | ✅ Done |
| About | `details/cards/About/About.tsx` | ✅ Done |
| Activity | `details/cards/Activity/Activity.tsx` | ✅ Done |
| HostSoftware | `details/cards/Software/HostSoftware.tsx` | ✅ Done |
| HostPolicies | `details/cards/Policies/HostPolicies.tsx` | ✅ Done |
| HostQueries | `details/cards/Queries/HostQueries.tsx` | ✅ Done |
| Labels | `details/cards/Labels/Labels.tsx` | ✅ Done |
| LocalUserAccounts | `details/cards/LocalUserAccounts/LocalUserAccounts.tsx` | ✅ Done |
| MunkiIssues | `details/cards/MunkiIssues/MunkiIssues.tsx` | ✅ Done |

**Missing:**
- HostDetailsPage main component
- HostHeader
- HostSummary (BootstrapPackageIndicator, OSSettingsIndicator)
- HostActionsDropdown
- HostDetailsBanners
- All Host Details Modals (Lock, Unlock, Wipe, RunScript, SelectQuery, DiskEncryptionKey, etc.)
- Activity Items (Canceled*, Installed*, Locked*, Ran*, etc.)
- Self Service components
- HostSoftwareTable, HostSoftwareLibraryTable
- DeviceUserPage and all sub-components
- OSSettingsModal and all sub-components
- Certificates card
- Packs card
- AgentOptions card
- User card
- HostsFilterBlock and sub-filters (BootstrapPackageStatusFilter, DiskEncryptionStatusFilter, PoliciesFilter, etc.)
- RunScriptBatchModal

---

### Labels Pages (labels namespace) - MOSTLY DONE
| Component | File | Status |
|-----------|------|--------|
| ManageLabelsPage | `ManageLabelsPage/ManageLabelsPage.tsx` | ✅ Done |
| NewLabelPage | `NewLabelPage/NewLabelPage.tsx` | ✅ Done |
| EditLabelPage | `EditLabelPage/EditLabelPage.tsx` | ✅ Done |
| LabelForm | `components/LabelForm/LabelForm.tsx` | ✅ Done |
| ManualLabelForm | `components/ManualLabelForm/ManualLabelForm.tsx` | ✅ Done |
| DynamicLabelForm | `components/DynamicLabelForm/DynamicLabelForm.tsx` | ✅ Done |
| PlatformField | `components/PlatformField/PlatformField.tsx` | ✅ Done |
| LabelsTable | `ManageLabelsPage/LabelsTable/LabelsTable.tsx` | ✅ Done |

**Status: ✅ COMPLETE**

---

### Policies Pages (policies namespace) - PARTIALLY DONE
| Component | File | Status |
|-----------|------|--------|
| PolicyResultsTable | `PolicyPage/components/PolicyResultsTable/PolicyResultsTable.tsx` | ✅ Done |
| PolicyErrorsTable | `PolicyPage/components/PolicyErrorsTable/PolicyErrorsTable.tsx` | ✅ Done |
| DeletePoliciesModal | `ManagePoliciesPage/components/DeletePoliciesModal/DeletePoliciesModal.tsx` | ✅ Done |

**Missing:**
- ManagePoliciesPage main component
- PoliciesTable
- PolicyPage main component
- PolicyForm
- PolicyResults
- CalendarEventsModal
- CalendarEventPreviewModal
- ConditionalAccessModal
- InstallSoftwareModal
- OtherWorkflowsModal
- PolicyRunScriptModal
- SaveNewPolicyModal
- ExamplePayload, ExampleTicket
- PassingColumnHeader
- PoliciesPaginatedList

---

### Queries Pages (queries namespace) - NOT DONE
**Missing (all):**
- ManageQueriesPage
- QueriesTable
- QueryDetailsPage
- QueryReport
- EditQueryPage
- EditQueryForm
- LiveQueryPage
- DeleteQueryModal
- ManageQueryAutomationsModal
- PreviewDataModal
- ConfirmSaveChangesModal
- SaveNewQueryModal
- SaveAsNewQueryModal

**Status: ❌ NOT STARTED**

---

### Software Pages (software namespace) - PARTIALLY DONE
| Component | File | Status |
|-----------|------|--------|
| SoftwarePage | `SoftwarePage/SoftwarePage.tsx` | ✅ Done |
| SoftwareAddPage | `SoftwareAddPage/SoftwareAddPage.tsx` | ✅ Done |
| SoftwareTable | `SoftwareTitles/SoftwareTable/SoftwareTable.tsx` | ✅ Done |
| DeleteSoftwareModal | `SoftwareTitleDetailsPage/DeleteSoftwareModal/DeleteSoftwareModal.tsx` | ✅ Done |
| EditSoftwareModal | `SoftwareTitleDetailsPage/EditSoftwareModal/EditSoftwareModal.tsx` | ✅ Done |
| EditIconModal | `SoftwareTitleDetailsPage/EditIconModal/EditIconModal.tsx` | ✅ Done |

**Missing:**
- SoftwareTitles main component
- SoftwareOS, SoftwareOSTable
- SoftwareVulnerabilities, SoftwareVulnerabilitiesTable
- SoftwareTitleDetailsPage main component
- SoftwareSummaryCard, TitleVersionsTable
- SoftwareInstallerCard, InstallerDetailsWidget, InstallerStatusTable, InstallerPoliciesTable
- SoftwareOSDetailsPage
- SoftwareVersionDetailsPage
- SoftwareVulnerabilityDetailsPage
- All SoftwareAdd sub-pages (AppStore, CustomPackage, FleetMaintained)
- PackageForm, PackageAdvancedOptions
- SoftwareFiltersModal
- ManageSoftwareAutomationsModal
- Other modals and forms

---

### Manage Controls Pages (settings namespace) - NOT DONE
**Missing (all):**
- ManageControlsPage main
- OSSettings section (CustomSettings, DiskEncryption, all modals/uploaders)
- OSUpdates section (all components)
- Scripts section (ScriptLibrary, ScriptBatchDetailsPage, all modals)
- Secrets section
- SetupExperience section (BootstrapPackage, SetupAssistant, InstallSoftware, EndUserAuthentication, RunScript)

**Status: ❌ NOT STARTED**

---

### Admin Pages (settings namespace) - PARTIALLY DONE
| Component | File | Status |
|-----------|------|--------|
| AdminWrapper | `admin/AdminWrapper.tsx` | ✅ Done |
| TeamManagementPage | `TeamManagementPage/TeamManagementPage.tsx` | ✅ Done |
| CreateTeamModal | `components/CreateTeamModal/CreateTeamModal.tsx` | ✅ Done |
| DeleteTeamModal | `components/DeleteTeamModal/DeleteTeamModal.tsx` | ✅ Done |
| UsersTable | `UserManagementPage/components/UsersTable/UsersTable.tsx` | ✅ Done |
| AddUserModal | `UserManagementPage/components/AddUserModal/AddUserModal.tsx` | ✅ Done |
| EditUserModal | `UserManagementPage/components/EditUserModal/EditUserModal.tsx` | ✅ Done |
| DeleteUserModal | `UserManagementPage/components/DeleteUserModal/DeleteUserModal.tsx` | ✅ Done |
| Integrations | `IntegrationsPage/cards/Integrations/Integrations.tsx` | ✅ Done |
| CertificateAuthorities | `IntegrationsPage/cards/CertificateAuthorities/CertificateAuthorities.tsx` | ✅ Done |

**Missing:**
- UserManagementPage main
- UserForm, SelectRoleForm, SelectedTeamsForm
- ResetPasswordModal, ResetSessionsModal
- OrgSettingsPage and all cards (Info, WebAddress, Smtp, Statistics, Agents, FleetDesktop, Advanced)
- IntegrationsPage main and most cards (Sso, IdentityProviders, Calendars, ChangeManagement, ConditionalAccess, GlobalHostStatusWebhook)
- All MDM settings pages (AppleMdm, AndroidMdm, WindowsMdm, VPP, ABM)
- All Certificate Authority forms

---

### Packs Pages (queries namespace) - NOT DONE
**Missing (all):**
- ManagePacksPage
- EditPackPage
- PackComposerPage
- PacksTable
- DeletePackModal
- PackQueryEditorModal
- RemovePackQueryModal

**Status: ❌ NOT STARTED**

---

### Error Pages (errors namespace) - NOT DONE
**Missing (all):**
- Fleet403
- Fleet404
- Fleet500

**Status: ❌ NOT STARTED**

---

### Common Components (common namespace) - PARTIALLY DONE
| Component | File | Status |
|-----------|------|--------|
| TeamsDropdown | `components/TeamsDropdown/TeamsDropdown.tsx` | ✅ Done |
| TargetLabelSelector | `components/TargetLabelSelector/TargetLabelSelector.tsx` | ✅ Done |
| SiteTopNav | `components/top_nav/SiteTopNav/SiteTopNav.tsx` | ✅ Done |
| UserMenu | `components/top_nav/UserMenu/UserMenu.tsx` | ✅ Done |
| EnrollSecretModal | `components/EnrollSecrets/EnrollSecretModal/EnrollSecretModal.tsx` | ✅ Done |
| DeleteSecretModal | `components/EnrollSecrets/DeleteSecretModal/DeleteSecretModal.tsx` | ✅ Done |
| SecretEditorModal | `components/EnrollSecrets/SecretEditorModal/SecretEditorModal.tsx` | ✅ Done |
| DeviceUserError | `components/DeviceUserError/DeviceUserError.tsx` | ✅ Done |
| LanguageSwitcher | `components/LanguageSwitcher/LanguageSwitcher.tsx` | ✅ Done |
| UserSettingsForm | `components/forms/UserSettingsForm/UserSettingsForm.jsx` | ✅ Done |
| ChangePasswordForm | `components/forms/ChangePasswordForm/ChangePasswordForm.jsx` | ✅ Done |
| ChangeEmailForm | `components/forms/ChangeEmailForm/ChangeEmailForm.jsx` | ✅ Done |

**Missing:**
- MainContent (main navigation)
- SideNav
- Many button components
- Modal base components
- And others...

---

## TRANSLATION PROGRESS BY NAMESPACE

| Namespace | Localized Components | Total Estimated | Progress |
|-----------|---------------------|-----------------|----------|
| `auth` | 7 | 12 | 58% |
| `dashboard` | 14 | 25 | 56% |
| `hosts` | 14 | 100+ | 14% |
| `labels` | 8 | 8 | 100% |
| `policies` | 3 | 20 | 15% |
| `queries` | 0 | 15 | 0% |
| `software` | 6 | 60+ | 10% |
| `settings` | 10 | 80+ | 12% |
| `common` | 12 | 30+ | 40% |
| `errors` | 0 | 3 | 0% |

---

## RECOMMENDED BATCH ORDER FOR COMPLETION

### Batch 1: Finish Authentication (auth) - ~5 components
```
Components to translate:
- MfaPage
- LogoutPage
- ConfirmSSOInvitePage
- RegistrationPage
- AccountPage + AccountSidePanel
```

### Batch 2: Finish Dashboard (dashboard) - ~10 components
```
Components to translate:
- HostCountCard
- MdmSolutionModal + table configs
- GlobalActivityItem
- Activity item modals (AppStore, Library, RunScript, Automation)
- MetricsHostCounts section
- PlatformHostCounts section
- InfoCard
```

### Batch 3: Queries Pages (queries) - ~15 components
```
Components to translate:
- ManageQueriesPage, QueriesTable
- QueryDetailsPage, QueryReport
- EditQueryPage, EditQueryForm, QueryResults
- LiveQueryPage
- All modals
```

### Batch 4: Packs Pages (queries) - ~7 components
```
Components to translate:
- ManagePacksPage, PacksTable
- EditPackPage, PackComposerPage
- All modals
```

### Batch 5: Error Pages (errors) - 3 components
```
Components to translate:
- Fleet403, Fleet404, Fleet500
```

### Batch 6: Finish Policies (policies) - ~17 components
```
Components to translate:
- ManagePoliciesPage, PoliciesTable
- PolicyPage, PolicyForm, PolicyResults
- All modals (Calendar, ConditionalAccess, InstallSoftware, OtherWorkflows, RunScript, SaveNew)
- Helper components
```

### Batch 7: Finish Software (software) - ~55 components
```
Components to translate:
- SoftwareTitles, SoftwareOS, SoftwareVulnerabilities main components
- SoftwareTitleDetailsPage main + all sub-components
- All Add Software sub-pages
- All forms and modals
- Detail pages (OS, Version, Vulnerability)
```

### Batch 8: Host Details Completion (hosts) - ~85 components
```
Components to translate:
- HostDetailsPage main, Header, Summary
- All activity items
- Self Service section
- DeviceUserPage + all sub-components
- OSSettingsModal + all sub-components
- Remaining cards (Certificates, Packs, AgentOptions, User)
- All filters and modals
```

### Batch 9: Manage Controls (settings) - ~50 components
```
Components to translate:
- ManageControlsPage main
- OSSettings (CustomSettings, DiskEncryption, all modals)
- OSUpdates (all components)
- Scripts (all components)
- Secrets (all components)
- SetupExperience (all sub-sections)
```

### Batch 10: Finish Admin (settings) - ~70 components
```
Components to translate:
- UserManagementPage main, remaining forms/modals
- OrgSettingsPage + all cards
- IntegrationsPage remaining cards
- All MDM settings pages
- Certificate Authority forms
```

### Batch 11: Common Components (common) - ~20 components
```
Components to translate:
- MainContent, SideNav
- Button components
- Modal base components
- Other shared components
```

---

## KEY STATS

- **Total localized:** 75 components (~9%)
- **Remaining:** ~730 components (~91%)
- **Fully complete namespaces:** labels (100%)
- **Not started:** queries, errors, manage controls

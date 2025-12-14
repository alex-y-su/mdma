# i18n Translation Tasks

Individual task documents for AI agents to translate the MDM application to Russian.

## Task Files (13 total)

| File | Section | Namespace | Components |
|------|---------|-----------|------------|
| `01-auth-completion.md` | Authentication | auth | ~5 |
| `02-dashboard-completion.md` | Dashboard | dashboard | ~10 |
| `03-queries-full.md` | Queries | queries | ~15 |
| `04-packs-full.md` | Packs | queries | ~7 |
| `05-errors-full.md` | Error Pages | errors | ~3 |
| `06-policies-completion.md` | Policies | policies | ~17 |
| `07-software-completion.md` | Software | software | ~55 |
| `08-hosts-details.md` | Host Details | hosts | ~85 |
| `09a-controls-os-settings.md` | Controls: OS Settings | settings | ~20 |
| `09b-controls-os-updates-scripts.md` | Controls: Updates & Scripts | settings | ~25 |
| `09c-controls-setup-experience.md` | Controls: Setup Experience | settings | ~25 |
| `10-admin-completion.md` | Admin Pages | settings | ~70 |
| `11-common-components.md` | Common Components | common | ~20 |

## Parallel Execution

All 13 tasks can run **simultaneously** - no dependencies between them.

## Each Document Contains

1. **Overview** - Task description
2. **File locations** - Where to update
3. **Component list** - Files to translate
4. **Implementation pattern** - Code example
5. **Translation JSON** - English & Russian
6. **Quality checklist** - Verification

## File Locations

Always update BOTH locations:
- `frontend/locales/{en,ru}/*.json`
- `assets/locales/{en,ru}/*.json`

## Namespace Reference

| Namespace | Sections |
|-----------|----------|
| `common` | Shared components, navigation |
| `auth` | Login, password, registration |
| `dashboard` | Dashboard page |
| `hosts` | Host management |
| `labels` | Labels (COMPLETE) |
| `policies` | Policies |
| `queries` | Queries & Packs |
| `software` | Software |
| `settings` | Admin, Controls, Integrations |
| `errors` | Error pages |

## Estimated Time

- **Sequential:** ~14 hours
- **Parallel (13 agents):** ~3 hours

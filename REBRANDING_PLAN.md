# Tau Platform MDM - Rebranding Plan

## Overview

This document outlines the comprehensive plan to rebrand this application from **Fleet Device Management** to **Tau Platform MDM** (or "Tau MDM").

### About Tau Platform / Tau Technologies

Based on research from [Tau Platform](https://tau-platform.com/en/), [GitHub](https://github.com/tauplatform/tau), and [LinkedIn](https://www.linkedin.com/company/tau-platform):

- **Company Name**: Tau Technologies / Tau Platform
- **Founded**: 2015
- **Specialization**: Enterprise mobile device management, cross-platform development
- **Products**: RhoBrowser, RhoMobile Suite, TAU Platform
- **Website**: tau-platform.com / tau-technologies.com
- **Email**: info@tau-platform.com
- **GitHub**: github.com/tauplatform
- **Partner**: Zebra Technologies
- **Clients**: Fortune TOP 100 companies (Home Depot, CBRE Group)
- **License**: MIT

---

## Branding Mapping

| Current Value | New Value |
|---------------|-----------|
| Fleet | Tau MDM |
| Fleet Device Management | Tau Platform MDM |
| FleetDM | tauplatform |
| fleetdm | tauplatform |
| Fleet Agent | Tau Agent |
| fleetd | taud |
| fleetctl | tauctl |
| Fleet Green (#009a7d) | Tau Blue (#0066CC) |
| fleetdm.com | tau-platform.com |
| @fleetdm | @tauplatform |
| com.fleetdm.agent | com.tauplatform.agent |

---

## Phase 1: Core Configuration Files

### 1.1 Root Configuration Files

| File | Changes Required |
|------|------------------|
| `package.json` | Update name to `@tauplatform/tau-mdm`, update description |
| `.goreleaser.yml` | Update `project_name`, Docker image names, binary names |
| `Makefile` | Update references to fleet → tau |
| `LICENSE` | Update copyright holder |
| `README.md` | Complete rebrand of documentation |
| `CHANGELOG.md` | Update company references |
| `CODE_OF_CONDUCT.md` | Update contact information |
| `SECURITY.md` | Update security contact |

### 1.2 Docker Configuration

| File | Changes Required |
|------|------------------|
| `Dockerfile-desktop-linux` | Update LABEL maintainer |
| `docker-compose.yml` | Update service names, image references |

---

## Phase 2: Frontend Rebranding

### 2.1 HTML Templates

| File | Changes Required |
|------|------------------|
| `frontend/templates/react.ejs` | Update title, favicon, analytics |
| `frontend/templates/enroll-ota.html` | Update brand references, logo, colors |
| `frontend/templates/windowsTOS.html` | Update terms of service |

### 2.2 Color Scheme Updates

**File**: `frontend/styles/var/colors.scss`

| Current Variable | Current Value | New Value |
|------------------|---------------|-----------|
| `$core-fleet-green` | #009a7d | → `$core-tau-blue` #0066CC |
| `$core-fleet-black` | #192147 | → `$core-tau-black` #1a1a2e |
| `$core-fleet-white` | #ffffff | → `$core-tau-white` #ffffff |
| `$ui-fleet-black-75` | #515774 | → `$ui-tau-gray` #4a4a6a |

All color variable names containing "fleet" should be renamed to "tau".

### 2.3 Component Updates

All `.tsx` and `.scss` files in `frontend/components/` that reference:
- Fleet brand name in text
- Fleet color variables
- Fleet logos

### 2.4 SQL Editor Theme

**File**: `frontend/components/SQLEditor/theme.ts`
- Update theme colors to match new brand

---

## Phase 3: Android App Rebranding

### 3.1 Build Configuration

**File**: `android/app/build.gradle.kts`

| Change | From | To |
|--------|------|-----|
| namespace | `com.fleetdm.agent` | `com.tauplatform.agent` |
| applicationId | `com.fleetdm.agent` | `com.tauplatform.agent` |
| signingConfigs | `fleet-android` | `tau-android` |

### 3.2 Android Manifest

**File**: `android/app/src/main/AndroidManifest.xml`
- Update package name
- Update app labels
- Update icon references

### 3.3 String Resources

**File**: `android/app/src/main/res/values/strings.xml`

| String | From | To |
|--------|------|-----|
| app_name | Fleet Agent | Tau Agent |
| All descriptions | Fleet references | Tau Platform references |

### 3.4 Android Icons (MUST REPLACE)

| File Path | Description |
|-----------|-------------|
| `android/app/src/main/res/mipmap-mdpi/ic_launcher.webp` | 48x48 launcher icon |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher.webp` | 72x72 launcher icon |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher.webp` | 96x96 launcher icon |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.webp` | 144x144 launcher icon |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp` | 192x192 launcher icon |
| `android/app/src/main/res/mipmap-*/ic_launcher_round.webp` | Round variants (all sizes) |
| `android/app/src/main/res/drawable/ic_launcher_foreground.xml` | Adaptive icon foreground |
| `android/app/src/main/res/drawable/ic_launcher_background.xml` | Adaptive icon background |

### 3.5 Package Rename

Rename all files in:
- `android/app/src/main/java/com/fleetdm/agent/` → `android/app/src/main/java/com/tauplatform/agent/`

Update all Kotlin package declarations.

---

## Phase 4: Chrome Extension Rebranding

### 4.1 Manifest Update

**File**: `ee/fleetd-chrome/src/manifest.json`

| Field | From | To |
|-------|------|-----|
| name | Fleetd for Chrome | Tau Agent for Chrome |
| update_url | chrome.fleetdm.com | chrome.tau-platform.com |
| description | Update to Tau Platform description |

### 4.2 Chrome Extension Icons (MUST REPLACE)

| File | Size |
|------|------|
| `ee/fleetd-chrome/src/icon16.png` | 16x16 |
| `ee/fleetd-chrome/src/icon48.png` | 48x48 |
| `ee/fleetd-chrome/src/icon128.png` | 128x128 |

---

## Phase 5: Asset Replacement

### 5.1 Favicon Files (MUST REPLACE)

| File Path |
|-----------|
| `assets/favicon.ico` |
| `website/assets/favicon.ico` |
| `ee/bulk-operations-dashboard/assets/favicon.ico` |
| `ee/vulnerability-dashboard/assets/favicon.ico` |

### 5.2 Logo Files (MUST REPLACE)

| File | Description |
|------|-------------|
| `assets/images/fleet-logo.svg` | Main logo → `tau-logo.svg` |
| `assets/images/fleet-logo-text-black.svg` | Text logo black → `tau-logo-text-black.svg` |
| `assets/images/fleet-logo-text-white.svg` | Text logo white → `tau-logo-text-white.svg` |
| `assets/images/fleet-logo-blue-*.png` | Various logo sizes |
| `assets/images/fleet-mark-color-*.png` | Logo marks |

### 5.3 Avatar Images (MUST REPLACE)

| File Path |
|-----------|
| `assets/images/fleet-avatar-*.png` (multiple sizes) |
| `assets/images/fleet-email-avatar-36x36.png` |

### 5.4 Screenshots (OPTIONAL - Update Later)

| File Path | Description |
|-----------|-------------|
| `assets/images/fleet-4.77.0-1600x900@2x.png` | Product screenshot |
| `assets/images/dashboard-screenshot.png` | Dashboard screenshot |

---

## Phase 6: Website Rebranding

### 6.1 Website Configuration

| File | Changes |
|------|---------|
| `website/package.json` | Update name, repository URL |
| `website/config/custom.js` | Update base URL, site name |
| `website/config/env/production.js` | Update production URLs |
| `website/config/env/staging.js` | Update staging URLs |
| `website/config/env/development.js` | Update dev URLs |

### 6.2 Email Templates

All files in `website/views/emails/` need:
- Company name updates
- Logo replacements
- Contact information updates

Key files:
- `email-fleet-premium-*.ejs` → rename and update content
- All 20+ email templates

### 6.3 Website Pages

All `.ejs` files in `website/views/pages/` (100+ files):
- Update brand references
- Update logos
- Update contact information

---

## Phase 7: Backend Updates

### 7.1 Go Version Information

**File**: `server/version/version.go`
- Update `appName` variable

### 7.2 CLI Tools

| File | Changes |
|------|---------|
| `cmd/fleet/main.go` | Update application name references |
| `cmd/fleetctl/main.go` | Update to `tauctl` references |
| `tools/fleetctl-npm/package.json` | Update package name to `tauctl` |

### 7.3 Build Configuration

**File**: `.goreleaser.yml`

| Section | Changes |
|---------|---------|
| project_name | fleet → tau-mdm |
| builds | Binary names: fleet → tau, fleetctl → tauctl |
| dockers | Image names: fleetdm/fleet → tauplatform/tau-mdm |
| archives | Archive names update |

---

## Phase 8: Package Dependencies

### 8.1 NPM Packages

| File | Package Name Change |
|------|---------------------|
| `package.json` | `@fleetdm/fleet` → `@tauplatform/tau-mdm` |
| `website/package.json` | `@fleetdm/website` → `@tauplatform/website` |
| `tools/fleetctl-npm/package.json` | `fleetctl` → `tauctl` |
| `ee/fleetd-chrome/package.json` | `fleetd-for-chrome` → `taud-for-chrome` |
| `ee/vulnerability-dashboard/package.json` | Update name |
| `ee/bulk-operations-dashboard/package.json` | Update name |

---

## Phase 9: Documentation Updates

### 9.1 GitHub Configuration

| Directory/File | Changes |
|----------------|---------|
| `.github/ISSUE_TEMPLATE/` | Update all templates |
| `.github/workflows/` | Update workflow references |
| `.github/pull_request_template.md` | Update template |

### 9.2 Documentation Files

| File | Changes |
|------|---------|
| `README.md` | Complete rebrand |
| `android/README.md` | Update Android documentation |
| `CHANGELOG.md` | Update changelog references |
| `articles/` | Update all articles (low priority) |

---

## Phase 10: IT & Security Configuration

### 10.1 Default Configuration

**File**: `it-and-security/default.yml`
- Update default configuration values

### 10.2 Agent Options

All files in `it-and-security/lib/all/agent-options/`:
- Update agent configuration references

---

## Implementation Order

### Priority 1 - Critical (Must Do First)
1. [ ] Root configuration files (`package.json`, `.goreleaser.yml`)
2. [ ] Version information (`server/version/version.go`)
3. [ ] Frontend title and favicon (`frontend/templates/react.ejs`)
4. [ ] Color scheme (`frontend/styles/var/colors.scss`)
5. [ ] Main favicon (`assets/favicon.ico`)

### Priority 2 - High (User-Facing)
1. [ ] Android app configuration and strings
2. [ ] Android icons replacement
3. [ ] Chrome extension manifest and icons
4. [ ] Logo files replacement
5. [ ] Enrollment page (`frontend/templates/enroll-ota.html`)

### Priority 3 - Medium (Functional)
1. [ ] CLI tools naming
2. [ ] Docker configuration
3. [ ] Website configuration
4. [ ] Email templates (headers/footers)

### Priority 4 - Low (Documentation)
1. [ ] README files
2. [ ] GitHub templates
3. [ ] Articles and documentation
4. [ ] Screenshots

---

## Search & Replace Commands

### Global Text Replacements

```bash
# Company/Product names (case-sensitive)
Fleet Device Management → Tau Platform MDM
Fleet → Tau MDM
FleetDM → Tau Platform
fleetdm → tauplatform
FLEETDM → TAUPLATFORM

# Tool names
fleetctl → tauctl
fleetd → taud
Fleet Agent → Tau Agent

# Package identifiers
com.fleetdm → com.tauplatform
@fleetdm → @tauplatform

# URLs
fleetdm.com → tau-platform.com
chrome.fleetdm.com → chrome.tau-platform.com

# Colors in SCSS (after renaming variables)
fleet-green → tau-blue
fleet-black → tau-black
fleet-white → tau-white
```

---

## Required New Assets

The following brand assets need to be created/obtained from Tau Platform:

1. **Favicon** - `.ico` format, multiple sizes
2. **Main Logo** - SVG format, horizontal and stacked variants
3. **Logo Mark** - Icon only, PNG in sizes: 16, 32, 48, 72, 96, 128, 144, 192, 256, 512
4. **App Icons** - Android adaptive icons (foreground/background layers)
5. **Email Header** - Logo for email templates
6. **Brand Colors** - Official color codes (suggested: Tau Blue #0066CC)

---

## Notes

- Go module path (`github.com/fleetdm/fleet/v4`) changes require careful handling across all import statements
- Android package rename requires updating all Kotlin file package declarations
- Some files may have hardcoded Fleet references in strings that need manual review
- Test files may contain Fleet references that should also be updated
- Environment variables and configuration keys may need updating

---

## Estimated File Count

| Category | Approximate Files |
|----------|-------------------|
| Configuration Files | ~30 |
| Source Code (text changes) | ~200+ |
| Asset Files (replacement) | ~50+ |
| Template Files | ~70+ |
| Style Files | ~150+ |
| Documentation | ~25+ |
| **Total** | **~525+ files** |

# Tau Platform: Business Brief

## Executive Summary

Tau Platform is an open-source, Android-first device management platform that unifies IT operations and security management into a single solution. Built on osquery technology, Tau Platform enables organizations to manage, monitor, and secure their entire device fleet—with primary focus on Android devices—through a centralized, transparent, and programmable interface.

Organizations use Tau Platform to replace fragmented legacy tools, reduce operational costs, achieve compliance, and gain real-time visibility across their Android device environment. All features are available under MIT license with no enterprise licensing restrictions.

---

## The Challenge

Modern organizations face significant challenges in device management:

- **Tool Sprawl**: Multiple specialized tools for different platforms (Jamf for Mac, Intune for Windows, separate vulnerability scanners, compliance tools) create operational complexity and data silos
- **Limited Visibility**: Disparate systems make it difficult to get a unified view of organizational security posture
- **Compliance Burden**: Meeting security standards (SOC 2, ISO 27001, HIPAA, FedRAMP) requires manual effort across multiple tools
- **Scalability Constraints**: Legacy solutions struggle to manage modern, distributed workforces efficiently
- **Vendor Lock-in**: Proprietary solutions limit customization and create dependency on specific vendors

---

## The Solution

Tau Platform addresses these challenges through a unified platform that provides:

### Single Pane of Glass
One interface to manage all devices across all operating systems, replacing multiple point solutions with a consistent management experience.

### Real-Time Intelligence
SQL-based queries allow instant visibility into any aspect of device state—installed software, security configurations, running processes, network connections, and more.

### Automated Compliance
Pre-built policy libraries aligned with industry standards (CIS Benchmarks) enable automated compliance monitoring with actionable remediation.

### Modern Architecture
API-first design supports GitOps workflows, automation, and seamless integration with existing IT and security toolchains.

### Open Source Foundation
Full transparency into platform operations, no vendor lock-in, and community-driven development ensure long-term flexibility.

---

## Platform Capabilities

### 1. Device Management

#### Mobile Device Management (MDM)

**Android (Primary Focus)**
- Full Android Enterprise integration via Google Management API
- Device enrollment via QR code or zero-touch
- Work profile management for BYOD and corporate devices
- Configuration profile deployment with JSON policies
- Policy management with per-device granularity
- App deployment via Google Play Managed Apps
- Fleet Agent deployment with managed configuration
- SCEP-based certificate enrollment
- Real-time status reporting via PubSub
- Device unenrollment and work profile removal

**Apple Ecosystem (macOS, iOS, iPadOS)**
- Automated Device Enrollment via Apple Business Manager
- FileVault disk encryption deployment and key escrow
- Configuration profiles for system settings
- App deployment through Volume Purchase Program (VPP)
- Lost mode and remote device locking
- Setup experience customization for new devices

**Windows**
- BitLocker encryption management with key escrow
- Custom security policy deployment
- Configuration profiles via Windows CSPs
- Automated setup and provisioning

**Linux**
- Script-based configuration management
- Software inventory and monitoring
- Policy enforcement

#### Software Management

**Software Inventory**
Complete visibility into all installed software across the organization, including:
- Android applications and packages
- Desktop applications
- Browser extensions
- Developer tools
- System packages

**Software Library**
Tau Platform maintains a catalog of applications ready for deployment:
- Android apps via Google Play Managed distribution
- APK uploads for custom enterprise applications
- Productivity: Microsoft Office, Google Chrome, Slack, Zoom
- Security: 1Password, CrowdStrike, SentinelOne
- Development: VS Code, Docker, Git, JetBrains tools
- Utilities: Adobe products, VPN clients, browsers

**Deployment Options**
- Automatic installation during device setup
- On-demand deployment by IT administrators
- Self-service installation by end users
- Team-scoped deployment policies
- Pre/post install scripts for custom workflows

#### Configuration Management

**OS Settings**
Deploy and enforce operating system configurations:
- Security settings (firewall, screen lock, password policies)
- Network configurations (Wi-Fi, VPN, certificates)
- User experience settings (dock, menu bar, preferences)
- Device restrictions and permissions

**Certificate Management**
Integration with certificate authorities for automated certificate deployment:
- Custom SCEP servers (primary)
- Microsoft NDES
- Smallstep
- Android SCEP certificate templates for device identity

### 2. Security Operations

#### Vulnerability Management

**Automated Detection**
- Continuous scanning of installed software against vulnerability databases
- CVE identification with severity ratings
- Integration with National Vulnerability Database (NVD)
- Support for applications, packages, browser extensions, and developer tools

**Prioritization**
- Risk-based vulnerability scoring
- Filtering and false-positive management
- Affected device counts and impact assessment
- Remediation tracking

#### Policy Enforcement

**Security Policies**
Define organizational security requirements with pass/fail outcomes:
- Disk encryption enabled
- Firewall active
- Screen lock configured
- Antivirus installed and current
- OS version compliance
- Unauthorized software detection

**Compliance Frameworks**
Pre-built policy libraries aligned with:
- CIS Benchmarks for macOS 13, 14, 15
- CIS Benchmarks for Windows 10, 11
- Custom policy frameworks

**Automated Remediation**
- Policy-triggered script execution
- Automatic ticket creation in Jira or Zendesk
- End-user self-remediation options
- Scheduled enforcement windows

#### Live Security Operations

**Real-Time Queries**
Execute SQL-based queries across the entire fleet for:
- Threat hunting and investigation
- Incident response
- Configuration verification
- Audit evidence collection

**Scheduled Data Collection**
Automated collection of security telemetry:
- Login activity
- Process execution
- Network connections
- File system changes
- Hardware inventory

### 3. End-User Experience

#### Tau Desktop / Fleet Agent
Menu bar application (desktop) and Android agent providing device owners with:
- Real-time security status visibility
- Policy compliance overview
- Self-service remediation options
- Software request capabilities
- Certificate enrollment status (Android)

#### My Device Portal
Web-based self-service interface allowing users to:
- View their device status
- Understand security requirements
- Initiate compliance actions
- Request software installations

#### Transparency
Tau Platform's design principle ensures end users understand:
- What data is collected from their device
- Why policies exist
- How to maintain compliance

### 4. Enterprise Administration

#### Teams and Access Control
- Group devices by department, location, or function
- Role-based access control (Admin, Maintainer, Observer, GitOps)
- Granular permissions per team

#### Identity Integration
- SAML 2.0 single sign-on
- Google Workspace integration
- Basic SSO integrations

#### Reporting and Analytics
- Compliance dashboards
- Software inventory reports
- Vulnerability summaries
- Device health metrics
- Audit logs

---

## Integrations

Tau Platform connects with existing IT and security infrastructure:

### Identity and Access
| System | Capability |
|--------|------------|
| Google Workspace | SSO |
| SAML 2.0 Providers | SSO |

### Android Ecosystem
| System | Capability |
|--------|------------|
| Google Management API | Full Android Enterprise MDM |
| Google Play | Managed app distribution |
| Google PubSub | Real-time device notifications |

### IT Service Management
| System | Capability |
|--------|------------|
| Jira | Automated ticket creation for policy failures |
| Zendesk | Automated ticket creation for policy failures |

### Security Tools
| System | Capability |
|--------|------------|
| CrowdStrike | Deployment verification |
| SentinelOne | Deployment verification |
| Cloudflare WARP | Deployment and monitoring |

### Data and Analytics
| System | Capability |
|--------|------------|
| Amazon S3 | Query result storage |
| Amazon Kinesis | Real-time data streaming |
| Snowflake | Data warehouse integration |
| Splunk | Log aggregation |
| Elasticsearch | Log aggregation |

### Monitoring
| System | Capability |
|--------|------------|
| Prometheus | Metrics export |
| Datadog | Metrics and monitoring |
| OpenTelemetry | Observability |

### Automation
| System | Capability |
|--------|------------|
| Webhooks | Event-driven automation |
| REST API | Custom integrations |
| GitHub Actions | CI/CD workflows |
| Terraform | Infrastructure as code |

---

## Deployment Options

### Self-Hosted (Primary)
Organizations can deploy Tau Platform on:

**Cloud Platforms**
- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)
- Microsoft Azure

**Container Orchestration**
- Kubernetes (Helm charts provided)
- Docker environments

**Traditional Infrastructure**
- Linux servers (Ubuntu, CentOS, RHEL)
- Behind load balancers for high availability

### Scale Profiles

| Profile | Device Count | Infrastructure |
|---------|--------------|----------------|
| Small | Up to 1,000 | Single server deployment |
| Medium | 1,000–10,000 | Load-balanced servers, managed database |
| Large | 10,000–100,000 | Auto-scaling, read replicas, CDN |
| Enterprise | 100,000–400,000+ | Multi-region, custom architecture |

---

## Target Users

### By Role

**IT Administrators**
- Device provisioning and lifecycle management
- Software deployment and updates
- Configuration management
- User support and troubleshooting

**Security Engineers**
- Vulnerability assessment and remediation
- Compliance monitoring
- Incident investigation
- Threat detection

**Compliance Officers**
- Audit preparation and evidence collection
- Policy definition and enforcement
- Regulatory reporting

**DevOps/Platform Engineers**
- Automation and integration
- Infrastructure management
- GitOps workflows

### By Organization

**Enterprise**
Large organizations with complex, multi-platform environments requiring:
- Unified device management
- Compliance automation
- Advanced security operations

**Mid-Market**
Growing companies seeking:
- Cost-effective device management
- Consolidated tooling
- Scalable infrastructure

**Regulated Industries**
Organizations in healthcare, financial services, and government requiring:
- Compliance frameworks (HIPAA, SOC 2, FedRAMP)
- Audit capabilities
- Data sovereignty options

---

## Competitive Advantages

### Versus Legacy MDM Solutions (Jamf, Intune, Airwatch)

| Aspect | Legacy Solutions | Tau Platform |
|--------|------------------|-------|
| Platform Coverage | Single-platform focus | Android-first, cross-platform |
| Pricing Model | Per-device licensing | Fully open source (MIT) |
| Customization | Limited | Fully programmable |
| Data Access | Proprietary | SQL-based, open format |
| Vendor Lock-in | High | None (open source) |

### Versus Point Security Tools (Tanium, Rapid7, Tenable)

| Aspect | Point Solutions | Tau Platform |
|--------|-----------------|-------|
| Scope | Security-focused only | Security + IT operations |
| Deployment | Complex agents | Lightweight agent |
| Integration | Limited APIs | API-first design |
| Total Cost | Multiple licenses | Free (MIT license) |

### Key Differentiators

1. **Fully Open Source (MIT)**: No enterprise licensing restrictions; all features available to everyone
2. **Android-First Design**: Deep Android Enterprise integration as primary focus
3. **Query-Based Architecture**: SQL interface enables unlimited customization
4. **GitOps Native**: Manage infrastructure as code, version-controlled
5. **Zero Cost**: Completely free with no premium tiers or per-device licensing
6. **Cross-Platform Support**: Android primary, with macOS, Windows, Linux, iOS support

---

## Licensing

### MIT License (All Features)
All features are available under MIT license with no restrictions:
- Full Android MDM capabilities
- Team-based device organization
- Role-based access control
- Software deployment and management
- Certificate authority integrations (SCEP)
- Unlimited devices
- No per-device licensing
- No enterprise tier required

---

## Business Outcomes

Organizations deploying Fleet typically achieve:

**Cost Reduction**
- Consolidation of 3–5 legacy tools into single platform
- Reduction in manual compliance effort
- License optimization through software visibility

**Operational Efficiency**
- Single interface for cross-platform management
- Automated policy enforcement and remediation
- Self-service capabilities reduce IT ticket volume

**Security Improvement**
- Real-time vulnerability visibility
- Continuous compliance monitoring
- Faster incident investigation and response

**Compliance Readiness**
- Pre-built policy frameworks aligned with standards
- Audit evidence collection automation
- Demonstrable security controls

---

## Summary

Tau Platform provides a modern, Android-first approach to device management that addresses the complexity of managing mobile device environments. By combining MDM capabilities, vulnerability management, compliance automation, and real-time visibility in a fully open-source platform, Tau Platform enables organizations to:

- Manage Android devices with full enterprise MDM capabilities
- Reduce tool sprawl and operational complexity
- Achieve continuous compliance with security standards
- Gain unprecedented visibility into device security posture
- Automate routine IT and security operations
- Scale from hundreds to hundreds of thousands of devices
- Deploy without any licensing costs or restrictions

The platform's fully open-source MIT license, API-first architecture, and Android-first design make it the ideal choice for organizations seeking a flexible, transparent, and completely free alternative to legacy device management solutions.

---

*For more information, visit the Tau Platform documentation.*

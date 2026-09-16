import type { PoolQuestion, SectionId } from '../types'

let counter = 0
function mk(
  sectionId: SectionId,
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  scenario?: string,
): PoolQuestion {
  counter += 1
  return {
    id: `q${counter}`,
    sectionId,
    scenario,
    prompt,
    options: options.map((text, i) => ({ id: `o${i + 1}`, text })),
    correctOptionId: `o${correctIndex + 1}`,
    explanation,
  }
}

// ---------------------------------------------------------------------------
// Section 1: Planning (pool of 10, exam draws 7)
// ---------------------------------------------------------------------------
const section1: PoolQuestion[] = [
  mk(
    1,
    'Which activity should be scheduled first in a requirements-gathering workshop for a new IBM Security Verify Access (ISVA) deployment?',
    [
      'Selecting the exact junction type for every backend application',
      'Identifying the business drivers, stakeholders, and in-scope applications',
      'Writing the reverse proxy tuning parameters file',
      'Choosing the firmware version for the appliance',
    ],
    1,
    'A planning workshop starts by establishing business drivers, stakeholders, and scope; technical decisions such as junction types and tuning come later during architecture and configuration.',
  ),
  mk(
    1,
    'A customer needs single sign-on between an internal ISVA-protected portal and a SaaS application. What requirement must be captured during planning to select the correct federation approach?',
    [
      'The number of CPU cores on the reverse proxy VM',
      'Whether the SaaS provider supports SAML 2.0, OIDC, or both, and which one is preferred',
      'The disk partition layout of the appliance',
      'The version of the HTML template pages',
    ],
    1,
    'Federated SSO planning must confirm which federation protocol(s) the partner supports so the correct trust configuration (SAML2 vs OIDC) is designed later.',
  ),
  mk(
    1,
    'During planning for a firmware upgrade of an existing ISVA virtual appliance cluster, which consideration is most critical?',
    [
      'Confirming a rollback plan and snapshot/backup exists before applying the new firmware',
      'Renaming the LMI administrator account',
      'Increasing the number of junctions',
      'Disabling auditing to speed up the upgrade',
    ],
    0,
    'Firmware upgrade planning must always include a validated backup/snapshot and rollback plan in case the new firmware introduces issues.',
  ),
  mk(
    1,
    'A customer expects 5,000 concurrent authenticated sessions with an average request rate of 400 requests/second at peak. Which planning activity addresses this?',
    [
      'Log retention policy definition',
      'Solution sizing to determine the number and specification of reverse proxy and runtime instances',
      'Selecting the color scheme of the login page',
      'Deciding which support entitlement tier to purchase',
    ],
    1,
    'Concurrent session counts and peak throughput feed directly into solution sizing, which determines instance counts, CPU/memory allocation, and session cache sizing.',
  ),
  mk(
    1,
    'A compliance officer requires that all authentication and authorization decisions be retrievable for 18 months. Which planning output does this drive?',
    [
      'The log retention and audit storage requirements',
      'The junction label naming convention',
      'The choice of reverse proxy worker thread count',
      'The reverse proxy instance IP address',
    ],
    0,
    'Retention mandates from compliance directly shape the log retention and Common Audit Service storage/archival requirements captured during planning.',
  ),
  mk(
    1,
    'Which planning task assesses whether existing access control decisions (ACLs/POPs) can be reused versus needing a redesign using Context-Based Access policies?',
    [
      'Firmware version selection',
      'Access control assessment of current authorization model against new business requirements',
      'DNS naming convention review',
      'Reverse proxy TCP port allocation',
    ],
    1,
    'Assessing whether legacy ACL/POP-based authorization is sufficient, or whether risk-aware Context-Based Access (CBA) policies are required, is part of the access control planning activity.',
  ),
  mk(
    1,
    'A customer wants to plan for future MFA rollout without deploying it in phase 1. What should the planning workshop capture?',
    [
      'Nothing; MFA cannot be planned in advance',
      'Feature requirements noting future MFA needs so licensing and architecture allow for it later',
      'The exact TOTP secret keys',
      'The mobile app icon design',
    ],
    1,
    'Even when a feature is deferred, planning should record the future requirement so licensing (Advanced Access Control) and architecture are not blockers later.',
  ),
  mk(
    1,
    'When planning solution sizing across two data centers for disaster recovery, what must be identified?',
    [
      'The preferred web browser of end users',
      'RTO/RPO targets and whether an active-active or active-passive topology is required',
      'The number of help desk tickets logged last year',
      'The favorite color of the CISO',
    ],
    1,
    'Sizing and topology decisions for DR depend on Recovery Time Objective / Recovery Point Objective targets, which determine active-active versus active-passive design.',
  ),
  mk(
    1,
    'A customer is undecided between deploying ISVA as a virtual/hardware appliance or as containers on Kubernetes. Which planning question is most relevant to this decision?',
    [
      'What is the existing operational model — is the team already running a container orchestration platform and CI/CD pipelines?',
      'What color is the company logo?',
      'How many junctions were configured in the previous deployment?',
      'What is the expiration date of the SSL certificate?',
    ],
    0,
    'Container versus appliance form-factor decisions during planning hinge on existing operational capability (Kubernetes/OpenShift experience, CI/CD, GitOps) rather than technical minutiae decided later.',
  ),
  mk(
    1,
    'Which of the following is an example of identifying a feature requirement during the planning phase?',
    [
      'Determining that the customer needs desktop single sign-on (SPNEGO) for internal Windows-domain users',
      'Configuring the SPNEGO keytab file on the reverse proxy',
      'Writing the JavaScript InfoMap authentication mechanism',
      'Testing the Kerberos ticket exchange in a lab',
    ],
    0,
    'Identifying that the business needs SPNEGO desktop SSO is a feature-requirement decision made during planning; the keytab configuration and testing happen in later installation/configuration/testing phases.',
  ),
]

// ---------------------------------------------------------------------------
// Section 2: Architecture and Design (pool of 13, exam draws 9)
// ---------------------------------------------------------------------------
const section2: PoolQuestion[] = [
  mk(
    2,
    'An architect must design session resiliency so that a user is not logged out if the reverse proxy instance handling their session fails. Which component should the design include?',
    [
      'Distributed Session Cache (DSC)',
      'Local file-based session store on each reverse proxy only',
      'A cron job that restarts junctions nightly',
      'Increasing the HTML template cache size',
    ],
    0,
    'The Distributed Session Cache (DSC) replicates session state across reverse proxy instances so that any instance can serve a request for a session without forcing re-authentication, which is essential for session failover.',
    'A retail customer runs three reverse proxy instances behind a load balancer and requires that in-progress checkout sessions survive the failure of any single instance.',
  ),
  mk(
    2,
    'Which junction type should be selected when the backend application server requires client-certificate mutual authentication from the reverse proxy?',
    [
      'A standard TCP junction',
      'A virtual junction with basic authentication only',
      'An SSL junction configured for mutual authentication',
      'A stateful junction with no encryption',
    ],
    2,
    'When the backend requires the reverse proxy to present a client certificate, the junction must be an SSL junction configured with mutual authentication so a client certificate is presented during the TLS handshake.',
  ),
  mk(
    2,
    'In a High Availability design, the architect places two ISVA reverse proxy appliances behind a hardware load balancer in an active-active configuration. Which additional design element is required to preserve authenticated sessions across both nodes?',
    [
      'A shared or replicated session cache (DSC) between both nodes',
      'Disabling the load balancer health checks',
      'Configuring both nodes with different LDAP suffixes',
      'Using two separate unrelated LMI credentials',
    ],
    0,
    'Active-active HA designs require a replicated session store (DSC) so either node can validate a session created by the other, preventing forced re-authentication on failover.',
  ),
  mk(
    2,
    'Which deployment pattern places the reverse proxy component in the DMZ while keeping the policy/runtime and user registry in the internal network?',
    [
      'Single-tier flat deployment with everything in the DMZ',
      'A three-tier design: DMZ reverse proxy, internal runtime/policy server, internal directory',
      'Deploying the LDAP server in the DMZ alongside the reverse proxy',
      'Placing the reverse proxy behind the internal firewall only',
    ],
    1,
    'The standard secure architecture places the reverse proxy in the DMZ as the internet-facing component, while the runtime/policy services and the user registry remain in the trusted internal network, minimizing the DMZ attack surface.',
  ),
  mk(
    2,
    'When designing backup procedures for an ISVA virtual appliance, what should the design specify?',
    [
      'Manual screenshots of the LMI dashboard',
      'Regular LMI snapshot exports stored off-appliance, with a defined retention and restore test schedule',
      'Disabling backups since firmware updates handle this automatically',
      'Relying solely on the reverse proxy access log',
    ],
    1,
    'A sound backup design uses scheduled LMI snapshots exported to external/remote storage, with a retention policy and periodic restore testing to validate recoverability.',
  ),
  mk(
    2,
    'A design calls for authenticating business partner employees via SAML assertions issued by the partner\'s IdP. Which authentication method should the architecture specify for the reverse proxy junction path serving those users?',
    [
      'Forms-based authentication against the local LDAP',
      'Federated authentication using a SAML 2.0 trust with the partner acting as Identity Provider',
      'Basic authentication with shared credentials',
      'Client-certificate authentication issued by the internal CA',
    ],
    1,
    'When a partner issues SAML assertions, the architecture should establish a SAML 2.0 federation trust where the partner is the IdP and ISVA acts as the Service Provider, consuming the assertion for SSO.',
  ),
  mk(
    2,
    'Which network requirement must be documented when designing an ISVA deployment that terminates TLS at the reverse proxy and re-encrypts traffic to the backend?',
    [
      'The backend applications must be reachable from the reverse proxy over the required port, and certificates trusted end-to-end for TLS re-encryption',
      'The reverse proxy must never open outbound connections',
      'All backend traffic must be plaintext HTTP internally regardless of TLS termination',
      'DNS resolution is not required for junction targets',
    ],
    0,
    'End-to-end TLS designs require documenting reachability to backend ports and ensuring certificate trust chains are valid for the re-encrypted hop from reverse proxy to backend.',
  ),
  mk(
    2,
    'An architect is designing the deployment process for promoting configuration changes from Test to Production. Which approach best supports repeatability and rollback?',
    [
      'Manually retyping every LMI setting in production from memory',
      'Exporting configuration/snapshots from Test and using a controlled, versioned promotion process into Production with a rollback snapshot taken beforehand',
      'Sharing the Test appliance\'s IP address with Production users',
      'Skipping Test entirely and configuring directly in Production',
    ],
    1,
    'A robust deployment process design uses versioned, exportable configuration artifacts and snapshots, promoted through a controlled pipeline with a pre-change rollback point.',
  ),
  mk(
    2,
    'Which design decision most directly affects whether a WebSEAL reverse proxy junction can transparently pass the original client identity to a backend application without prompting again?',
    [
       'The choice of junction authentication method, such as using an EAI header or Identity token to assert the authenticated user',
      'The number of CPU cores allocated to the appliance',
      'The DNS TTL value for the reverse proxy hostname',
      'The color scheme of the error page',
    ],
    0,
    'Passing identity transparently to the backend (single sign-on to the app) is achieved by junction-level identity assertion methods such as EAI headers or identity tokens, a key architecture decision.',
  ),
  mk(
    2,
    'A design requires that if the primary data center becomes unavailable, users are automatically redirected to a secondary data center with minimal session disruption. Which combination of design elements supports this?',
    [
      'Global load balancing/DNS failover plus session replication (DSC) stretched or synchronized between sites',
      'A single reverse proxy instance with no redundancy',
      'Manually updating client hosts files during an outage',
      'Disabling health checks on both sites',
    ],
    0,
    'Cross-site DR with minimal disruption requires both traffic-level failover (global load balancer/DNS) and session-state continuity (replicated/synchronized DSC) between sites.',
  ),
  mk(
    2,
    'When should an architect choose a virtual (transparent path) junction instead of a standard junction?',
    [
      'When backend application links must be preserved exactly, without ISVA rewriting the URL path, typically for applications sensitive to path rewriting',
      'When the backend requires the reverse proxy to strip all cookies',
      'When no backend server is available yet',
      'Only when using SPNEGO authentication',
    ],
    0,
    'A virtual junction preserves the original request path (no junction label inserted into the URL), which is chosen when the backend application cannot tolerate path rewriting.',
  ),
  mk(
    2,
    'Which factor should drive the decision to scale out with additional reverse proxy instances rather than scaling up a single instance?',
    [
      'The desire to reduce the number of TLS certificates',
      'Anticipated peak concurrent connections/throughput exceeding a single instance\'s capacity, and the need for redundancy',
      'A requirement to use only one CPU core total',
      'A preference for simpler DNS records',
    ],
    1,
    'Scale-out decisions are driven by capacity (peak throughput/concurrency beyond one instance\'s limits) and redundancy/HA requirements, both established during architecture and design.',
  ),
  mk(
    2,
    'An STS (Security Token Service) chain is being designed to convert an incoming SAML assertion into a JWT for a downstream API. What must the design specify?',
    [
      'A chain with a SAML token module as the token consumer and a JWT/JSON Web Token module as the token issuer, plus any identity mapping rules between them',
      'Only the reverse proxy junction label',
      'Disabling the runtime component entirely',
      'A plain HTTP Basic Auth rule with no token modules',
    ],
    0,
    'STS chain design specifies the consumer module for the inbound token type (SAML) and the issuer module for the outbound type (JWT), along with any identity mapping/attribute transformation rules connecting them.',
  ),
]

// ---------------------------------------------------------------------------
// Section 3: Installation (pool of 12, exam draws 8)
// ---------------------------------------------------------------------------
const section3: PoolQuestion[] = [
  mk(
    3,
    'Where should an administrator obtain the official ISVA virtual appliance image and interim fixes for installation?',
    [
      'A random public file-sharing site',
      'IBM Fix Central / IBM Passport Advantage, using valid entitlement',
      'A personal USB drive from a colleague',
      'An unofficial community mirror',
    ],
    1,
    'Official installation images, firmware updates, and interim fixes must be downloaded from IBM Fix Central or Passport Advantage under valid entitlement to ensure integrity and support eligibility.',
  ),
  mk(
    3,
    'When creating a virtual machine to host the ISVA virtual appliance, which step is required before first boot?',
    [
      'Importing the OVA/ISO image and allocating the minimum required vCPU, memory, and disk per IBM specifications',
      'Installing a full general-purpose Linux OS manually first',
      'Disabling the hypervisor',
      'Formatting the disk with a Windows file system',
    ],
    0,
    'The appliance ships as a pre-built OVA/ISO; the administrator imports it into the hypervisor and allocates resources meeting IBM\'s minimum sizing requirements before first boot.',
  ),
  mk(
    3,
    'Before configuring the federated directory, what must be prepared in the LDAP user registry?',
    [
      'Nothing; ISVA creates the registry automatically with no schema',
      'Required schema extensions/attributes and a service account with appropriate bind and search permissions',
      'A disabled TLS configuration on the LDAP server',
      'Deleting all existing users',
    ],
    1,
    'Preparing the user registry involves ensuring necessary schema/attributes exist and that a bind account with adequate permissions is available for ISVA to authenticate and search.',
  ),
  mk(
    3,
    'Which database preparation step is typically required before configuring the runtime environment for federation/AAC features?',
    [
      'Creating the database instance/schema and credentials that the runtime component will use for its configuration and session data',
      'Disabling all database logging permanently',
      'Deleting the database after installation',
      'Skipping database preparation since the runtime never persists data',
    ],
    0,
    'The runtime (policy server/AAC/federation) environment requires a prepared external database (e.g., PostgreSQL/DB2) with a schema and credentials configured before the runtime component is activated.',
  ),
  mk(
    3,
    'An organization wants to deploy ISVA reverse proxy and runtime components as containers orchestrated by Kubernetes. Which artifact is used to deploy this?',
    [
      'The Docker/Helm chart images and configuration provided for the containerized deployment pattern',
      'The legacy hardware appliance installation CD',
      'A Windows MSI installer',
      'A standalone JAR file run with java -jar',
    ],
    0,
    'The containerized deployment pattern uses IBM-provided Docker images and Helm charts, deployed and orchestrated via Kubernetes/OpenShift.',
  ),
  mk(
    3,
    'After importing the appliance image, which action activates the licensed offerings (e.g., Advanced Access Control) on the appliance?',
    [
      'Applying the appropriate activation code/license file through the LMI',
      'Editing the /etc/hosts file',
      'Renaming the appliance hostname',
      'Restarting the reverse proxy service only',
    ],
    0,
    'Licensed modules such as Advanced Access Control or Federation are enabled by applying the corresponding activation code or license file through the Local Management Interface.',
  ),
  mk(
    3,
    'During initial network configuration of a newly deployed appliance, which interfaces typically need to be configured separately?',
    [
      'Only a single interface is ever used, regardless of role',
      'The management interface (for LMI access) and one or more application/runtime interfaces (for reverse proxy traffic)',
      'A modem dial-up interface',
      'A Bluetooth interface',
    ],
    1,
    'ISVA appliances separate the management interface, used to access the LMI, from application interfaces used to serve reverse proxy traffic, and both need proper IP/network configuration.',
  ),
  mk(
    3,
    'Why must SSL certificates be imported into the appliance keystore during installation before configuring HTTPS junctions?',
    [
      'Certificates are optional and never required',
      'The reverse proxy and runtime need the certificate/trust chain available locally to establish and validate TLS connections',
      'Certificates are only needed for the help desk portal',
      'Only self-signed certificates work, and importing is unnecessary',
    ],
    1,
    'TLS-secured junctions and the reverse proxy\'s own HTTPS listener require the relevant certificates and trusted CA chain to be present in the local keystore to establish and validate connections.',
  ),
  mk(
    3,
    'Which step is part of the first-time setup wizard on a freshly deployed ISVA appliance?',
    [
      'Setting the initial LMI administrator password and accepting the license agreement',
      'Writing custom JavaScript authentication mechanisms',
      'Configuring OAuth client scopes',
      'Creating SIEM correlation rules',
    ],
    0,
    'The first-time setup wizard covers foundational tasks such as accepting the license agreement and setting the initial administrator password; advanced configuration like OAuth and custom auth happens later.',
  ),
  mk(
    3,
    'An administrator needs to apply a newer firmware image to a freshly installed appliance as part of initial installation. What is the correct high-level process?',
    [
      'Upload the firmware image via the LMI, apply it, and reboot to activate the new partition',
      'Manually copy files over FTP into the running OS filesystem',
      'Reinstall the entire hypervisor',
      'Edit the firmware version number in a text file',
    ],
    0,
    'Firmware is applied through the LMI\'s firmware management interface, which uploads the image, applies it to an alternate partition, and activates it on reboot.',
  ),
  mk(
    3,
    'After completing installation, which action confirms that the reverse proxy instance was installed and started correctly?',
    [
      'Assuming success without any check',
      'Checking the instance status in the LMI and verifying the reverse proxy responds to a test request',
      'Deleting the instance and recreating it repeatedly',
      'Only checking that the VM has power on',
    ],
    1,
    'Post-installation verification includes checking instance status in the LMI and confirming the reverse proxy actually serves a test HTTP(S) request.',
  ),
  mk(
    3,
    'When preparing to install ISVA in a Kubernetes environment, which prerequisite must be validated for persistent configuration and session data?',
    [
      'That suitable persistent storage classes/volumes are available for components requiring persistence',
      'That the cluster has no network policies',
      'That all pods run as a single replica with no storage',
      'That Kubernetes secrets are disabled',
    ],
    0,
    'Containerized deployments still require persistent storage for configuration and stateful data, so validating available storage classes/persistent volumes is a key installation prerequisite.',
  ),
]

// ---------------------------------------------------------------------------
// Section 4: Configuration (pool of 14, exam draws 10)
// ---------------------------------------------------------------------------
const section4: PoolQuestion[] = [
  mk(
    4,
    'An administrator wants to add a second appliance to an existing cluster so both share the same configuration. What is the correct approach?',
    [
      'Manually copy configuration files between appliances using SCP',
      'Configure the new node to join the existing cluster from the LMI, designating it as a secondary node synchronized from the primary',
      'Reinstall the primary node',
      'Configure both nodes independently with different policies',
    ],
    1,
    'Clustering in ISVA is configured through the LMI by joining a new node to an existing cluster as a secondary, which then synchronizes configuration from the primary master.',
  ),
  mk(
    4,
    'Which component must be configured before AAC (Advanced Access Control) or Federation capabilities such as OIDC or SAML can be used?',
    [
      'The base runtime component (runtime environment) backed by its configured database',
      'The reverse proxy log rotation schedule',
      'The appliance NTP settings only',
      'The junction label case sensitivity option',
    ],
    0,
    'AAC and Federation modules run inside the runtime component, so the runtime environment (including its database) must be configured and started first.',
  ),
  mk(
    4,
    'A company has two separate Active Directory forests that must both be searchable for authentication. Which configuration addresses this?',
    [
      'Configuring a single flat file of usernames',
      'Configuring federated directories to combine multiple registries into one logical suffix used by the runtime/reverse proxy',
      'Disabling one of the two forests',
      'Manually merging both AD databases into one',
    ],
    1,
    'Federated directories allow multiple distinct LDAP/AD registries to be combined and searched as a single logical user registry for authentication and identity lookups.',
  ),
  mk(
    4,
    'When configuring a new reverse proxy instance, which parameter set is essential to define?',
    [
      'Listening interfaces/ports, the associated user registry, and the junction root configuration',
      'Only the color of the login page',
      'The number of stored comments per question',
      'The SIEM dashboard refresh rate',
    ],
    0,
    'Configuring a reverse proxy instance requires defining its network listeners, the user registry it authenticates against, and its junction/document root configuration.',
  ),
  mk(
    4,
    'Which task is part of configuring the authorization service used to evaluate ACL and POP-based access decisions?',
    [
      'Defining the object space, ACLs, and POPs that will be attached to protected resources',
      'Writing HTML template pages only',
      'Configuring the DNS zone file',
      'Setting the appliance time zone',
    ],
    0,
    'Configuring authorization involves defining the protected object space and attaching Access Control Lists (ACLs) and Protected Object Policies (POPs) to resources.',
  ),
  mk(
    4,
    'An administrator wants LMI administrators to authenticate using the corporate LDAP instead of local appliance accounts. What should be configured?',
    [
      'LMI external authentication (remote user registry) pointing to the corporate LDAP/AD',
      'A hosts file entry mapping localhost to the LDAP server',
      'Disabling LMI authentication entirely',
      'Creating a new local-only appliance account for every LDAP user',
    ],
    0,
    'LMI external authentication configuration allows the appliance\'s own management console to authenticate administrators against an external LDAP/AD registry rather than local accounts.',
  ),
  mk(
    4,
    'Which configuration enables users to authenticate with a one-time password sent via a registered mobile method in addition to their normal password?',
    [
      'Multi-factor authentication (MFA) configuration using a one-time password mechanism',
      'A static shared password for all users',
      'Disabling the login page',
      'Increasing session timeout to 24 hours',
    ],
    0,
    'MFA configuration adds a second factor, such as a one-time password (OTP/TOTP) delivered to a registered device, layered on top of standard password authentication.',
  ),
  mk(
    4,
    'A partner needs automated provisioning and deprovisioning of user accounts as employees join and leave. Which ISVA feature should be configured?',
    [
      'SCIM (System for Cross-domain Identity Management) provisioning endpoint',
      'A manually maintained spreadsheet',
      'The reverse proxy access log',
      'The firmware update scheduler',
    ],
    0,
    'SCIM provides a standard protocol and endpoint configuration for automated identity lifecycle management (create/update/deactivate accounts) between identity sources and ISVA.',
  ),
  mk(
    4,
    'To allow a mobile application to obtain an access token and call a protected REST API, which component must be configured?',
    [
      'An OAuth 2.0 / OIDC provider definition with registered clients and scopes',
      'A Kerberos keytab only',
      'A static API key hardcoded in the reverse proxy',
      'A basic authentication junction with no tokens',
    ],
    0,
    'API protection for mobile/native clients requires configuring an OAuth 2.0/OIDC provider, including client registration and scope definitions, so tokens can be issued and validated.',
  ),
  mk(
    4,
    'Which configuration ensures that all authentication successes and failures are captured for compliance reporting?',
    [
      'Auditing configuration, typically integrated with the Common Audit Service, capturing authentication and authorization events',
      'Disabling all logs to save disk space',
      'Only logging errors at the operating system level',
      'Relying on user self-reporting',
    ],
    0,
    'Auditing configuration (often via the Common Audit Service) captures authentication and authorization events needed for compliance and forensic reporting.',
  ),
  mk(
    4,
    'An administrator notices the reverse proxy becomes a bottleneck under high concurrency. Which configuration tuning parameter is most relevant?',
    [
      'Worker thread / connection pool settings for the reverse proxy instance',
      'The junction case-sensitivity flag',
      'The LMI session inactivity timeout',
      'The template page character encoding',
    ],
    0,
    'Worker thread and connection pool tuning directly affects how many concurrent requests a reverse proxy instance can process, making it the relevant configuration for concurrency bottlenecks.',
  ),
  mk(
    4,
    'A security policy requires passwords to be at least 12 characters, include a special character, and expire every 90 days. Where is this configured?',
    [
      'Password policy configuration within the user registry or the runtime\'s password policy settings',
      'The reverse proxy TLS cipher list',
      'The firmware activation code',
      'The DSC replication interval',
    ],
    0,
    'Password complexity, length, and expiration rules are configured as a password policy, enforced by the user registry or by the runtime\'s policy configuration depending on architecture.',
  ),
  mk(
    4,
    'Which of the following is required to configure a junction connecting the reverse proxy to a backend application server?',
    [
      'The backend server hostname/IP, port, protocol (HTTP/HTTPS), and junction label',
      'Only the appliance\'s own hostname',
      'The reverse proxy\'s own local disk size',
      'The number of LMI administrator accounts',
    ],
    0,
    'Junction configuration requires identifying the backend server, its port and protocol, and the junction label under which it will be reachable through the reverse proxy.',
  ),
  mk(
    4,
    'A customer wants new user self-registration to automatically assign a default group and send a verification email. Which configuration area covers this?',
    [
      'Self-care/registration flow configuration within Advanced Access Control',
      'The reverse proxy TCP keepalive setting',
      'The appliance NTP server list',
      'The firmware rollback partition',
    ],
    0,
    'Self-registration behavior, including default group assignment and verification notifications, is configured as part of the self-care/registration flows in Advanced Access Control.',
  ),
]

// ---------------------------------------------------------------------------
// Section 5: System Integration (pool of 14, exam draws 10)
// ---------------------------------------------------------------------------
const section5: PoolQuestion[] = [
  mk(
    5,
    'A backend application expects the authenticated username in an HTTP header rather than performing its own login. How should the junction be integrated with this application?',
    [
      'Configure the junction to insert an identity-asserting header (e.g., an EAI or iv-user style header) containing the authenticated identity',
      'Disable authentication entirely for that junction',
      'Require the application to query the LDAP directly on every request',
      'Configure a virtual junction with no identity information at all',
    ],
    0,
    'Integrating with header-based applications requires the reverse proxy junction to insert an identity header asserting the authenticated user, allowing the backend to trust ISVA\'s authentication.',
  ),
  mk(
    5,
    'To protect a REST API so that only requests bearing a valid OAuth access token are allowed through, which integration should be configured on the junction/path?',
    [
      'OAuth token introspection/validation enforcement at the API protection point in front of the junction',
      'A plain forms login page in front of the API',
      'No protection, relying on the client to self-report validity',
      'IP allow-listing only, with no token checks',
    ],
    0,
    'API protection integration validates the bearer token (via introspection or local validation) before allowing the request through to the backend API.',
  ),
  mk(
    5,
    'A partner\'s identity provider issues SAML 2.0 assertions for cross-company SSO. What must be configured on the ISVA side to complete the integration?',
    [
      'A Service Provider (SP) partner configuration trusting the partner\'s IdP metadata and certificate',
      'A local-only username/password account for every partner employee',
      'A junction pointing directly at the partner\'s IdP with basic authentication',
      'Disabling all federation modules',
    ],
    0,
    'Completing SAML federation with a partner IdP requires configuring ISVA as the Service Provider, importing/trusting the partner\'s IdP metadata and signing certificate.',
  ),
  mk(
    5,
    'Windows domain users should be silently authenticated to internal applications without typing credentials, leveraging their existing domain login. Which integration accomplishes this?',
    [
      'Desktop single sign-on using SPNEGO/Kerberos',
      'A shared static password distributed to all users',
      'Basic authentication prompts on every request',
      'Disabling authentication for the internal network entirely',
    ],
    0,
    'SPNEGO/Kerberos-based desktop SSO integration allows domain-joined Windows clients to authenticate transparently using their existing Kerberos ticket.',
  ),
  mk(
    5,
    'A downstream microservice only understands JWTs, but the client authenticates with a SAML assertion. Which integration solves this mismatch?',
    [
      'An STS token transformation chain that consumes the SAML token and issues a JWT',
      'Rewriting the microservice to understand SAML natively with no other changes',
      'Ignoring the mismatch and passing the SAML assertion unmodified as if it were a JWT',
      'Disabling token validation on the microservice',
    ],
    0,
    'The Security Token Service (STS) is designed to integrate mismatched token formats by consuming one token type (SAML) and issuing another (JWT) through a configured trust chain.',
  ),
  mk(
    5,
    'The operations team wants ISVA authentication events to appear in their centralized monitoring dashboard alongside other infrastructure alerts. Which integration is appropriate?',
    [
      'Forwarding logs/events via syslog or SNMP to the existing monitoring framework',
      'Printing logs to the local console only',
      'Emailing individual log lines to each administrator',
      'Disabling monitoring since it is unsupported',
    ],
    0,
    'Standard monitoring framework integration is achieved by forwarding relevant events via syslog or SNMP traps into the existing enterprise monitoring platform.',
  ),
  mk(
    5,
    'A legacy application has its own proprietary login mechanism that ISVA cannot natively replicate. Which integration approach allows ISVA to still front the application with SSO?',
    [
      'Implementing a custom External Authentication Interface (EAI) that performs the handshake and asserts identity back to ISVA',
      'Bypassing the reverse proxy entirely for that application',
      'Forcing users to log in twice, once at ISVA and once at the legacy app, with no integration',
      'Deleting the legacy application\'s authentication code',
    ],
    0,
    'When native mechanisms are insufficient, an External Authentication Interface (EAI) can be built to integrate with proprietary login flows while still asserting identity back into ISVA\'s session.',
  ),
  mk(
    5,
    'The security team uses IBM QRadar and wants ISVA authentication anomalies correlated with other security events. Which integration should be configured?',
    [
      'SIEM integration forwarding relevant audit/event data (e.g., via syslog or CADF-formatted events) to QRadar',
      'Manually exporting logs to a USB drive weekly',
      'Disabling audit logging to reduce noise',
      'Configuring QRadar as a backend junction target',
    ],
    0,
    'SIEM integration involves forwarding structured audit/event data to the SIEM platform (such as QRadar) using supported formats/protocols like syslog or CADF.',
  ),
  mk(
    5,
    'A customer already has a RADIUS-based hardware token solution for MFA and wants to reuse it rather than deploying a new mechanism. Which integration supports this?',
    [
      'Configuring ISVA to integrate with the existing RADIUS server as an external MFA/authentication provider',
      'Disabling MFA and using password-only authentication',
      'Replacing the RADIUS solution entirely with a proprietary format',
      'Hardcoding the RADIUS shared secret into the HTML template',
    ],
    0,
    'ISVA can integrate with an existing RADIUS-based MFA infrastructure, allowing reuse of the customer\'s current hardware token investment instead of a rebuild.',
  ),
  mk(
    5,
    'An application team runs their APIs on WebSphere Liberty and needs ISVA to validate tokens issued by ISVA\'s own OIDC provider before requests reach Liberty. What is the correct integration point?',
    [
      'Token validation/introspection enforced at the reverse proxy or API gateway layer in front of the Liberty-hosted APIs',
      'Embedding the ISVA database credentials inside the Liberty server.xml',
      'Disabling TLS between the reverse proxy and Liberty',
      'Running the OIDC provider inside the Liberty application itself, bypassing ISVA',
    ],
    0,
    'The integration point for protecting the Liberty-hosted APIs is token validation/introspection performed at the reverse proxy or gateway layer before requests are forwarded.',
  ),
  mk(
    5,
    'ISVA needs to act as an OIDC Relying Party to an external cloud identity provider (OP) for a specific application. Which configuration completes the integration?',
    [
      'Registering ISVA as an OIDC client with the external OP and configuring the corresponding Relying Party definition in ISVA',
      'Configuring ISVA as the OP and ignoring the external provider',
      'Disabling OIDC and using only local LDAP',
      'Sharing the OP\'s private signing key with all end users',
    ],
    0,
    'Acting as an OIDC Relying Party requires registering ISVA as a client with the external OP and configuring the matching RP metadata (issuer, client ID/secret, endpoints) within ISVA.',
  ),
  mk(
    5,
    'A customer wants additional user attributes (such as department and cost center) pulled from an HR system, not the LDAP directory, during authorization decisions. Which integration supports this?',
    [
      'Configuring a Policy Information Point (PIP) that queries the HR system as an external attribute source',
      'Manually retyping HR data into LDAP once a year',
      'Ignoring the requirement since only LDAP attributes can ever be used',
      'Disabling authorization checks for those attributes',
    ],
    0,
    'A Policy Information Point (PIP) can be integrated to fetch attributes from external sources like an HR system at authorization/policy evaluation time.',
  ),
  mk(
    5,
    'A backend application must not have its own internal URL paths rewritten by the reverse proxy during integration. Which junction configuration should be used?',
    [
      'A virtual junction to preserve original paths for that specific integration',
      'A standard junction that always rewrites paths',
      'No junction at all, exposing the backend directly to the internet',
      'A junction that strips all query parameters',
    ],
    0,
    'When integrating an application sensitive to URL rewriting, a virtual junction is used because it preserves the original request path.',
  ),
  mk(
    5,
    'An external policy decision point (PDP) outside of ISVA must be consulted for certain high-risk transactions before access is granted. How is this typically integrated?',
    [
      'Configuring a Context-Based Access policy or PIP that calls out to the external PDP/risk engine as part of the access decision',
      'Granting access to all requests and skipping the PDP',
      'Embedding the PDP\'s source code directly into the reverse proxy binary',
      'Ignoring the PDP and using only static ACLs',
    ],
    0,
    'Integration with an external policy decision point is achieved through Context-Based Access policies or a custom PIP that invokes the external service as part of the risk-aware access evaluation.',
  ),
]

// ---------------------------------------------------------------------------
// Section 6: Advanced Customization (pool of 15, exam draws 11)
// ---------------------------------------------------------------------------
const section6: PoolQuestion[] = [
  mk(
    6,
    'A bank wants to step up authentication (require MFA) only when a login attempt originates from an unfamiliar device or a high-risk country. Which feature should be customized?',
    [
      'A Context-Based Access (CBA) policy using risk-based attributes (device fingerprint, geolocation) to trigger an obligation for additional authentication',
      'A static ACL applied identically to all users',
      'Disabling authentication entirely for convenience',
      'A fixed IP allow-list with no risk evaluation',
    ],
    0,
    'Context-Based Access policies evaluate contextual/risk attributes such as device and geolocation, and can trigger obligations like step-up authentication when risk is elevated.',
  ),
  mk(
    6,
    'Which component calculates a numeric risk score used by Context-Based Access policies to decide whether to allow, deny, or step up an authentication attempt?',
    [
      'The risk engine/risk profile evaluating configured risk factors',
      'The firmware update scheduler',
      'The reverse proxy access log rotation job',
      'The LMI backup snapshot process',
    ],
    0,
    'A risk profile/risk engine evaluates configured risk factors (device, location, behavior, etc.) to produce a risk score that CBA policies act upon.',
  ),
  mk(
    6,
    'A developer needs to transform an inbound SAML attribute name into a different attribute name expected by a downstream JWT claim. Which customization is required?',
    [
      'An identity mapping rule (STS mapping script) that renames/transforms attributes during the token exchange',
      'Editing the reverse proxy binary source code',
      'Renaming the attribute in the original LDAP schema only',
      'Disabling attribute mapping entirely',
    ],
    0,
    'Identity mapping customization within the STS chain (via mapping rules/scripts) is used to transform or rename attributes as tokens move between formats.',
  ),
  mk(
    6,
    'A custom attribute needed for authorization decisions is not available from LDAP or the request context by default. What should be developed?',
    [
      'A custom Policy Information Point (PIP) that retrieves the attribute from its actual source at evaluation time',
      'A hardcoded value baked into every policy',
      'A manual spreadsheet updated by hand',
      'Disabling the policy that needs the attribute',
    ],
    0,
    'When a needed attribute is not natively available, a custom PIP is developed to fetch it from the appropriate external source dynamically during policy evaluation.',
  ),
  mk(
    6,
    'A customer wants new users to complete identity verification questions before their self-registration is approved. Which customization area is used?',
    [
      'Customizing the user self-care registration flow (forms/pages and business logic)',
      'Editing the reverse proxy TCP settings',
      'Modifying firmware partition layout',
      'Changing the appliance system clock',
    ],
    0,
    'Adding custom verification steps to registration is done by customizing the self-care flow, including its forms and underlying business logic.',
  ),
  mk(
    6,
    'A bank needs a multi-step authentication flow: username/password, then a knowledge-based question only if the user is flagged as high-risk. Which mechanism is best suited to build this custom flow?',
    [
      'A JavaScript-based InfoMap authentication mechanism orchestrating the multi-step logic',
      'A static HTML page with no server-side logic',
      'Disabling authentication for high-risk users',
      'A single ACL with no conditional logic',
    ],
    0,
    'InfoMap authentication mechanisms use server-side JavaScript to orchestrate custom, conditional, multi-step authentication flows exactly like this scenario.',
  ),
  mk(
    6,
    'A backend application expects request headers in a different casing/format than what the client sends, and this cannot be changed on the backend. What customization addresses this at the reverse proxy?',
    [
      'An HTTP transformation (rewrite) rule that modifies headers as they pass through the junction',
      'Recompiling the backend application',
      'Ignoring the mismatch and hoping the backend tolerates it',
      'Disabling the junction',
    ],
    0,
    'HTTP transformation/rewrite rules at the reverse proxy can modify headers, paths, or content in flight to reconcile format mismatches between client and backend expectations.',
  ),
  mk(
    6,
    'A customer requires a non-standard OAuth grant type tailored to their legacy client application. What is required?',
    [
      'Custom OAuth/OIDC customization to define or adapt the grant handling to the legacy client\'s needs',
      'Using only the standard authorization code grant with no changes',
      'Disabling OAuth support entirely',
      'Hardcoding a permanent access token for all clients',
    ],
    0,
    'When standard grant types do not fit a legacy client, OAuth/OIDC customization allows tailoring grant handling to meet those specific integration needs.',
  ),
  mk(
    6,
    'To recognize returning devices and reduce friction for trusted devices during login, which capability should be customized/enabled?',
    [
      'Device registration and fingerprinting, allowing recognized devices to skip additional challenges',
      'Deleting all device records after every session',
      'Assigning the same device ID to every user',
      'Disabling cookies entirely',
    ],
    0,
    'Device registration/fingerprinting customization lets the system recognize previously trusted devices, reducing friction (e.g., skipping MFA) for those devices on subsequent logins.',
  ),
  mk(
    6,
    'A company wants their own branding (logo, colors, text) on the login and error pages instead of the IBM default look. What should be customized?',
    [
      'The HTML/CSS template pages used for login, error, and self-care flows',
      'The firmware boot splash screen only',
      'The reverse proxy binary',
      'The appliance BIOS settings',
    ],
    0,
    'Branding changes are made by customizing the HTML/CSS template pages ISVA serves for login, error, and self-care screens.',
  ),
  mk(
    6,
    'An organization has a proprietary SSO handshake used by an acquired subsidiary\'s applications that ISVA does not support out of the box. Which customization integrates it?',
    [
      'Building a custom External Authentication Interface (EAI) to implement the proprietary handshake and assert identity to ISVA',
      'Requiring the subsidiary to rebuild all of their applications from scratch',
      'Ignoring the subsidiary\'s applications entirely',
      'Using only a static ACL with no authentication',
    ],
    0,
    'A custom EAI is the standard extensibility point for implementing non-standard/proprietary authentication handshakes while still integrating with ISVA\'s session model.',
  ),
  mk(
    6,
    'A policy needs to combine several attributes (role, department, and time of day) using custom conditional logic beyond what a simple ACL provides. What customization is appropriate?',
    [
      'A custom authorization/access policy using JavaScript-based rules to evaluate the combined conditions',
      'A single static POP with no conditions',
      'Manually approving every request by a human reviewer',
      'Disabling authorization checks for that resource',
    ],
    0,
    'Complex conditional authorization logic beyond basic ACL/POP capability is implemented using JavaScript-based access policies (advanced authorization rules).',
  ),
  mk(
    6,
    'Which customization allows fine-grained, custom logic to be evaluated directly at the reverse proxy for a specific protected object, beyond the default ACL/POP model?',
    [
      'A custom authorization rule (e.g., an AZN rule) attached to the protected object',
      'Changing the reverse proxy\'s listening port',
      'Renaming the junction label',
      'Increasing the session timeout value',
    ],
    0,
    'Custom authorization rules attached to protected objects allow fine-grained custom evaluation logic beyond what static ACLs/POPs alone provide.',
  ),
  mk(
    6,
    'A customer wants to extend the STS to add organization-specific claims into every issued token, and also wants their mobile app users to use push-notification-based MFA. Which two customizations are needed together?',
    [
      'A custom STS mapping rule for the extra claims, plus mobile MFA configuration/customization (e.g., push notification via a registered authenticator app)',
      'Only a firmware upgrade, with no other changes',
      'Disabling STS and disabling MFA',
      'A new junction with no token or MFA changes',
    ],
    0,
    'Adding organization-specific claims requires customizing the STS identity mapping, while push-based MFA requires configuring/customizing the mobile MFA mechanism (e.g., registered authenticator push).',
  ),
  mk(
    6,
    'A retailer wants the risk engine to weigh a customer\'s typical login time-of-day and typical location more heavily than other factors when computing risk. What must be customized?',
    [
      'The risk profile configuration, adjusting factor weights to emphasize time-of-day and location',
      'The reverse proxy TCP buffer size',
      'The appliance NTP source',
      'The firmware rollback partition size',
    ],
    0,
    'Risk profiles are customizable, allowing administrators to adjust the relative weighting of individual risk factors, such as emphasizing time-of-day and location patterns.',
  ),
]

// ---------------------------------------------------------------------------
// Section 7: Testing, Troubleshooting, and Maintenance (pool of 9, exam draws 6)
// ---------------------------------------------------------------------------
const section7: PoolQuestion[] = [
  mk(
    7,
    'IBM releases an interim fix (iFix) addressing a security vulnerability in the currently deployed firmware version. What is the correct maintenance action?',
    [
      'Download the iFix from IBM Fix Central, take a snapshot/backup, then apply it via the LMI following the documented procedure',
      'Ignore it since only full firmware releases matter',
      'Manually patch binary files on the appliance filesystem',
      'Apply it directly to production with no backup or testing',
    ],
    0,
    'Interim fixes should be obtained from IBM Fix Central and applied through the LMI after taking a backup/snapshot, ideally validated in a non-production environment first.',
  ),
  mk(
    7,
    'After a firmware update causes unexpected junction failures, what is the safest immediate remediation?',
    [
      'Roll back to the previous firmware partition using the LMI\'s firmware activation history',
      'Delete all junctions permanently',
      'Reinstall the entire appliance from scratch immediately',
      'Ignore the failures since they usually self-resolve',
    ],
    0,
    'The appliance retains the previous firmware on an alternate partition, and the LMI allows reactivating it, providing a fast rollback path when an update introduces regressions.',
  ),
  mk(
    7,
    'Users report intermittent 403 Forbidden errors when accessing a specific protected resource. Which troubleshooting step should be performed first?',
    [
      'Review the applicable ACL/POP and authorization policy attached to that object, along with authorization audit/trace logs',
      'Immediately reinstall the appliance',
      'Disable authorization checks entirely to make errors disappear',
      'Change the appliance hostname',
    ],
    0,
    'A 403 error indicates an authorization decision denied the request, so the first troubleshooting step is reviewing the relevant ACL/POP/policy and authorization trace logs to identify why.',
  ),
  mk(
    7,
    'An administrator wants to ensure appliance configuration can be restored quickly if a critical failure occurs during scheduled maintenance. What should be prepared beforehand?',
    [
      'A verified, recent LMI snapshot exported to a remote backup storage location',
      'A note-to-self written on paper with no actual backup',
      'Nothing, since appliances never fail',
      'A backup stored only on the appliance\'s own local disk',
    ],
    0,
    'Backup storage preparation requires exporting a recent, verified snapshot to remote/off-appliance storage so recovery is possible even if the appliance itself becomes unusable.',
  ),
  mk(
    7,
    'Reverse proxy response times have degraded under sustained load. Which tuning action is most appropriate to investigate first?',
    [
      'Review and adjust worker thread counts, connection pool sizes, and cache settings based on current metrics',
      'Increase the session inactivity timeout to 24 hours',
      'Delete all audit logs',
      'Reduce the number of CPU cores allocated',
    ],
    0,
    'Performance tuning for a loaded reverse proxy starts with reviewing worker thread/connection pool/cache configuration against observed metrics to identify the bottleneck.',
  ),
  mk(
    7,
    'A specific authentication mechanism is failing intermittently and the root cause is unclear from standard logs. What should be configured to gather more detail?',
    [
      'Increase the trace/logging level for the relevant component temporarily to capture detailed diagnostic information',
      'Disable all logging to reduce noise',
      'Delete the authentication mechanism',
      'Restart the appliance repeatedly without investigation',
    ],
    0,
    'Raising trace/log levels temporarily for the affected component is the standard approach to capture the detail needed to diagnose an intermittent failure.',
  ),
  mk(
    7,
    'After exhausting internal troubleshooting steps for a suspected product defect, what should the administrator do next?',
    [
      'Open a support case (PMR) with IBM Support, attaching a must-gather/support file with logs and configuration details',
      'Post the issue on an unrelated public forum and wait indefinitely',
      'Assume it cannot be fixed and abandon the deployment',
      'Modify undocumented internal files to force a fix',
    ],
    0,
    'Engaging IBM Support involves opening a case and providing the requested must-gather/support file (logs, configuration, traces) to enable proper diagnosis.',
  ),
  mk(
    7,
    'A TLS handshake between the reverse proxy and a backend server is failing. Which is the most likely area to investigate?',
    [
      'Certificate trust chain, expiration, and cipher/protocol compatibility between the reverse proxy keystore and the backend server',
      'The appliance keyboard layout setting',
      'The LMI page refresh interval',
      'The number of junctions configured elsewhere',
    ],
    0,
    'TLS handshake failures are most commonly caused by certificate trust/expiration issues or cipher/protocol mismatches, making the keystore and backend TLS configuration the first place to look.',
  ),
  mk(
    7,
    'Session replication between cluster nodes appears to be failing, causing users to be logged out when failing over between reverse proxy instances. What should be checked first?',
    [
      'Distributed Session Cache (DSC) connectivity, configuration, and replication status between the nodes',
      'The color scheme of the login page',
      'The firmware activation code expiration',
      'The number of ACLs defined',
    ],
    0,
    'Since DSC is responsible for replicating session state for failover, its connectivity and replication status between nodes should be checked first when failover causes unwanted logouts.',
  ),
]

export const QUESTION_POOL: PoolQuestion[] = [
  ...section1,
  ...section2,
  ...section3,
  ...section4,
  ...section5,
  ...section6,
  ...section7,
]

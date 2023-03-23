import {
  faChartBar, faCogs,
  faEdit, faFileArchive,
  faFileCode, faFileInvoice, faFlag, faFolderCog,
  faFolderGear,
  faHeartbeat,
  faLink, faServer, faSitemap, faStream,
  faTools, faUserCircle, faUserPlus, faUsers, faWrench
} from "@fortawesome/pro-light-svg-icons";
import {organizationSettingsHelper} from "components/admin/organization_settings/organizationSettings.helper";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import {adminToolsPaths} from "components/admin/adminTools.paths";

export const adminToolsTrails = {};

adminToolsTrails.admin = {
  parent: undefined,
  name: "admin",
  path: adminToolsPaths.admin,
  linkText: "Administration Tools",
  title: "Administration Tools",
  icon: faTools,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.ldapOrganizationSettingsManagement = {
  parent: "adminTools",
  name: "ldapOrganizationSettingsManagement",
  path: organizationSettingsHelper.getManagementScreenLink(),
  title: "Organization Settings Management",
  linkText: "Customer Settings, Policies, and Entitlements",
  icon: faFolderGear,
  pageDescription: `
      Manage Customer Settings, Policies, and Entitlements
    `
};
adminToolsTrails.ldapOrganizationSettingsDetailView = {
  parent: "ldapOrganizationSettingsManagement",
  name: "ldapOrganizationSettingsDetailView",
  pathFunction: (organizationAccountId) => organizationSettingsHelper.getDetailViewLink(organizationAccountId),
  title: "Organization Settings Details",
  linkText: "Organization Settings Details",
  icon: faFolderGear,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.customEnvironmentVariableManagement = {
  parent: "admin",
  name: "customEnvironmentVariableManagement",
  path: adminToolsPaths.customEnviromentVariableManagement,
  title: "Custom Environment Variable Management",
  linkText: "Custom Environment Variable Management",
  icon: faFileCode,
  pageDescription: "View React and Node Custom Environment Variables",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.systemStatus = {
  parent: "admin",
  name: "systemStatus",
  path: adminToolsPaths.systemStatus,
  linkText: "System Status",
  title: "System Status",
  icon: faHeartbeat,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.systemHealthCheck = {
  parent: "admin",
  name: "systemHealthCheck",
  path: adminToolsPaths.systemHealthCheck,
  linkText: "System Health Check",
  title: "System Health Check",
  icon: faHeartbeat,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.deprecatedReports = {
  parent: "admin",
  name: "deprecatedReports",
  path: adminToolsPaths.deprecatedReports,
  linkText: "Reports",
  title: "Reports",
  icon: faLink,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.reportsRegistration = {
  parent: "admin",
  name: "reportsRegistration",
  path: adminToolsPaths.reportsRegistration,
  linkText: "Reports Registration",
  title: "Reports Registration",
  icon: faChartBar,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.systemManagement = {
  parent: "admin",
  name: "systemManagement",
  path: adminToolsPaths.systemManagement,
  title: "System Management",
  linkText: "System Management",
  icon: faEdit,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.siteNotificationManagement = {
  parent: "admin",
  name: "siteNotificationManagement",
  path: adminToolsPaths.siteNotificationManagement,
  title: "Site Notification Management",
  linkText: "Site Notification Management",
  icon: faFlag,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.siteNotificationDetailView = {
  parent: "siteNotificationManagement",
  name: "siteNotificationDetailView",
  path: adminToolsPaths.siteNotificationDetailView,
  title: "Site Notification Detail View",
  linkText: "Site Notification Detail View",
  icon: faFlag,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.siteNotificationManager = {
  parent: "admin",
  name: "siteNotificationManager",
  path: adminToolsPaths.siteNotificationManager,
  title: "Site Notification Manager",
  linkText: "Site Notification Manager",
  icon: faFlag,
  pageDescription: "Create personalized Site Notifications by Type, including System Maintenance, Service Outage, Success, or Informational Message that will be displayed across the site for every User",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.platformSystemParameterManagement = {
  parent: "admin",
  name: "platformSystemParameterManagement",
  path: adminToolsPaths.platformSystemParameterManagement,
  title: "Custom Parameters Management",
  linkText: "Custom Parameters Management",
  icon: faCogs,
  pageDescription: "Allows for registration of custom parameters that can be used by capabilities of the system.",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.platformSystemParameterDetailView = {
  parent: "platformSystemParameterManagement",
  name: "platformSystemParameterDetailView",
  path: adminToolsPaths.platformSystemParameterDetailView,
  title: "Custom Parameter Details",
  linkText: "Custom Parameter Details",
  icon: faCogs,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.platformSettingsManagement = {
  parent: "admin",
  name: "platformSettingsManagement",
  path: adminToolsPaths.platformSettingsManagement,
  title: "Features Management",
  linkText: "Features Management",
  icon: faFlag,
  pageDescription: "Control specific features in the application that support this capability.",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.platformSettingsDetailView = {
  parent: "platformSettingsManagement",
  name: "platformSettingsDetailView",
  path: adminToolsPaths.platformSettingsDetailView,
  title: "Feature Details",
  linkText: "Feature Details",
  icon: faFolderCog,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.freeTrialCustomerWorkspaceManagement = {
  parent: "admin",
  name: "freeTrialCustomerWorkspaceManagement",
  path: adminToolsPaths.freeTrialCustomerWorkspaceManagement,
  title: "Free Trial Customer Workspace Management",
  linkText: "Free Trial Customer Workspace Management",
  icon: faUsers,
  pageDescription: "Opsera Customer Workspace Management allows you to configure and track all customer pipelines, tasks, and tools in one central location.",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.freeTrialCustomerWorkspaceDetailView = {
  parent: "freeTrialCustomerWorkspaceManagement",
  name: "freeTrialCustomerWorkspaceDetailView",
  path: adminToolsPaths.freeTrialCustomerWorkspaceDetailView,
  title: "Free Trial Customer Workspace Details",
  linkText: "Free Trial Customer Workspace Details",
  icon: faUsers,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.taskTemplateManagement = {
  parent: "admin",
  name: "taskTemplateManagement",
  path: adminToolsPaths.taskTemplateManagement,
  title: "Task Template Management",
  linkText: "Task Template Management",
  icon: faStream,
  pageDescription: `
      Create and manage personalized task templates according to your organization’s needs. 
    `,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.taskTemplateDetailView = {
  parent: "taskTemplateManagement",
  name: "taskTemplateDetailView",
  path: adminToolsPaths.taskTemplateDetailView,
  title: "Task emplate Details",
  linkText: "Task Template Details",
  icon: faStream,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.templateManagement = {
  parent: "admin",
  name: "templateManagement",
  path: adminToolsPaths.templateManagement,
  title: "Pipeline Template Management",
  linkText: "Pipeline Template Management",
  icon: faStream,
  pageDescription: `
      Create and manage personalized pipeline templates according to your organization’s needs. 
      Templates created will be stored in Pipeline Catalog
    `,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.templateDetailView = {
  parent: "templateManagement",
  name: "templateDetailView",
  path: adminToolsPaths.templateDetailView,
  title: "Template Details",
  linkText: "Template Details",
  icon: faStream,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.pipelineStorageManagement = {
  parent: "admin",
  name: "pipelineStorageManagement",
  path: adminToolsPaths.pipelineStorageManagement,
  title: "Pipeline Storage Management",
  linkText: "Pipeline Storage Management",
  icon: faFileArchive,
  pageDescription: "View and Manage records created during the use of Tasks and Pipelines",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.pipelineStorageDetailView = {
  parent: "pipelineStorageManagement",
  name: "pipelineStorageDetailView",
  path: adminToolsPaths.pipelineStorageDetailView,
  title: "Pipeline Storage Record Details",
  linkText: "Pipeline Storage Record Details",
  icon: faFileArchive,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.toolManagement = {
  parent: "admin",
  name: "toolManagement",
  path: adminToolsPaths.toolManagement,
  title: "Tool Management",
  linkText: "Tool Management",
  icon: faWrench,
  pageDescription: "Manage and onboard new Tools for Registry and Pipeline use by creating Tool Categories and Identifiers",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.toolCategoryDetailView = {
  parent: "toolManagement",
  name: "toolCategoryDetailView",
  path: adminToolsPaths.toolCategoryDetailView,
  title: "Tool Category Details",
  linkText: "Tool Category Details",
  icon: faWrench,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.toolIdentifierDetailView = {
  parent: "toolManagement",
  name: "toolIdentifierDetailView",
  path: adminToolsPaths.toolIdentifierDetailView,
  title: "Tool Identifier Details",
  linkText: "Tool Identifier Details",
  icon: faWrench,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.kpiManagement = {
  parent: "admin",
  name: "kpiManagement",
  path: adminToolsPaths.kpiManagement,
  title: "KPI Identifier Management",
  linkText: "KPI Identifier Management",
  icon: faFileInvoice,
  pageDescription: "Create and manage KPI Identifiers to add metrics to the Insights Marketplace",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.kpiDetailView = {
  parent: "kpiManagement",
  name: "kpiDetailView",
  path: adminToolsPaths.kpiManagement,
  title: "KPI Identifier Details",
  linkText: "KPI Identifier Details",
  icon: faFileInvoice,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.registeredUsersManagement = {
  parent: "admin",
  name: "registeredUsersManagement",
  path: adminToolsPaths.registeredUsersManagement,
  title: "Registered Users Management",
  linkText: "Registered Users Management",
  icon: faUserCircle,
  pageDescription: "Manage Opsera User settings, deactivate Opsera Users, and deploy ELK tool stacks for Opsera Users",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.registeredUsersDetailView = {
  parent: "registeredUsersManagement",
  name: "registeredUsersDetailView",
  path: adminToolsPaths.registeredUsersManagement,
  title: "Registered User Details",
  linkText: "Registered User Details",
  icon: faUserCircle,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.apiConnectionTest = {
  parent: "admin",
  name: "apiConnectionTest",
  path: adminToolsPaths.apiConnectionTest,
  title: "API Connection Test",
  linkText: "API Connection Test",
  icon: faLink,
  pageDescription: "Run an API connection test against the server using the Okta Authentication Token and Axios.js",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

// Ldap Organizations Administration
adminToolsTrails.ldapOrganizationManagement = {
  parent: "admin",
  name: "ldapOrganizationManagement",
  path: adminToolsPaths.ldapOrganizationManagement,
  title: "Organization Management",
  linkText: "Organization Management",
  icon: faSitemap,
  pageDescription: "Create and manage LDAP Organizations",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.ldapOrganizationDetailView = {
  parent: "ldapOrganizationManagement",
  name: "ldapOrganizationDetailView",
  path: adminToolsPaths.ldapOrganizationDetailView,
  title: "Organization Details",
  linkText: "Organization Details",
  icon: faSitemap,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

// Ldap Organization Account Administration
adminToolsTrails.ldapOrganizationAccountManagement = {
  parent: "admin",
  name: "ldapOrganizationAccountManagement",
  path: adminToolsPaths.ldapOrganizationAccountManagement,
  title: "Organization Account Management",
  linkText: "Organization Account Management",
  icon: faSitemap,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.ldapOrganizationAccountDetailView = {
  parent: "admin",
  name: "ldapOrganizationAccountDetailView",
  path: adminToolsPaths.ldapOrganizationDetailView,
  title: "Organization Account Details",
  linkText: "Organization Account Details",
  icon: faUsers,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.customerOnboarding = {
  parent: "admin",
  name: "customerOnboarding",
  path: adminToolsPaths.customerOnboarding,
  title: "Customer Onboarding",
  linkText: "Customer Onboarding",
  icon: faUserPlus,
  pageDescription: "Onboard a new customer to the Opsera Platform",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};

adminToolsTrails.remoteApplications = {
  parent: "admin",
  name: "remoteApplications",
  path: adminToolsPaths.remoteApplications,
  title: "Remote Application Management",
  linkText: "Remote Application Management",
  icon: faServer,
  pageDescription: "View/Manage version and telemetry information generation from remote applications.",
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
adminToolsTrails.remoteApplicationsDetailView = {
  parent: "remoteApplications",
  name: "remoteApplicationsDetailView",
  path: adminToolsPaths.remoteApplicationDetailView,
  title: "Remote Application Telemetry Record Details",
  linkText: "Remote Application Telemetry Record Details",
  icon: faServer,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
  ],
};
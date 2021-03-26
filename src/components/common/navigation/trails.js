import paths from "./paths";
import {
  faAnalytics,
  faBuilding, faChartBar, faClipboardList, faCogs, faDraftingCompass, faEdit, faFileInvoice, faHeartbeat, faLink,
  faSitemap, faStream, faTags, faTimes, faUser, faUserCircle, faUserFriends, faUserPlus, faWrench, faChartNetwork,
  faFlag, faEnvelope, faUserTag, faProjectDiagram, faTally, faTools, faUsers, faChartArea, faHome, faIdCard, faKey,
  faHexagon, faListAlt, faEye, faCodeBranch,
} from "@fortawesome/pro-light-svg-icons";

const breadcrumbs = {
  // Inventory
  toolRegistry: {parent: undefined, name: "toolRegistry", path: paths.toolRegistry, label: "Tool Registry", icon: faClipboardList},
  toolDetailView: {parent: "toolRegistry", name: "toolDetailView", path: paths.toolDetailView, label: "Tool Details", icon: faTools},
  toolProjectDetailView: {parent: "toolRegistry", name: "toolProjectDetailView", path: paths.toolProjectDetailView, label: "Tool Project Details", icon: faProjectDiagram},

  // Administration
  admin: {parent: undefined, name: "admin", path: paths.admin, label: "Administration Tools", icon: faTools},

  systemStatus: {parent: "admin", name: "systemStatus", path: paths.systemStatus, label: "System Status", icon: faHeartbeat},
  systemHealthCheck: {parent: "admin", name: "systemHealthCheck", path: paths.systemHealthCheck, label: "System Health Check", icon: faHeartbeat},
  deprecatedReports: {parent: "admin", name: "deprecatedReports", path: paths.deprecatedReports, label: "Reports", icon: faLink},
  reportsRegistration: {parent: "admin", name: "reportsRegistration", path: paths.reportsRegistration, label: "Reports Registration", icon: faChartBar},
  systemManagement: {parent: "admin", name: "systemManagement", path: paths.systemManagement, label: "System Management", icon: faEdit},

  siteNotificationManagement: {parent: "admin", name: "siteNotificationManagement", path: paths.siteNotificationManagement, label: "Site Notification Management", icon: faFlag},
  siteNotificationDetailView: {parent: "siteNotificationManagement", name: "siteNotificationDetailView", path: paths.siteNotificationDetailView, label: "Site Notification Detail View", icon: faFlag},
  siteNotificationManager: {parent: "admin", name: "siteNotificationManager", path: paths.siteNotificationManager, label: "Site Notification Manager", icon: faFlag},

  templateManagement: {parent: "admin", name: "templateManagement", path: paths.templateManagement, label: "Template Management", icon: faStream},
  templateDetailView: {parent: "templateManagement", name: "templateDetailView", path: paths.templateDetailView, label: "Template Details", icon: faStream},
  deleteTools: {parent: "admin", name: "deleteTools", path: paths.deleteTools, label: "Delete Tools", icon: faTimes},

  toolManagement: {parent: "admin", name: "toolManagement", path: paths.toolManagement, label: "Tool Management", icon: faWrench},
  toolCategoryDetailView: {parent: "toolManagement", name: "toolCategoryDetailView", path: paths.toolCategoryDetailView, label: "Tool Category Details", icon: faWrench},
  toolIdentifierDetailView: {parent: "toolManagement", name: "toolIdentifierDetailView", path: paths.toolIdentifierDetailView, label: "Tool Identifier Details", icon: faWrench},

  kpiManagement: {parent: "admin", name: "kpiManagement", path: paths.kpiManagement, label: "KPI Management", icon: faFileInvoice},
  kpiDetailView: {parent: "kpiManagement", name: "kpiDetailView", path: paths.kpiManagement, label: "KPI Configuration Details", icon: faFileInvoice},

  registeredUsersManagement: {parent: "admin", name: "registeredUsersManagement", path: paths.registeredUsersManagement, label: "Registered Users Management", icon: faUserCircle},
  registeredUsersDetailView: {parent: "registeredUsersManagement", name: "registeredUsersDetailView", path: paths.registeredUsersManagement, label: "Registered User Details", icon: faUserCircle},
  apiManagement: {parent: "admin", name: "apiManagement", path: paths.apiManagement, label: "API Management", icon: faLink},

  // Account settings
  accountSettings: {parent: undefined, name: "accountSettings", path: paths.accountSettings, label: "Account Settings", icon: faCogs},

  // Customer System Status
  customerSystemStatus: {parent: "accountSettings", name: "customerSystemStatus", path: paths.customerSystemStatus, label: "Customer System Status", icon: faHeartbeat},

  // LDAP Users Administration
  ldapUserManagement: {parent: "accountSettings", name: "ldapUserManagement", path: paths.ldapUserManagement, label: "User Management", icon: faUser},
  ldapUserDetailView: {parent: "ldapUserManagement", name: "ldapUserDetailView", path: paths.ldapUserDetailView, label: "User Details", icon: faUser},
  ldapUserDetailViewLimited: {parent: "accountSettings", name: "ldapUserDetailViewLimited", path: paths.ldapUserDetailView, label: "My User Details", icon: faUser},

  // LDAP Groups Administration
  ldapGroupManagement: {parent: "accountSettings", name: "ldapGroupManagement", path: paths.ldapGroupManagement, label: "Group Management", icon: faUserFriends},
  ldapGroupDetailView: {parent: "ldapGroupManagement", name: "ldapGroupDetailView", path: paths.ldapGroupDetailView, label: "Group Details", icon: faUserFriends},

  // Tag Management
  tagManagement: {parent: "accountSettings", name: "tagManagement", path: paths.tagManagement, label: "Tag Management", icon: faTags},
  tagDetailView: {parent: "tagManagement", name: "tagDetailView", path: paths.tagDetailView, label: "Tag Details", icon: faTags},

  // Organization Management
  organizationManagement: {parent: "accountSettings", name: "organizationManagement", path: paths.organizationManagement, label: "Organization Management", icon: faSitemap},
  organizationDetailView: {parent: "organizationManagement", name: "organizationDetailView", path: paths.organizationDetailView, label: "Organization Details", icon: faSitemap},

  // Ldap Organizations Administration
  ldapOrganizationManagement: {parent: "admin", name: "ldapOrganizationManagement", path: paths.ldapOrganizationManagement, label: "Organization Management", icon: faSitemap},
  ldapOrganizationDetailView: {parent: "ldapOrganizationManagement", name: "ldapOrganizationDetailView", path: paths.ldapOrganizationDetailView, label: "Organization Details", icon: faSitemap},

  ldapDepartmentManagement: {parent: "admin", name: "ldapDepartmentManagement", path: paths.ldapDepartmentManagement, label: "Department Management", icon: faBuilding},
  ldapDepartmentDetailView: {parent: "ldapDepartmentManagement", name: "ldapDepartmentDetailView", path: paths.ldapDepartmentDetailView, label: "Department Details", icon: faBuilding},

  // Ldap Organization Account Administration
  ldapOrganizationAccountManagement: {parent: "admin", name: "ldapOrganizationAccountManagement", path: paths.ldapOrganizationAccountManagement, label: "Organization Account Management", icon: faSitemap},
  ldapOrganizationAccountDetailView: {parent: "admin", name: "ldapOrganizationAccountDetailView", path: paths.ldapOrganizationDetailView, label: "Organization Account Details", icon: faUsers},

  customerOnboarding: {parent: "admin", name: "customerOnboarding", path: paths.customerOnboarding, label: "Customer Onboarding", icon: faUserPlus},

  //Pipelines
  pipelines: {parent: undefined, name: "pipelines", path: paths.pipelines, label: "Pipelines", icon: faDraftingCompass},
  catalog: {parent: "pipelines", name: "catalog", path: paths.pipelines, label: "Pipeline Catalog Library", icon: faHexagon},
  pipelineDetailView: {parent: "pipelines", name: "pipelineDetailView", path: paths.pipelineDetailView, label: "Pipeline Details", icon: faDraftingCompass},

  //Insights
  insights: {parent: undefined, name: "insights", path: paths.insights, label: "Insights", icon: faChartNetwork},
  analytics: {parent: "insights", name: "analytics", path: paths.analytics, label: "Analytics", icon: faAnalytics},
  dashboardDetails: {parent: "insights", name: "dashboardDetails", path: paths.dashboardDetails, label: "Dashboard Details", icon: faChartNetwork},
  marketplace: {parent: "insights", name: "marketplace", path: paths.marketplace, label: "Marketplace", icon: faChartArea},

  //Reports
  reports: {parent: undefined, name: "reports", path: paths.reports, label: "All Reports", icon: faAnalytics},

  toolReports: {parent: "reports", name: "toolReports", path: paths.toolReports, label: "Tool Reports", icon: faTools},
  toolsUsedInPipelineReport: {parent: "toolReports",name: "toolsUsedInPipelineReport", path: paths.toolsUsedInPipelineReport, label: "Tools Used In Pipelines", icon: faDraftingCompass},
  toolCountsReport: {parent: "toolReports",name: "toolCountsReport", path: paths.toolCountsReport, label: "Tool Counts", icon: faTally},
  detailedToolReport: {parent: "toolReports",name: "detailedToolReport", path: paths.detailedToolReport, label: "DetailedToolReport", icon: faFileInvoice},

  tagReports: {parent: "reports", name: "tagReports", path: paths.tagReports, label: "Tag Reports", icon: faTags},
  tagsUsedInPipelineReport: {parent: "tagReports", name: "tagsUsedInPipelineReport", path: paths.tagsUsedInPipelineReport, label: "Tags Used In Pipelines", icon: faTags},
  tagsUsedInToolsReport: {parent: "tagReports", name: "tagsUsedInToolsReport", path: paths.tagsUsedInToolsReport, label: "Tags Used In Tools", icon: faTools},
  tagsUsedInDashboardsReport: {parent: "tagReports", name: "tagsUsedInDashboardsReport", path: paths.tagsUsedInDashboardsReport, label: "Tags Used In Dashboards", icon: faTags},

  pipelineReports: {parent: "reports", name: "pipelineReports", path: paths.pipelineReports, label: "Pipeline Reports", icon: faDraftingCompass},

  //Analytics
  analyticsProfile: {parent: "accountSettings", name: "analyticsProfile", path: paths.analyticsProfile, label: "Analytics Profile", icon: faChartNetwork},
  // TODO: Rename to be more descriptive
  mapping: {parent: "accountSettings", name: "mapping", path: paths.mapping, label: "Data Mapping Management", icon: faProjectDiagram},
  projectTaggingDetailView: {parent : "mapping", name: "projectTaggingDetailView", path: paths.projectTaggingDetailView, label: "Project Mapping Details", icon: faProjectDiagram},
  userTaggingDetailView: {parent : "mapping", name: "userTaggingDetailView", path: paths.userTaggingDetailView, label: "User Mapping Details", icon: faUserTag},

  //Notifications
  notificationManagement : {parent: undefined, name: "notificationManagement", path: paths.notificationManagement, label: "Notification Management", icon: faEnvelope},
  notificationDetailView: {parent: "notificationManagement", name: "notificationDetailView", path: paths.notificationDetailView, label: "Notification Details", icon: faEnvelope},

  //GIT Tasks
  gitTasksManagement : {parent: undefined, name: "gitTasksManagement", path: paths.gitTasks, label: "Git Task Management", icon: faCodeBranch},
  gitTasksDetailView: {parent: "gitTasksManagement", name: "gitTasksDetailView", path: paths.gitTasksDetailView, label: "Git Task Details", icon: faCodeBranch},

  //General
  userProfile: {parent: undefined, name: "userProfile", path: paths.userProfile, label: "My User Profile", icon: faIdCard},
  myUserRecord: {parent: "userProfile", name: "myUserRecord", path: paths.userRecord, label: "My User Record", icon: faUser},
  subscriptions: {parent: "userProfile", name: "subscriptions", path: paths.userRecord, label: "My Subscriptions", icon: faEye},
  myAccessTokens: {parent: "userProfile", name: "myAccessTokens", path: paths.accessTokens, label: "Personal Access Tokens", icon: faKey},
  accessTokenDetailView: {parent: "myAccessTokens", name: "accessTokenDetailView", path: paths.userProfile, label: "Access Token Details", icon: faKey},
  home: {parent: undefined, name: "home", path: paths.home, label: "Welcome back", icon: faHome},
  logs: {parent: undefined, name: "logs", path: paths.logs, label: "Logs", icon: faListAlt},

  accessDenied: {parent: undefined, name: "accessDenied", path: undefined, label: "Access Denied", icon: faEnvelope},
};

export const getTrail = (breadcrumb) => {
  let trail = breadcrumbs[breadcrumb];
  let breadcrumbPath = [];
  let endPath = trail;

  while (trail.parent != null) {
    trail = breadcrumbs[trail.parent];
    breadcrumbPath.unshift(trail);
  }

  return {trail: breadcrumbPath, breadcrumb: endPath};
};

export const getBreadcrumb = (breadcrumb) => {
  return breadcrumbs[breadcrumb];
};

export const getParentBreadcrumb = (breadcrumb) => {
  let parentBreadcrumb = breadcrumbs[breadcrumb]?.parent;
  return parentBreadcrumb ? breadcrumbs[parentBreadcrumb] : null;
};
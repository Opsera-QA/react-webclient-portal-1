import paths from "./paths";
import {
  faAnalytics,
  faBuilding, faChartBar, faClipboardList, faCogs, faDraftingCompass, faEdit, faFileInvoice, faHeartbeat, faLink,
  faSitemap, faStream, faTags, faTimes, faUser, faUserCircle, faUserFriends, faUserPlus, faWrench, faChartNetwork,
  faFlag, faEnvelope, faUserTag, faProjectDiagram, faTally, faTools, faUsers, faChartArea, faHome, faIdCard, faKey,
  faHexagon, faListAlt, faEye, faFileArchive, faUserChart, faRadar, faServer, faHandshake, faFileCode, faTasks,
  faUserHardHat,
} from "@fortawesome/pro-light-svg-icons";

// TODO: Separate based on module in respective folders: Admin/Inventory/etc.
const breadcrumbs = {
  // Inventory
  toolRegistry: {
    parent: undefined,
    name: "toolRegistry",
    path: paths.toolRegistry,
    linkText: "Tool Registry",
    title: "Tool Registry",
    icon: faClipboardList
  },
  toolDetailView: {
    parent: "toolRegistry",
    name: "toolDetailView",
    path: paths.toolDetailView,
    linkText: "Tool Details",
    title: "Tool Details",
    icon: faTools
  },
  toolProjectDetailView: {
    parent: "toolRegistry",
    name: "toolProjectDetailView",
    path: paths.toolProjectDetailView,
    linkText: "Tool Project Details",
    title: "Tool Project Details",
    icon: faProjectDiagram
  },
  platform: {
    parent: undefined,
    name: "platform",
    path: paths.toolRegistry,
    linkText: "Platform",
    title: "Platform",
    icon: faServer
  },
  customParameters: {
    parent: undefined,
    name: "customParameters",
    path: paths.toolRegistry,
    linkText: "Parameters",
    title: "Parameters",
    icon: faHandshake
  },
  scripts: {
    parent: undefined,
    name: "scripts",
    path: paths.toolRegistry,
    linkText: "Scripts",
    title: "Scripts",
    icon: faFileCode
  },

  // Administration
  admin: {
    parent: undefined, 
    name: "admin", 
    path: paths.admin,
    linkText: "Administration Tools",
    title: "Administration Tools",
    icon: faTools
  },
  
  systemStatus: {
    parent: "admin", 
    name: "systemStatus", 
    path: paths.systemStatus,
    linkText: "System Status",
    title: "System Status",
    icon: faHeartbeat
  },
  systemHealthCheck: {
    parent: "admin", 
    name: "systemHealthCheck", 
    path: paths.systemHealthCheck,
    linkText: "System Health Check",
    title: "System Health Check",
    icon: faHeartbeat
  },
  deprecatedReports: {
    parent: "admin", 
    name: "deprecatedReports", 
    path: paths.deprecatedReports,
    linkText: "Reports",
    title: "Reports",
    icon: faLink
  },
  reportsRegistration: {
    parent: "admin", 
    name: "reportsRegistration", 
    path: paths.reportsRegistration,
    linkText: "Reports Registration",
    title: "Reports Registration",
    icon: faChartBar
  },
  systemManagement: {
    parent: "admin", 
    name: "systemManagement", 
    path: paths.systemManagement, 
    title: "System Management",
    linkText: "System Management",
    icon: faEdit
  },

  siteNotificationManagement: {
    parent: "admin",
    name: "siteNotificationManagement",
    path: paths.siteNotificationManagement,
    title: "Site Notification Management",
    linkText: "Site Notification Management",
    icon: faFlag
  },
  siteNotificationDetailView: {
    parent: "siteNotificationManagement",
    name: "siteNotificationDetailView",
    path: paths.siteNotificationDetailView,
    title: "Site Notification Detail View",
    linkText: "Site Notification Detail View",
    icon: faFlag
  },
  siteNotificationManager: {
    parent: "admin",
    name: "siteNotificationManager",
    path: paths.siteNotificationManager,
    title: "Site Notification Manager",
    linkText: "Site Notification Manager",
    icon: faFlag
  },

  templateManagement: {
    parent: "admin",
    name: "templateManagement",
    path: paths.templateManagement,
    title: "Template Management",
    linkText: "Template Management",
    icon: faStream
  },
  templateDetailView: {
    parent: "templateManagement",
    name: "templateDetailView",
    path: paths.templateDetailView,
    title: "Template Details",
    linkText: "Template Details",
    icon: faStream
  },

  pipelineStorageManagement: {
    parent: "admin",
    name: "pipelineStorageManagement",
    path: paths.pipelineStorageManagement,
    title: "Pipeline Storage Management",
    linkText: "Pipeline Storage Management",
    icon: faFileArchive
  },
  pipelineStorageDetailView: {
    parent: "pipelineStorageManagement",
    name: "pipelineStorageDetailView",
    path: paths.pipelineStorageDetailView,
    title: "Pipeline Storage Record Details",
    linkText: "Pipeline Storage Record Details",
    icon: faFileArchive
  },


  toolManagement: {
    parent: "admin",
    name: "toolManagement",
    path: paths.toolManagement,
    title: "Tool Management",
    linkText: "Tool Management",
    icon: faWrench
  },
  toolCategoryDetailView: {
    parent: "toolManagement",
    name: "toolCategoryDetailView",
    path: paths.toolCategoryDetailView,
    title: "Tool Category Details",
    linkText: "Tool Category Details",
    icon: faWrench
  },
  toolIdentifierDetailView: {
    parent: "toolManagement",
    name: "toolIdentifierDetailView",
    path: paths.toolIdentifierDetailView,
    title: "Tool Identifier Details",
    linkText: "Tool Identifier Details",
    icon: faWrench
  },

  kpiManagement: {
    parent: "admin",
    name: "kpiManagement",
    path: paths.kpiManagement,
    title: "KPI Management",
    linkText: "KPI Management",
    icon: faFileInvoice
  },
  kpiDetailView: {
    parent: "kpiManagement",
    name: "kpiDetailView",
    path: paths.kpiManagement,
    title: "KPI Configuration Details",
    linkText: "KPI Configuration Details",
    icon: faFileInvoice
  },

  registeredUsersManagement: {
    parent: "admin",
    name: "registeredUsersManagement",
    path: paths.registeredUsersManagement,
    title: "Registered Users Management",
    linkText: "Registered Users Management",
    icon: faUserCircle
  },
  registeredUsersDetailView: {
    parent: "registeredUsersManagement",
    name: "registeredUsersDetailView",
    path: paths.registeredUsersManagement,
    title: "Registered User Details",
    linkText: "Registered User Details",
    icon: faUserCircle
  },
  apiManagement: {
    parent: "admin",
    name: "apiManagement",
    path: paths.apiManagement,
    title: "API Management",
    linkText: "API Management",
    icon: faLink
  },

  // Account settings
  accountSettings: {
    parent: undefined,
    name: "accountSettings",
    path: paths.accountSettings,
    title: "Account Settings",
    linkText: "Account Settings",
    icon: faCogs
  },

  // Customer System Status
  customerSystemStatus: {
    parent: "accountSettings",
    name: "customerSystemStatus",
    path: paths.customerSystemStatus,
    title: "Platform Status",
    linkText: "Platform Status",
    icon: faHeartbeat
  },

  // Analytics Data Entry Management>
  analyticsDataEntryManagement: {
    parent: "accountSettings",
    name: "analyticsDataEntryManagement",
    path: paths.analyticsDataEntryManagement,
    title: "Analytics Data Entry Management",
    linkText: "Analytics Data Entry",
    icon: faUserChart
  },
  analyticsDataEntryDetailView: {
    parent: "analyticsDataEntryManagement",
    name: "analyticsDataEntryDetailView",
    path: paths.analyticsDataEntryDetailView,
    title: "Analytics Data Entry Details",
    linkText: "Analytics Data Entry Details",
    icon: faUserChart
  },

  // LDAP Users Administration
  ldapUserManagement: {
    parent: "accountSettings",
    name: "ldapUserManagement",
    path: paths.ldapUserManagement,
    title: "User Management",
    linkText: "Users",
    icon: faUser
  },
  ldapUserDetailView: {
    parent: "ldapUserManagement",
    name: "ldapUserDetailView",
    path: paths.ldapUserDetailView,
    title: "User Details",
    linkText: "User Details",
    icon: faUser
  },
  ldapUserDetailViewLimited: {
    parent: "accountSettings",
    name: "ldapUserDetailViewLimited",
    path: paths.ldapUserDetailView,
    title: "My User Details",
    linkText: "My User Details",
    icon: faUser
  },

  // User Management
  userManagement: {
    parent: "accountSettings",
    name: "userManagement",
    path: paths.userManagement,
    title: "User Management",
    linkText: "Users",
    icon: faUser
  },
  activeUserDetailView: {
    parent: "userManagement",
    name: "activeUserDetailView",
    path: paths.activeUserDetailView,
    title: "User Details",
    linkText: "User Details",
    icon: faUser
  },
  pendingUserDetailView: {
    parent: "userManagement",
    name: "pendingUserDetailView",
    path: paths.pendingUserDetailView,
    title: "Pending User Details",
    linkText: "Pending User Details",
    icon: faUserHardHat
  },

  // LDAP Groups Administration
  ldapGroupManagement: {
    parent: "accountSettings",
    name: "ldapGroupManagement",
    path: paths.ldapGroupManagement,
    title: "Group Management",
    linkText: "Groups",
    icon: faUserFriends
  },
  ldapGroupDetailView: {
    parent: "ldapGroupManagement",
    name: "ldapGroupDetailView",
    path: paths.ldapGroupDetailView,
    title: "Group Details",
    linkText: "Group Details",
    icon: faUserFriends
  },

  // Tag Management
  tagManagement: {
    parent: "accountSettings",
    name: "tagManagement",
    path: paths.tagManagement,
    title: "Tag Management",
    linkText: "Tags",
    icon: faTags
  },
  tagDetailView: {
    parent: "tagManagement",
    name: "tagDetailView",
    path: paths.tagDetailView,
    title: "Tag Details",
    linkText: "Tag Details",
    icon: faTags
  },

  // Organization Management
  organizationManagement: {
    parent: "accountSettings",
    name: "organizationManagement",
    path: paths.organizationManagement,
    title: "Organization Management",
    linkText: "Organizations",
    icon: faSitemap
  },
  organizationDetailView: {
    parent: "organizationManagement",
    name: "organizationDetailView",
    path: paths.organizationDetailView,
    title: "Organization Details",
    linkText: "Organization Details",
    icon: faSitemap
  },

  // Ldap Organizations Administration
  ldapOrganizationManagement: {
    parent: "admin",
    name: "ldapOrganizationManagement",
    path: paths.ldapOrganizationManagement,
    title: "Organization Management",
    linkText: "Organization Management",
    icon: faSitemap
  },
  ldapOrganizationDetailView: {
    parent: "ldapOrganizationManagement",
    name: "ldapOrganizationDetailView",
    path: paths.ldapOrganizationDetailView,
    title: "Organization Details",
    linkText: "Organization Details",
    icon: faSitemap
  },

  ldapDepartmentManagement: {
    parent: "admin",
    name: "ldapDepartmentManagement",
    path: paths.ldapDepartmentManagement,
    title: "Department Management",
    linkText: "Department Management",
    icon: faBuilding
  },
  ldapDepartmentDetailView: {
    parent: "ldapDepartmentManagement",
    name: "ldapDepartmentDetailView",
    path: paths.ldapDepartmentDetailView,
    title: "Department Details",
    linkText: "Department Details",
    icon: faBuilding
  },

  // Ldap Organization Account Administration
  ldapOrganizationAccountManagement: {
    parent: "admin",
    name: "ldapOrganizationAccountManagement",
    path: paths.ldapOrganizationAccountManagement,
    title: "Organization Account Management",
    linkText: "Organization Account Management",
    icon: faSitemap
  },
  ldapOrganizationAccountDetailView: {
    parent: "admin",
    name: "ldapOrganizationAccountDetailView",
    path: paths.ldapOrganizationDetailView,
    title: "Organization Account Details",
    linkText: "Organization Account Details",
    icon: faUsers
  },

  customerOnboarding: {
    parent: "admin",
    name: "customerOnboarding",
    path: paths.customerOnboarding,
    title: "Customer Onboarding",
    linkText: "Customer Onboarding",
    icon: faUserPlus
  },

  deleteTools: {
    parent: "admin",
    name: "deleteTools",
    path: paths.deleteTools,
    title: "Delete Tools",
    linkText: "Delete Tools",
    icon: faTimes
  },

  //Pipelines
  pipelines: {
    parent: undefined,
    name: "pipelines",
    path: paths.pipelines,
    title: "Pipelines",
    linkText: "Pipelines",
    icon: faDraftingCompass
  },
  catalog: {
    parent: "pipelines",
    name: "catalog",
    path: paths.pipelines,
    title: "Catalog",
    linkText: "Catalog",
    icon: faHexagon
  },
  pipelineDetailView: {
    parent: "pipelines",
    name: "pipelineDetailView",
    path: paths.pipelineDetailView,
    title: "Pipeline Details",
    linkText: "Pipeline Details",
    icon: faDraftingCompass
  },

  //Insights
  insights: {
    parent: undefined,
    name: "insights",
    path: paths.insights,
    title: "Insights",
    linkText: "Insights",
    icon: faChartNetwork
  },
  analytics: {
    parent: "insights",
    name: "analytics",
    path: paths.analytics,
    title: "Analytics",
    linkText: "Analytics",
    icon: faAnalytics
  },
  dashboardDetails: {
    parent: "insights",
    name: "dashboardDetails",
    path: paths.dashboardDetails,
    title: "Dashboard Details",
    linkText: "Dashboard Details",
    icon: faChartNetwork
  },
  marketplace: {
    parent: "insights",
    name: "marketplace",
    path: paths.marketplace,
    title: "Marketplace",
    linkText: "Marketplace",
    icon: faChartArea
  },
  insightsSummary: {
    parent: "insights",
    name: "synopsis",
    path: paths.insightsSummary,
    title: "Synopsis",
    linkText: "Synopsis",
    icon: faRadar
  },

  //Reports
  reports: {
    parent: undefined,
    name: "reports",
    path: paths.reports,
    title: "All Reports",
    linkText: "All Reports",
    icon: faAnalytics
  },

  toolReports: {
    parent: "reports",
    name: "toolReports",
    path: paths.toolReports,
    title: "Tool Reports",
    linkText: "Tool Reports",
    icon: faTools
  },
  toolsUsedInPipelineReport: {
    parent: "toolReports",
    name: "toolsUsedInPipelineReport",
    path: paths.toolsUsedInPipelineReport,
    title: "Tools Used In Pipelines",
    linkText: "Tools Used In Pipelines",
    icon: faDraftingCompass
  },
  toolCountsReport: {
    parent: "toolReports",
    name: "toolCountsReport",
    path: paths.toolCountsReport,
    title: "Tool Counts",
    linkText: "Tool Counts",
    icon: faTally
  },
  detailedToolReport: {
    parent: "toolReports",
    name: "detailedToolReport",
    path: paths.detailedToolReport,
    title: "Detailed Tool Report",
    linkText: "Detailed Tool Report",
    icon: faFileInvoice
  },

  tagReports: {
    parent: "reports",
    name: "tagReports",
    path: paths.tagReports,
    title: "Tag Reports",
    linkText: "Tag Reports",
    icon: faTags
  },
  tagsUsedInPipelineReport: {
    parent: "tagReports",
    name: "tagsUsedInPipelineReport",
    path: paths.tagsUsedInPipelineReport,
    title: "Tags Used In Pipelines",
    linkText: "Tags Used In Pipelines",
    icon: faTags
  },
  tagsUsedInToolsReport: {
    parent: "tagReports",
    name: "tagsUsedInToolsReport",
    path: paths.tagsUsedInToolsReport,
    title: "Tags Used In Tools",
    linkText: "Tags Used In Tools",
    icon: faTools
  },
  tagsUsedInDashboardsReport: {
    parent: "tagReports",
    name: "tagsUsedInDashboardsReport",
    path: paths.tagsUsedInDashboardsReport,
    title: "Tags Used In Dashboards",
    linkText: "Tags Used In Dashboards",
    icon: faTags
  },

  userReports: {
    parent: "reports",
    name: "userReports",
    path: paths.userReports,
    title: "User Reports",
    linkText: "User Reports",
    icon: faUser
  },
  groupMembershipReport: {
    parent: "userReports",
    name: "groupMembershipReport",
    path: paths.groupMembershipReport,
    title: "Group Membership",
    linkText: "Group Membership",
    icon: faUsers
  },
  pipelineOwnershipReport: {
    parent: "userReports",
    name: "pipelineOwnershipReport",
    path: paths.pipelineOwnershipReport,
    title: "Pipeline Ownership",
    linkText: "Pipeline Ownership",
    icon: faDraftingCompass
  },
  toolOwnershipReport: {
    parent: "userReports",
    name: "toolOwnershipReport",
    path: paths.toolOwnershipReport,
    title: "Tool Ownership",
    linkText: "Tool Ownership",
    icon: faTools
  },
  taskOwnershipReport: {
    parent: "userReports",
    name: "taskOwnershipReport",
    path: paths.taskOwnershipReport,
    title: "Task Ownership",
    linkText: "Task Ownership",
    icon: faTasks
  },
  consolidatedUserReport: {
    parent: "userReports",
    name: "consolidatedUserReport",
    path: paths.consolidatedUserReport,
    title: "User Report",
    linkText: "User Report",
    icon: faUser
  },

  pipelineReports: {
    parent: "reports",
    name: "pipelineReports",
    path: paths.pipelineReports,
    title: "Pipeline Reports",
    linkText: "Pipeline Reports",
    icon: faDraftingCompass
  },

  //Analytics
  analyticsProfile: {
    parent: "accountSettings",
    name: "analyticsProfile",
    path: paths.analyticsProfile,
    title: "Analytics Profile",
    linkText: "Analytics Profile",
    icon: faChartNetwork
  },
  dataMappingManagement: {
    parent: "accountSettings",
    name: "dataMappingManagement",
    path: paths.dataMappingManagement,
    title: "Data Mappings",
    linkText: "Data Mappings",
    icon: faProjectDiagram
  },
  projectTaggingDetailView: {
    parent : "dataMappingManagement",
    name: "projectTaggingDetailView",
    path: paths.projectTaggingDetailView,
    title: "Project Mapping Details",
    linkText: "Project Mapping Details",
    icon: faProjectDiagram
  },
  userTaggingDetailView: {
    parent : "dataMappingManagement",
    name: "userTaggingDetailView",
    path: paths.userTaggingDetailView,
    title: "User Mapping Details",
    linkText: "User Mapping Details",
    icon: faUserTag
  },

  //Notifications
  notificationManagement : {
    parent: undefined,
    name: "notificationManagement",
    path: paths.notificationManagement,
    title: "Notification Management",
    linkText: "Notification Management",
    icon: faEnvelope
  },
  notificationDetailView: {
    parent: "notificationManagement",
    name: "notificationDetailView",
    path: paths.notificationDetailView,
    title: "Notification Details",
    linkText: "Notification Details",
    icon: faEnvelope
  },

  //GIT Tasks
  gitTasksManagement : {
    parent: undefined,
    name: "gitTasksManagement",
    path: paths.gitTasks,
    title: "Opsera Task Management",
    linkText: "Opsera Task Management",
    icon: faTasks
  },
  gitTasksDetailView: {
    parent: "gitTasksManagement",
    name: "gitTasksDetailView",
    path: paths.gitTasksDetailView,
    title: "Task Details",
    linkText: "Task Details",
    icon: faTasks
  },

  //General
  userProfile: {
    parent: undefined,
    name: "userProfile",
    path: paths.userProfile,
    title: "My User Profile",
    linkText: "My User Profile",
    icon: faIdCard
  },
  myUserRecord: {
    parent: "userProfile",
    name: "myUserRecord",
    path: paths.userRecord,
    title: "My User Record",
    linkText: "My User Record",
    icon: faUser
  },
  subscriptions: {
    parent: "userProfile",
    name: "subscriptions",
    path: paths.userRecord,
    title: "My Subscriptions",
    linkText: "My Subscriptions",
    icon: faEye
  },
  myAccessTokens: {
    parent: "userProfile",
    name: "myAccessTokens",
    path: paths.accessTokens,
    title: "Personal Access Tokens",
    linkText: "Personal Access Tokens",
    icon: faKey
  },
  accessTokenDetailView: {
    parent: "myAccessTokens",
    name: "accessTokenDetailView",
    path: paths.userProfile,
    title: "Access Token Details",
    linkText: "Access Token Details",
    icon: faKey
  },
  home: {
    parent: undefined,
    name: "home",
    path: paths.home,
    title: "Welcome back",
    linkText: "Welcome back",
    icon: faHome
  },
  logs: {
    parent: undefined,
    name: "logs",
    path: paths.logs,
    title: "Logs",
    linkText: "Logs",
    icon: faListAlt
  },
  blueprint: {
    parent: undefined,
    name: "blueprint",
    path: paths.blueprint,
    title: "Pipeline Blueprint",
    linkText: "Pipeline Blueprint",
    icon: faListAlt
  },

  accessDenied: {
    parent: undefined,
    name: "accessDenied",
    path: undefined,
    title: "Access Denied",
    linkText: "Access Denied",
    icon: faEnvelope
  },
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
import paths from "./paths";
import {
  faAnalytics,
  faBuilding, faChartBar, faClipboardList, faCogs, faDraftingCompass, faEdit, faFileInvoice, faHeartbeat, faLink,
  faSitemap, faStream, faTags, faTimes, faUser, faUserCircle, faUserFriends, faUserPlus, faWrench, faChartNetwork,
  faFlag, faEnvelope, faUserTag, faProjectDiagram, faTally, faTools, faUsers, faChartArea, faHome, faIdCard, faKey,
  faHexagon, faListAlt, faRss, faFileArchive, faUserChart, faRadar, faServer, faHandshake, faFileCode, faTasks,
  faUserHardHat, faCircle, faQuestion, faBook, faMagnifyingGlass, faShieldKeyhole
} from "@fortawesome/pro-light-svg-icons";

// TODO: Separate based on module in respective folders: Admin/Inventory/etc.
const breadcrumbs = {
  frequentlyAskedQuestions: {
    parent: undefined,
    name: "frequentlyAskedQuestions",
    path: paths.frequentlyAskedQuestions,
    linkText: "Frequently Asked Questions",
    title: "Frequently Asked Questions",
    icon: faQuestion,
    isBeta: true,
  },
  helpDocumentation: {
    parent: undefined,
    name: "frequentlyAskedQuestions",
    path: paths.helpDocumentation,
    linkText: "Help Documentation",
    title: "Help Documentation",
    icon: faBook,
    isBeta: true,
  },

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

  customEnvironmentVariableManagement: {
    parent: "admin",
    name: "customEnvironmentVariableManagement",
    path: paths.customEnviromentVariableManagement,
    title: "Custom Environment Variable Management",
    linkText: "Custom Environment Variable Management",
    icon: faFileCode,
    pageDescription: "View React and Node Custom Environment Variables",
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
    icon: faFlag,
    pageDescription: "Create personalized Site Notifications by Type, including System Maintenance, Service Outage, Success, or Informational Message that will be displayed across the site for every User",
  },

  templateManagement: {
    parent: "admin",
    name: "templateManagement",
    path: paths.templateManagement,
    title: "Pipeline Template Management",
    linkText: "Pipeline Template Management",
    icon: faStream,
    pageDescription: `
      Create and manage personalized pipeline templates according to your organization’s needs. 
      Templates created will be stored in Pipeline Catalog
    `
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
    icon: faFileArchive,
    pageDescription: "View and Manage records created during the use of Tasks and Pipelines",
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
    icon: faWrench,
    pageDescription: "Manage and onboard new Tools for Registry and Pipeline use by creating Tool Categories and Identifiers",
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
    title: "KPI Identifier Management",
    linkText: "KPI Identifier Management",
    icon: faFileInvoice,
    pageDescription: "Create and manage KPI Identifiers to add metrics to the Insights Marketplace",
  },
  kpiDetailView: {
    parent: "kpiManagement",
    name: "kpiDetailView",
    path: paths.kpiManagement,
    title: "KPI Identifier Details",
    linkText: "KPI Identifier Details",
    icon: faFileInvoice
  },

  registeredUsersManagement: {
    parent: "admin",
    name: "registeredUsersManagement",
    path: paths.registeredUsersManagement,
    title: "Registered Users Management",
    linkText: "Registered Users Management",
    icon: faUserCircle,
    pageDescription: "Manage Opsera User settings, deactivate Opsera Users, and deploy ELK tool stacks for Opsera Users",
  },
  registeredUsersDetailView: {
    parent: "registeredUsersManagement",
    name: "registeredUsersDetailView",
    path: paths.registeredUsersManagement,
    title: "Registered User Details",
    linkText: "Registered User Details",
    icon: faUserCircle
  },

  apiConnectionTest: {
    parent: "admin",
    name: "apiConnectionTest",
    path: paths.apiConnectionTest,
    title: "API Connection Test",
    linkText: "API Connection Test",
    icon: faLink,
    pageDescription: "Run an API connection test against the server using the Okta Authentication Token and Axios.js",
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
    icon: faUserChart,
    pageDescription: "Manage analytics data manually and see it reflected in corresponding dashboard KPIs for specific charts.",
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
    icon: faUser,
    pageDescription: `
      Manage existing Users and register new Users for this account. 
      The New User form allows owners to create new User accounts with targeted Group access. 
      Users will receive an invitation email upon completion of the form.
    `,
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
    icon: faUserFriends,
    pageDescription: "Manage Groups and their Membership"
  },
  ldapGroupDetailView: {
    parent: "ldapGroupManagement",
    name: "ldapGroupDetailView",
    path: paths.ldapGroupDetailView,
    title: "Group Details",
    linkText: "Group Details",
    icon: faUserFriends
  },

  // LDAP Site Roles Administration
  ldapSiteRolesManagement: {
    parent: "accountSettings",
    name: "ldapSiteRolesManagement",
    path: paths.ldapSiteRoleManagement,
    title: "Site Roles Management",
    linkText: "Site Roles",
    icon: faServer,
    pageDescription: "Manage Site Roles in the follow levels: Administrators, Power Users, and Users."
  },
  ldapSiteRoleDetailView: {
    parent: "ldapSiteRolesManagement",
    name: "ldapSiteRoleDetailView",
    path: paths.ldapSiteRoleDetailView,
    title: "Site Role Details",
    linkText: "Site Role Details",
    icon: faServer
  },

  // LDAP Departments Administration
  ldapDepartmentManagement: {
    parent: "settings",
    name: "ldapDepartmentManagement",
    path: paths.ldapDepartmentManagement,
    title: "Departments",
    linkText: "Departments",
    icon: faBuilding,
    pageDescription: "Manage Departments and their Membership."
  },
  ldapDepartmentDetailView: {
    parent: "ldapDepartmentManagement",
    name: "ldapDepartmentDetailView",
    path: paths.ldapDepartmentDetailView,
    title: "Department Details",
    linkText: "Department Details",
    icon: faBuilding
  },

  // Tag Management
  tagManagement: {
    parent: "accountSettings",
    name: "tagManagement",
    path: paths.tagManagement,
    title: "Tag Management",
    linkText: "Tags",
    icon: faTags,
    pageDescription: "Manage Tags and view their usage in Tools, Pipelines, and Dashboards.",
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
    icon: faSitemap,
    pageDescription: "Manage Organizations"
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
    icon: faSitemap,
    pageDescription: "Create and manage LDAP Organizations"
  },
  ldapOrganizationDetailView: {
    parent: "ldapOrganizationManagement",
    name: "ldapOrganizationDetailView",
    path: paths.ldapOrganizationDetailView,
    title: "Organization Details",
    linkText: "Organization Details",
    icon: faSitemap
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
    icon: faUserPlus,
    pageDescription: "Onboard a new customer to the Opsera Platform",
  },

  deleteTools: {
    parent: "admin",
    name: "deleteTools",
    path: paths.deleteTools,
    title: "Delete Tools",
    linkText: "Delete Tools",
    icon: faTimes,
    pageDescription: `
      Choose a registered application, view the active tools, and then delete them from the application.
      This will perform a complete end to end removal of all instances related to an application.
    `,
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
  lookup: {
    parent: "insights",
    name: "lookup",
    path: paths.lookup,
    title: "Salesforce Lookup",
    linkText: "Salesforce Lookup",
    icon: faMagnifyingGlass,
    isBeta: true,
  },
  marketplace: {
    parent: "insights",
    name: "marketplace",
    path: paths.marketplace,
    title: "Marketplace",
    linkText: "Marketplace",
    icon: faChartArea
  },
  release360: {
    parent: "insights",
    name: "release360",
    path: paths.release360,
    title: "Release 360",
    linkText: "Release 360",
    icon: faCircle
  },
  insightsSummary: {
    parent: "insights",
    name: "synopsis",
    path: paths.insightsSummary,
    title: "Synopsis",
    linkText: "Synopsis",
    icon: faRadar,
  },
  insightsConnectedAssets: {
    parent: "insights",
    name: "connectedAssets",
    path: paths.insightsConnectedAssets,
    title: "Connected Assets",
    linkText: "Connected Assets",
    icon: faLink,
    isBeta: true,
  },
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
  sonarReports: {
    parent: undefined,
    name: "sonarReports",
    path: paths.sonarReports,
    title: "Sonar Reports",
    linkText: "Sonar Reports",
    icon: faAnalytics
  },
  coverityReports: {
    parent: undefined,
    name: "coverityReports",
    path: paths.coverityReports,
    title: "Coverity Reports",
    linkText: "Coverity Reports",
    icon: faAnalytics
  },
  toolsUsedInPipelineReport: {
    parent: "toolReports",
    name: "toolsUsedInPipelineReport",
    path: paths.toolsUsedInPipelineReport,
    title: "Pipelines by Tool",
    linkText: "Pipelines by Tool",
    icon: faAnalytics,
    pageDescription: "View Pipelines based on the selected Tools.",
  },
  toolCountsReport: {
    parent: "toolReports",
    name: "toolCountsReport",
    path: paths.toolCountsReport,
    title: "Tool Counts",
    linkText: "Tool Counts",
    icon: faTally,
    pageDescription: "View tool usage counts.",
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
    title: "Pipelines by Tags",
    linkText: "Pipelines by Tags",
    icon: faDraftingCompass,
    pageDescription: "View Pipelines based on the selected Tags.",
  },
  tagsUsedInToolsReport: {
    parent: "tagReports",
    name: "tagsUsedInToolsReport",
    path: paths.tagsUsedInToolsReport,
    title: "Tools by Tags",
    linkText: "Tools by Tags",
    icon: faTools,
    pageDescription: "View Tools based on the selected Tags.",
  },
  tagsUsedInDashboardsReport: {
    parent: "tagReports",
    name: "tagsUsedInDashboardsReport",
    path: paths.tagsUsedInDashboardsReport,
    title: "Dashboards by Tags",
    linkText: "Dashboards by Tags",
    icon: faChartNetwork,
    pageDescription: "View Dashboards based on the selected Tags.",
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
    icon: faUsers,
    pageDescription: "View the Group Membership of a selected User."
  },
  pipelineOwnershipReport: {
    parent: "userReports",
    name: "pipelineOwnershipReport",
    path: paths.pipelineOwnershipReport,
    title: "Pipelines by Owner",
    linkText: "Pipelines by Owner",
    icon: faDraftingCompass,
    pageDescription: "Find all Pipelines owned by the selected User."
  },
  toolOwnershipReport: {
    parent: "userReports",
    name: "toolOwnershipReport",
    path: paths.toolOwnershipReport,
    title: "Tools by Owner",
    linkText: "Tools by Owner",
    icon: faTools,
    pageDescription: "Find all Tools owned by the selected user."
  },
  taskOwnershipReport: {
    parent: "userReports",
    name: "taskOwnershipReport",
    path: paths.taskOwnershipReport,
    title: "Tasks by Owner",
    linkText: "Tasks by Owner",
    icon: faTasks,
    pageDescription: "Find all Tasks owned by the selected user."
  },
  consolidatedUserReport: {
    parent: "userReports",
    name: "consolidatedUserReport",
    path: paths.consolidatedUserReport,
    title: "User Report",
    linkText: "User Report",
    icon: faUser,
    pageDescription: "View the consolidated report for selected user."
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
    icon: faChartNetwork,
    pageDescription: "Manage Opsera Analytics Engine settings.",
  },
  dataMappingManagement: {
    parent: "accountSettings",
    name: "dataMappingManagement",
    path: paths.dataMappingManagement,
    title: "Data Mappings",
    linkText: "Data Mappings",
    icon: faProjectDiagram,
    pageDescription: "Apply and connect Tags to incoming external data with Opsera.",
  },
  projectTaggingDetailView: {
    parent : "dataMappingManagement",
    name: "projectTaggingDetailView",
    path: paths.projectTaggingDetailView,
    title: "Project Mapping Details",
    linkText: "Project Mapping Details",
    icon: faProjectDiagram
  },
  pipelineDataMappingDetailView: {
    parent : "dataMappingManagement",
    name: "pipelineDataMappingDetailView",
    path: paths.pipelineDataMappingDetailView,
    title: "Pipeline Data Mapping Details",
    linkText: "Pipeline Data Mapping Details",
    icon: faDraftingCompass
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
  notificationActivityLogs : {
    parent: undefined,
    name: "notificationActivityLogs",
    path: paths.notificationActivityLogs,
    title: "Notification Policy Activity Logs",
    linkText: "Notification Policy Activity Logs",
    icon: faClipboardList
  },
  notificationDetailView: {
    parent: "notificationManagement",
    name: "notificationDetailView",
    path: paths.notificationDetailView,
    title: "Notification Details",
    linkText: "Notification Details",
    icon: faEnvelope
  },

  // Tasks
  taskManagement : {
    parent: undefined,
    name: "taskManagement",
    path: paths.taskManagement,
    title: "Opsera Task Management",
    linkText: "Opsera Task Management",
    icon: faTasks,
    pageDescription: "Create and Manage Opsera Related Tasks.",
  },
  taskActivityLogs : {
    parent: undefined,
    name: "taskManagement",
    path: paths.taskActivityLogs,
    title: "Opsera Task Activity Logs",
    linkText: "Opsera Task Activity Logs",
    icon: faClipboardList
  },
  taskManagementDetailView: {
    parent: "taskManagement",
    name: "taskManagementDetailView",
    path: paths.taskManagementDetailView,
    title: "Opsera Task Details",
    linkText: "Opsera Task Details",
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
    icon: faUser,
    pageDescription: `
      Review and manage your user profile information as well as platform settings from this page. 
      Please note, profile details are stored in your identity provider, so some changes my not be possible from this portal at this time.
    `
  },
  subscriptions: {
    parent: "userProfile",
    name: "subscriptions",
    path: paths.userRecord,
    title: "My Subscriptions",
    linkText: "My Subscriptions",
    icon: faRss
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
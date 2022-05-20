const paths = {};

// TODO: Rewrite these to be functions
paths.userProfile = "user/profile";
paths.userRecord = "user/myUserRecord";
paths.accessTokens = "user/accessTokens";
paths.home = "";
paths.logs = "logs";
paths.blueprint = "blueprint";

paths.frequentlyAskedQuestions = "faq";
paths.helpDocumentation = "help-documentation";

// Admin Paths
paths.admin = "admin";

paths.systemStatus = paths.admin + "/system-status";
paths.systemHealthCheck = paths.admin + "/health";

paths.deprecatedReports = paths.admin + "/reports";
paths.reportsRegistration = paths.admin + "/analytics/reports-registration";
paths.systemManagement = paths.admin + "/manage-systems";

paths.templateManagement = paths.admin + "/templates";
paths.templateDetailView = paths.templateManagement + "/details/";

paths.pipelineStorageManagement = paths.admin + "/pipeline-storage";
paths.pipelineStorageDetailView = paths.pipelineStorageManagement + "/details/";

paths.siteNotificationManagement = paths.admin + "/site-notifications/table";
paths.siteNotificationManager = paths.admin + "/site-notifications";
paths.siteNotificationDetailView = paths.siteNotificationManagement + "/details/";

paths.toolManagement = paths.admin + "/tools/categories";
paths.toolCategoryDetailView = paths.toolManagement + "/types/details/";
paths.toolIdentifierDetailView = paths.toolManagement + "/identifiers/details/";

paths.ldapOrganizationManagement = paths.admin + "/organizations";
paths.ldapOrganizationDetailView = paths.admin + "/organizations";

paths.ldapOrganizationAccountManagement = paths.admin + "/organization-accounts";
paths.ldapOrganizationDetailView = paths.admin + "/organization-accounts";

paths.customerOnboarding = "admin/accounts/create";

paths.customEnviromentVariableManagement = paths.admin + "/custom-environment-variables";
paths.registeredUsersManagement = paths.admin + "/registered-users";

paths.apiConnectionTest = paths.admin + "/demo/api";

paths.kpiManagement = paths.admin + "/kpis";
paths.kpiDetailView = paths.kpiManagement;

// Pipelines Paths
paths.pipelines = "workflow";
paths.catalog = paths.pipelines + "/catalog";
paths.pipelineDetailView = paths.pipelines + "/details";

// Insights Paths
paths.insights = "insights/dashboards";
paths.dashboardDetails = paths.insights;
paths.dashboardDetails = "analytics";
paths.lookup = "/lookup";
paths.marketplace = paths.insights + "/marketplace";
paths.release360 = paths.insights + "/release360";
paths.insightsSummary = "insights/summary";
paths.connectedAssets = "insights/insightsConnectedAssets";

// Settings Paths
paths.accountSettings = "settings";
paths.ldapUserManagement = paths.accountSettings + "/users";
paths.ldapUserDetailView = paths.ldapUserManagement;
paths.userManagement = paths.accountSettings + "/user-management";
paths.activeUserDetailView = paths.userManagement;
paths.pendingUserDetailView = paths.userManagement;
paths.ldapGroupManagement = paths.accountSettings + "/groups";
paths.ldapGroupDetailView = paths.ldapGroupManagement;
paths.ldapSiteRoleManagement = paths.accountSettings + "/site-roles";
paths.ldapSiteRoleDetailView = paths.ldapSiteRoleManagement;
paths.ldapDepartmentManagement = paths.accountSettings + "/departments";
paths.ldapDepartmentDetailView = paths.ldapDepartmentManagement;
paths.tagManagement = paths.accountSettings + "/tags";
paths.deleteTools = paths.accountSettings + "/delete/";
paths.tagDetailView = paths.tagManagement + "/details/";
paths.organizationManagement = paths.accountSettings + "/organizations";
paths.organizationDetailView = paths.organizationManagement + "/details/";
paths.customerSystemStatus = paths.accountSettings + "/customer-system-status";
paths.analyticsProfile = paths.accountSettings + "/analytics-profile";
paths.analyticsDataEntryManagement = paths.accountSettings + "/analytics-data-entries";
paths.analyticsDataEntryDetailView = paths.analyticsDataEntryManagement + "/analytics-data-entries/details/";
paths.dataMappingManagement = paths.accountSettings + "/data_mapping";
paths.projectTaggingDetailView = paths.dataMappingManagement + "/projects/details/";
paths.pipelineDataMappingDetailView = paths.dataMappingManagement + "/pipeline/details/";
paths.userTaggingDetailView = paths.dataMappingManagement + "/users/details/";

//Reports
paths.reports = "reports";
paths.toolReports = paths.reports + "/tools";
paths.toolsUsedInPipelineReport = paths.toolReports + "/tools-used-in-pipeline";
paths.toolCountsReport = paths.toolReports + "/tool-counts";
paths.detailedToolReport = paths.toolReports + "/detailed-tool-report";
paths.tagReports = paths.reports + "/tags";
paths.tagsUsedInPipelineReport = paths.tagReports + "/tags-used-in-pipeline";
paths.tagsUsedInToolsReport = paths.tagReports + "/tags-used-in-tools";
paths.tagsUsedInDashboardsReport = paths.tagReports + "/tags-used-in-dashboards";
paths.userReports = paths.reports + "/users";
paths.groupMembershipReport = paths.userReports + "/group-membership";
paths.pipelineOwnershipReport = paths.userReports + "/pipeline-ownership";
paths.toolOwnershipReport = paths.userReports + "/tool-ownership";
paths.taskOwnershipReport = paths.userReports + "/task-ownership";
paths.consolidatedUserReport = paths.userReports + "/user-report";
paths.pipelineReports = paths.reports + "/pipelines";

//Inventory (Tool Registry) paths
paths.toolRegistry = "inventory/tools";
paths.toolDetailView = paths.toolRegistry + "/details";

//Notifications
paths.notificationManagement = "notifications";
paths.notificationActivityLogs = "notifications/activity";
paths.notificationDetailView = paths.notificationDetailView + "/details";

//Tasks
paths.taskManagement = "task";
paths.taskActivityLogs = "task/activity";
paths.taskManagementDetailView = paths.tasks + "/details";

export default paths;
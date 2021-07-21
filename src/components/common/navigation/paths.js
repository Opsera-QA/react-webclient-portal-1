const paths = {};

// TODO: Rewrite these to be functions
paths.userProfile = "user/profile";
paths.userRecord = "user/myUserRecord";
paths.accessTokens = "user/accessTokens";
paths.home = "";
paths.logs = "logs";
paths.blueprint = "blueprint";

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

paths.toolManagement = paths.admin + "/tools";
paths.toolCategoryDetailView = paths.toolManagement + "/types/details/";
paths.toolIdentifierDetailView = paths.toolManagement + "/identifiers/details/";

paths.ldapOrganizationManagement = paths.admin + "/organizations";
paths.ldapOrganizationDetailView = paths.admin + "/organizations";

paths.ldapDepartmentManagement = paths.admin + "/departments";
paths.ldapDepartmentDetailView = paths.admin + "/departments";

paths.ldapOrganizationAccountManagement = paths.admin + "/organization-accounts";
paths.ldapOrganizationDetailView = paths.admin + "/organization-accounts";

paths.customerOnboarding = "accounts/create";

paths.registeredUsersManagement = paths.admin + "/registered-users";

paths.apiManagement = paths.admin + "/demo/api";

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
paths.marketplace = paths.insights + "/marketplace";
paths.insightsSummary = "insights/summary";

// Settings Paths
paths.accountSettings = "settings";
paths.ldapUserManagement = paths.accountSettings + "/users";
paths.ldapUserDetailView = paths.ldapUserManagement;
paths.ldapGroupManagement = paths.accountSettings + "/groups";
paths.ldapGroupDetailView = paths.ldapUserManagement;
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
paths.notificationDetailView = paths.notificationDetailView + "/details";

//GIT Tasks
paths.gitTasks = "git";
paths.gitTasksDetailView = paths.gitTasksDetailView + "/details";

export default paths;
const paths = {};

// Admin Paths
paths.admin = "admin";

paths.systemStatus = paths.admin + "/system-status";
paths.systemHealthCheck = paths.admin + "/health";

paths.deprecatedReports = paths.admin + "/reports";
paths.reportsRegistration = paths.admin + "/analytics/reports-registration";
paths.systemManagement = paths.admin + "/manage-systems";

paths.templateManagement = paths.admin + "/templates";
paths.templateDetailView = paths.templateManagement + "/details/";

paths.siteNotificationManagement = paths.admin + "/site-notifications/table";
paths.siteNotificationManager = paths.admin + "/site-notifications";
paths.siteNotificationDetailView = paths.siteNotificationManagement + "/details/";

paths.toolManagement = paths.admin + "/tools";
paths.deleteTools = paths.admin + "/delete/";
paths.toolTypeDetailView = paths.toolManagement + "/types/details/";
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
paths.pipelines = "workflow"
paths.pipelineDetailView = paths.pipelines + "/details"

// Insights Paths
paths.insights = "insights/dashboards";
paths.dashboardViewer = paths.insights;

// Settings Paths
paths.accountSettings = "settings";
paths.ldapUserManagement = paths.accountSettings + "/users";
paths.ldapUserDetailView = paths.ldapUserManagement;
paths.ldapGroupManagement = paths.accountSettings + "/groups";
paths.ldapGroupDetailView = paths.ldapUserManagement;
paths.tagManagement = paths.accountSettings + "/tags";
paths.tagDetailView = paths.tagManagement + "/details/";
paths.customerSystemStatus = paths.accountSettings + "/customer-system-status";
paths.analyticsProfile = paths.accountSettings + "/analytics-profile";
paths.mapping = paths.accountSettings + "/data_mapping"
paths.projectTaggingDetailView = paths.mapping + "/projects/details/"
paths.userTaggingDetailView = paths.mapping + "/users/details/"

//Reports
paths.reports = "reports";
paths.toolReports = paths.reports + "/registry";
paths.toolsUsedInPipelineReport = paths.toolReports + "/tools-used-in-pipeline";
paths.toolCountsReport = paths.toolReports + "/tool-counts";
paths.tagReports = paths.reports + "/tags";
paths.tagsUsedInPipelineReport = paths.tagReports + "/tags-used-in-pipeline";
paths.tagsUsedInToolsReport = paths.tagReports + "/tags-used-in-tools";
paths.pipelineReports = paths.reports + "/pipelines";

//Inventory (Tool Registry) paths
paths.toolRegistry = "inventory/tools";
paths.toolDetailView = paths.toolRegistry + "/details";

//Notifications
paths.notifications = "notifications";
paths.notificationDetailView = paths.notificationDetailView + "/details";

export default paths;
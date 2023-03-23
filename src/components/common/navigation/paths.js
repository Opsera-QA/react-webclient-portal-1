const paths = {};

paths.home = "";
paths.logs = "logs";
paths.blueprint = "blueprint";

paths.frequentlyAskedQuestions = "faq";
paths.helpDocumentation = "help-documentation";

// Insights Paths
paths.insights = "insights/dashboards";
paths.dashboardDetails = paths.insights;
paths.dashboardDetails = "analytics";
paths.lookup = "/lookup";
paths.marketplace = paths.insights + "/marketplace";
paths.release360 = paths.insights + "/release360";
paths.insightsSummary = "insights/summary";
paths.connectedAssets = "insights/insightsConnectedAssets";
paths.gitCustodian = "insights/insightsGitCustodian";

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
paths.tagsUsedInProjectsReport = paths.tagReports + "/tags-used-in-projects";
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
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
paths.salesforce = "/salesforce";
paths.lookup = "/salesforce/lookup";
paths.dependencyAnalyser = "/salesforce/dependency-analyser";
paths.marketplace = paths.insights + "/marketplace";
paths.release360 = paths.insights + "/release360";
paths.insightsSummary = "insights/summary";
paths.connectedAssets = "insights/insightsConnectedAssets";
paths.gitCustodian = "insights/insightsGitCustodian";

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
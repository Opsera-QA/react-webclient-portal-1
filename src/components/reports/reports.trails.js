import {
  faAnalytics,
  faChartNetwork,
  faDraftingCompass,
  faFileInvoice,
  faTags,
  faTally,
  faTasks,
  faTools,
  faUser,
  faUsers,
} from "@fortawesome/pro-light-svg-icons";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import {reportsPaths} from "components/reports/reports.paths";

export const reportsTrails = {};

reportsTrails.reports = {
  parent: undefined,
  name: "reports",
  path: reportsPaths.reports,
  title: "All Reports",
  linkText: "All Reports",
  icon: faAnalytics,
  allowedRoles: [
    SiteRoleHelper.SITE_ROLES.OPSERA_ADMINISTRATOR,
    SiteRoleHelper.SITE_ROLES.ADMINISTRATOR,
    SiteRoleHelper.SITE_ROLES.POWER_USER,
    SiteRoleHelper.SITE_ROLES.SAAS_USER,
    SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER,
    SiteRoleHelper.SITE_ROLES.AUDITOR,
  ],

};
reportsTrails.toolReports = {
  parent: "reports",
  name: "toolReports",
  path: reportsPaths.toolReports,
  title: "Tool Reports",
  linkText: "Tool Reports",
  icon: faTools
};
reportsTrails.sonarReports = {
  parent: undefined,
  name: "sonarReports",
  path: reportsPaths.sonarReports,
  title: "Sonar Reports",
  linkText: "Sonar Reports",
  icon: faAnalytics
};
reportsTrails.coverityReports = {
  parent: undefined,
  name: "coverityReports",
  path: reportsPaths.coverityReports,
  title: "Coverity Reports",
  linkText: "Coverity Reports",
  icon: faAnalytics
};
reportsTrails.aquasecReports = {
  parent: undefined,
  name: "aquasecReports",
  path: reportsPaths.aquasecReports,
  title: "Aquasec Reports",
  linkText: "Aquasec Reports",
  icon: faAnalytics
};
reportsTrails.gitscraperReports = {
  parent: undefined,
  name: "gitscraperReports",
  path: reportsPaths.gitscraperReports,
  title: "Git Custodian Reports",
  linkText: "Git Custodian Reports",
  icon: faAnalytics
};
reportsTrails.toolsUsedInPipelineReport = {
  parent: "toolReports",
  name: "toolsUsedInPipelineReport",
  path: reportsPaths.toolsUsedInPipelineReport,
  title: "Pipelines by Tool",
  linkText: "Pipelines by Tool",
  icon: faAnalytics,
  pageDescription: "View Pipelines based on the selected Tools.",
};
reportsTrails.toolCountsReport = {
  parent: "toolReports",
  name: "toolCountsReport",
  path: reportsPaths.toolCountsReport,
  title: "Tool Counts",
  linkText: "Tool Counts",
  icon: faTally,
  pageDescription: "View tool usage counts.",
};
reportsTrails.detailedToolReport = {
  parent: "toolReports",
  name: "detailedToolReport",
  path: reportsPaths.detailedToolReport,
  title: "Detailed Tool Report",
  linkText: "Detailed Tool Report",
  icon: faFileInvoice
};

reportsTrails.tagReports = {
  parent: "reports",
  name: "tagReports",
  path: reportsPaths.tagReports,
  title: "Tag Reports",
  linkText: "Tag Reports",
  icon: faTags
};
reportsTrails.tagsUsedInPipelineReport = {
  parent: "tagReports",
  name: "tagsUsedInPipelineReport",
  path: reportsPaths.tagsUsedInPipelineReport,
  title: "Pipelines by Tags",
  linkText: "Pipelines by Tags",
  icon: faDraftingCompass,
  pageDescription: "View Pipelines based on the selected Tags.",
};
reportsTrails.tagsUsedInToolsReport = {
  parent: "tagReports",
  name: "tagsUsedInToolsReport",
  path: reportsPaths.tagsUsedInToolsReport,
  title: "Tools by Tags",
  linkText: "Tools by Tags",
  icon: faTools,
  pageDescription: "View Tools based on the selected Tags.",
};
reportsTrails.tagsUsedInDashboardsReport = {
  parent: "tagReports",
  name: "tagsUsedInDashboardsReport",
  path: reportsPaths.tagsUsedInDashboardsReport,
  title: "Dashboards by Tags",
  linkText: "Dashboards by Tags",
  icon: faChartNetwork,
  pageDescription: "View Dashboards based on the selected Tags.",
};
reportsTrails.tagsUsedInProjectsReport = {
  parent: "tagReports",
  name: "tagsUsedInProjectsReport",
  path: reportsPaths.tagsUsedInProjectsReport,
  title: "Projects by Tags",
  linkText: "Projects by Tags",
  icon: faTags,
  pageDescription: "View Projects based on the selected Tags.",
};

reportsTrails.userReports = {
  parent: "reports",
  name: "userReports",
  path: reportsPaths.userReports,
  title: "User Reports",
  linkText: "User Reports",
  icon: faUser
};
reportsTrails.groupMembershipReport = {
  parent: "userReports",
  name: "groupMembershipReport",
  path: reportsPaths.groupMembershipReport,
  title: "Group Membership",
  linkText: "Group Membership",
  icon: faUsers,
  pageDescription: "View the Group Membership of a selected User."
};
reportsTrails.pipelineOwnershipReport = {
  parent: "userReports",
  name: "pipelineOwnershipReport",
  path: reportsPaths.pipelineOwnershipReport,
  title: "Pipelines by Owner",
  linkText: "Pipelines by Owner",
  icon: faDraftingCompass,
  pageDescription: "Find all Pipelines owned by the selected User."
};
reportsTrails.toolOwnershipReport = {
  parent: "userReports",
  name: "toolOwnershipReport",
  path: reportsPaths.toolOwnershipReport,
  title: "Tools by Owner",
  linkText: "Tools by Owner",
  icon: faTools,
  pageDescription: "Find all Tools owned by the selected user."
};
reportsTrails.taskOwnershipReport = {
  parent: "userReports",
  name: "taskOwnershipReport",
  path: reportsPaths.taskOwnershipReport,
  title: "Tasks by Owner",
  linkText: "Tasks by Owner",
  icon: faTasks,
  pageDescription: "Find all Tasks owned by the selected user."
};
reportsTrails.consolidatedUserReport = {
  parent: "userReports",
  name: "consolidatedUserReport",
  path: reportsPaths.consolidatedUserReport,
  title: "User Report",
  linkText: "User Report",
  icon: faUser,
  pageDescription: "View the consolidated report for selected user."
};
reportsTrails.accessTokenUsageReport = {
  parent: "userReports",
  name: "accessTokenUsageReport",
  path: reportsPaths.accessTokenUsageReport,
  title: "Access Token Usage Report",
  linkText: "Access Token Usage Report",
  icon: faUser,
};

reportsTrails.pipelineReports = {
  parent: "reports",
  name: "pipelineReports",
  path: reportsPaths.pipelineReports,
  title: "Pipeline Reports",
  linkText: "Pipeline Reports",
  icon: faDraftingCompass
};
import paths from "./paths";
import {
  faAnalytics,
  faClipboardList,
  faLink,
  faChartNetwork,
  faEnvelope,
  faProjectDiagram,
  faTools,
  faChartArea,
  faHome,
  faListAlt,
  faRadar,
  faServer,
  faHandshake,
  faFileCode,
  faTasks,
  faCircle,
  faQuestion,
  faBook,
  faMagnifyingGlass,
  faShieldKeyhole,
  faHouseUser,
  faDiamondExclamation,
  faUserShield,
  faHourglassClock,
  faUserAltSlash,
  faUserCheck,
  faClipboardUser,
  faSitemap
} from "@fortawesome/pro-light-svg-icons";
import { taskTypeConstants } from "components/tasks/task.types";
import { pipelineSettingsTrails } from "components/settings/pipelines/pipelineSettings.trails";
import {userSettingsTrails} from "components/user/user_settings/userSettings.trails";
import {pipelinesTrails} from "components/workflow/pipelines.trails";
import {accountSettingsTrails} from "components/settings/accountSettings.trails";
import {adminToolsTrails} from "components/admin/adminTools.trails";
import {reportsTrails} from "components/reports/reports.trails";
import {workspaceTrails} from "components/workspace/workspace.trails";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";

// TODO: Separate based on module in respective folders: Admin/Inventory/etc.
export const breadcrumbs = {
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
    name: "helpDocumentation",
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
  salesforce: {
    parent: "insights",
    name: "salesforce",
    path: paths.salesforce,
    title: "Salesforce Insights",
    linkText: "Salesforce",
    icon: faSalesforce,
    isBeta: true,
  },
  lookup: {
    parent: "salesforce",
    name: "lookup",
    path: paths.lookup,
    title: "Salesforce Lookup",
    linkText: "Salesforce Lookup",
    icon: faMagnifyingGlass,
    isBeta: true,
  },
  dependencyAnalyser: {
    parent: "salesforce",
    name: "dependencyAnalyser",
    path: paths.dependencyAnalyser,
    title: "Salesforce Dependency Analyser",
    linkText: "Salesforce Dependency Analyser",
    icon: faSitemap,
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
      isBeta: true
    },
  insightsGitCustodian: {
    parent: "insights",
    name: "gitCustodian",
    path: paths.insightsConnectedAssets,
    title: "Git Custodian",
    linkText: "Git Custodian",
    icon: faShieldKeyhole,
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
    title: "Task Management",
    linkText: "Task Management",
    icon: faTasks,
    pageDescription: "Create and Manage Opsera Related Tasks.",
  },
  taskActivityLogs : {
    parent: undefined,
    name: "taskManagement",
    path: paths.taskActivityLogs,
    title: "Task Activity Logs",
    linkText: "Task Activity Logs",
    icon: faClipboardList
  },
  taskManagementDetailView: {
    parent: "taskManagement",
    name: "taskManagementDetailView",
    path: paths.taskManagementDetailView,
    title: "Task Details",
    linkText: "Task Details",
    icon: faTasks,
    dynamicIconFunction: (model) => {
      return taskTypeConstants.getIconForTaskType(model?.getData("type"));
    },
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

  freeTrialLanding: {
    parent: undefined,
    name: "freeTrialLanding",
    path: paths.home,
    title: "Home",
    linkText: "Home",
    icon: faHouseUser,
  },

  freeTrialUserExpirationManagement: {
    parent: "settings",
    name: "freeTrialUserExpirationManagement",
    path: paths.freeTrialUserExpirationManagement,
    title: "Free Trial User Expiration Management",
    linkText: "Free Trial User Expiration Management",
    icon: faUserShield,
    pageDescription: "Extend or Revoke a User's Free Trial access."
  },
  freeTrialUserExtensionScreen: {
    parent: "freeTrialUserExpirationManagement",
    name: "freeTrialUserExtensionScreen",
    path: paths.freeTrialUserExtensionScreen,
    title: "Extend Free Trial User Access",
    linkText: "Extend Free Trial User Access",
    icon: faHourglassClock,
    pageDescription: "Extend a User's Free Trial access."
  },
  freeTrialUserRevocationScreen: {
    parent: "freeTrialUserExpirationManagement",
    name: "freeTrialUserRevocationScreen",
    path: paths.freeTrialUserRevocationScreen,
    title: "Revoke Free Trial User Access",
    linkText: "Revoke Free Trial User Access",
    icon: faUserAltSlash,
    pageDescription: "Revoke a User's Free Trial access."
  },
  freeTrialUserReinstatementScreen: {
    parent: "freeTrialUserExpirationManagement",
    name: "freeTrialUserReinstatementScreen",
    path: paths.freeTrialUserReinstatementScreen,
    title: "Reinstate Free Trial User Access",
    linkText: "Reinstate Free Trial User Access",
    icon: faUserCheck,
    pageDescription: "Reinstate a User's Free Trial access."
  },

  freeTrialUserActivityReport: {
    parent: "settings",
    name: "freeTrialUserActivityReport",
    path: paths.freeTrialUserActivityReport,
    title: "Free Trial Activity Report",
    linkText: "Free Trial Activity Report",
    icon: faClipboardUser,
    pageDescription: "View Free Trial User metrics and gain visibility on their Opsera activity."
  },

  pageNotFound: {
    parent: undefined,
    name: "pageNotFound",
    path: undefined,
    title: "Page Not Found!",
    linkText: undefined,
    icon: faDiamondExclamation,
  },

  ...pipelineSettingsTrails,
  ...pipelinesTrails,
  ...userSettingsTrails,
  ...accountSettingsTrails,
  ...adminToolsTrails,
  ...reportsTrails,
  ...workspaceTrails,
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
export const dashboardTypeConstants = {};

dashboardTypeConstants.DASHBOARD_TYPES = {
  OPERATIONS: "operations",
  PIPELINES: "pipeline",
  PLANNING: "planning",
  QUALITY: "quality",
  SECURITY: "security",
};

dashboardTypeConstants.DASHBOARD_TYPE_LABELS = {
  OPERATIONS: "Operations",
  PIPELINES: "Pipeline",
  PLANNING: "Planning",
  QUALITY: "Quality",
  SECURITY: "Security",
};

dashboardTypeConstants.getDashboardTypeLabel = (taskType) => {
  switch (taskType) {
    case dashboardTypeConstants.DASHBOARD_TYPES.OPERATIONS:
      return dashboardTypeConstants.DASHBOARD_TYPE_LABELS.OPERATIONS;
    case dashboardTypeConstants.DASHBOARD_TYPES.PIPELINES:
      return dashboardTypeConstants.DASHBOARD_TYPE_LABELS.PIPELINES;
    case dashboardTypeConstants.DASHBOARD_TYPES.PLANNING:
      return dashboardTypeConstants.DASHBOARD_TYPE_LABELS.PLANNING;
    case dashboardTypeConstants.DASHBOARD_TYPES.QUALITY:
      return dashboardTypeConstants.DASHBOARD_TYPE_LABELS.QUALITY;
    case dashboardTypeConstants.DASHBOARD_TYPES.SECURITY:
      return dashboardTypeConstants.DASHBOARD_TYPE_LABELS.SECURITY;
    default:
      return taskType;
  }
};

dashboardTypeConstants.DASHBOARD_TYPE_SELECT_OPTIONS = [
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.OPERATIONS,
    value: dashboardTypeConstants.DASHBOARD_TYPES.OPERATIONS,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.PIPELINES,
    value: dashboardTypeConstants.DASHBOARD_TYPES.PIPELINES,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.PLANNING,
    value: dashboardTypeConstants.DASHBOARD_TYPES.PLANNING,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.QUALITY,
    value: dashboardTypeConstants.DASHBOARD_TYPES.QUALITY,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.SECURITY,
    value: dashboardTypeConstants.DASHBOARD_TYPES.SECURITY,
  },
];

dashboardTypeConstants.DASHBOARD_TYPE_FILTER_SELECT_OPTIONS = [
  {
    text: "All Dashboards",
    value: "",
  },
  {
    text: "My Dashboards",
    value: "owner",
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.PIPELINES,
    value: dashboardTypeConstants.DASHBOARD_TYPES.PIPELINES,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.PLANNING,
    value: dashboardTypeConstants.DASHBOARD_TYPES.PLANNING,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.QUALITY,
    value: dashboardTypeConstants.DASHBOARD_TYPES.QUALITY,
  },
  {
    text: dashboardTypeConstants.DASHBOARD_TYPE_LABELS.SECURITY,
    value: dashboardTypeConstants.DASHBOARD_TYPES.SECURITY,
  },
];
import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
  getHierarchyFiltersFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const tasksActions = {};

tasksActions.bulkMigrationKPIDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/tasks/v1/getSfdcBulkMigrationTaskKPIDataBlocks";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  let hierarchyFilters =
    getHierarchyFiltersFromKpiConfiguration(kpiConfiguration);

  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags =
    getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }

  const postBody = {
    startDate: date.start,
    endDate: date.end,
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    projectTags: dashboardFilters,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.bulkMigrationBaseKPITable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/tasks/v1/getSfdcBulkMigrationTaskKPITable";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  let hierarchyFilters =
    getHierarchyFiltersFromKpiConfiguration(kpiConfiguration);
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags =
    getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  const postBody = {
    startDate: date.start,
    endDate: date.end,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    search: tableFilterDto?.getData("search"),
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    projectTags: dashboardFilters,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.bulkMigrationActionableOneDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  taskId,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/tasks/v1/getSfdcBulkMigrationTaskActionableOneDataBlocks";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  let hierarchyFilters =
    getHierarchyFiltersFromKpiConfiguration(kpiConfiguration);
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags =
    getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }

  const postBody = {
    startDate: date.start,
    endDate: date.end,
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    taskId: taskId,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.bulkMigrationActionableOneTable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  taskId,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/tasks/v1/getSfdcBulkMigrationTaskActionableOneTable";
  let hierarchyFilters =
    getHierarchyFiltersFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags =
    getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }

  const postBody = {
    startDate: date.start,
    endDate: date.end,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    search: tableFilterDto?.getData("search"),
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    taskId,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default tasksActions;

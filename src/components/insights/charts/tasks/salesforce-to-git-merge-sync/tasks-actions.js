import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const tasksActions = {};

tasksActions.sfdcToGitMergeSyncKPIDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/tasks/v1/getSfdcToGitMergeTaskKPIDataBlocks";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.sfdcToGitMergeSyncBaseKPITable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/tasks/v1/getSfdcToGitMergeTaskKPITable";
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
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.sfdcToGitMergeSyncActionableOneDataBlocks = async (
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
    "/analytics/tasks/v1/getSfdcToGitMergeTaskActionableOneDataBlocks";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    taskId: taskId,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.sfdcToGitMergeSyncActionableOneTable = async (
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
  const apiUrl = "/analytics/tasks/v1/getSfdcToGitMergeTaskActionableOneTable";
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
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.sfdcToGitMergeSyncActionableTwoDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  runId,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/tasks/v1/getSfdcToGitMergeTaskActionableTwoDataBlocks";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    runId: runId,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

tasksActions.sfdcToGitMergeSyncActionableTwoTable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  runId
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/tasks/v1/getSfdcToGitMergeTaskActionableTwoTable";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    runId: runId,
    search: tableFilterDto?.getData("search"),
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default tasksActions;

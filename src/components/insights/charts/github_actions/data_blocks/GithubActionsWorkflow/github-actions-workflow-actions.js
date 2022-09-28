import baseActions from "utils/actionsBase";
import { addDays } from "date-fns";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
  getHierarchyFiltersFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const githubActionsWorkflowActions = {};

githubActionsWorkflowActions.githubActionsBaseKPIDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/githubActions/v1/githubActionsBaseKPIDataBlocks";
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

githubActionsWorkflowActions.githubActionsBaseKPITable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/githubActions/v1/githubActionsBaseKPITable";
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

githubActionsWorkflowActions.githubActionsActionableOneDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  workflowName,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubActionsActionableOneDataBlocks";
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
    workflowName: workflowName,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubActionsActionableOneTable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  workflowName,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/githubActions/v1/githubActionsActionableOneTable";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    workflowName: workflowName,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubActionsActionableTwoDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  workflowName,
  repoName,
  appName,
  branchName,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubActionsActionableTwoDataBlocks";
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
    workflowName: workflowName,
    repoName: repoName,
    appName: appName,
    branchName: branchName,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubActionsActionableTwoTable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  workflowName,
  repoName,
  appName,
  branchName,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/githubActions/v1/githubActionsActionableTwoTable";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    workflowName: workflowName,
    repoName: repoName,
    appName: appName,
    branchName: branchName,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubActionsActionableThreeDataBlocks = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  workflowName,
  repoName,
  appName,
  branchName,
  jobName,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubActionsActionableThreeDataBlocks";
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
    workflowName: workflowName,
    repoName: repoName,
    appName: appName,
    branchName: branchName,
    jobName: jobName,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubActionsActionableThreeTable = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  workflowName,
  repoName,
  appName,
  branchName,
  jobName,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubActionsActionableThreeTable";
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
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs: dashboardOrgs,
    dashboardFilters: dashboardFilters,
    workflowName: workflowName,
    repoName: repoName,
    appName: appName,
    branchName: branchName,
    jobName: jobName,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default githubActionsWorkflowActions;

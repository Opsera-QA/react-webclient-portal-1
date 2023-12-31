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

githubActionsWorkflowActions.githubActionsBaseKPIDataBlocksPrev = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubActionsBaseKPIDataBlocksPrev";
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

githubActionsWorkflowActions.getGithubActionsActionableOneTableWorkflowRunDetails =
  async (
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
    const apiUrl =
      "/analytics/githubActions/v1/githubActionsActionableOneTableWorkflowRunDetails";
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

githubActionsWorkflowActions.githubRepoStatistics = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/githubActions/v1/githubRepoStatistics";
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
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubRepoStatisticsOverlay = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  bucket,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/githubActions/v1/githubRepoStatisticsOverlay";
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
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
    bucket: bucket,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubMergedPullRequestStatistics = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubMergedPullRequestStatistics";
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
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubMergedPullRequestStatisticsOverlay = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  bucket,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubMergedPullRequestStatisticsOverlay";
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
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
    bucket: bucket,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActionsWorkflowActions.githubOpenPullRequestStatisticsOverlay = async (
  kpiConfiguration,
  getAccessToken,
  cancelTokenSource,
  dashboardTags,
  dashboardOrgs,
  dashboardFilters,
  bucket,
) => {
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl =
    "/analytics/githubActions/v1/githubOpenPullRequestStatisticsOverlay";
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
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
    bucket: bucket,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};
export default githubActionsWorkflowActions;

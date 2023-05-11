import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration, getGithubBranchFromKpiConfiguration, getGithubRepositoryFromKpiConfiguration,
  getTagsFromKpiConfiguration, getUseDashboardTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration
} from "../charts-helpers";

const githubBaseURL = "analytics/github/v1/";

const githubActions = {};

githubActions.githubRepositoryList = async (
  getAccessToken,
  cancelTokenSource,
) => {
  // TODO FILTER WITH TAGS
  const apiUrl = githubBaseURL + "githubRepositoryList";
  const postBody = {
    size: 10,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActions.githubBranchList = async (getAccessToken, cancelTokenSource) => {
  // TODO FILTER WITH TAGS
  const apiUrl = githubBaseURL + "githubBranchList";
  const postBody = {
    size: 10,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

githubActions.githubMergeReqAndPushActionableTable = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
    tableFilterDto,
    date,
    projectName
) => {
  const apiUrl = githubBaseURL + "githubMergeReqAndPushActionableTable";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags =
      getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  const githubRepository =
      getGithubRepositoryFromKpiConfiguration(kpiConfiguration);
  const githubBranch = getGithubBranchFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags:
        tags && dashboardTags
            ? tags.concat(dashboardTags)
            : dashboardTags?.length > 0
                ? dashboardTags
                : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage")
        ? tableFilterDto?.getData("currentPage")
        : 1,
    size: tableFilterDto?.getData("pageSize")
        ? tableFilterDto?.getData("pageSize")
        : 5,
    githubRepository: githubRepository,
    githubBranch: githubBranch,
    date: date,
    projectName: projectName,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
      getAccessToken,
      cancelTokenSource,
      apiUrl,
      postBody,
  );
};

githubActions.githubMergeReqAndPushActionableVerticalContainer = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
    date
) => {
  const apiUrl = githubBaseURL + "githubMergeReqAndPushActionableVerticalContainer";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags =
      getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  const githubRepository =
      getGithubRepositoryFromKpiConfiguration(kpiConfiguration);
  const githubBranch = getGithubBranchFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags:
        tags && dashboardTags
            ? tags.concat(dashboardTags)
            : dashboardTags?.length > 0
                ? dashboardTags
                : tags,
    dashboardOrgs: dashboardOrgs,
    githubRepository: githubRepository,
    githubBranch: githubBranch,
    date: date
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
      getAccessToken,
      cancelTokenSource,
      apiUrl,
      postBody,
  );
};


export default githubActions;

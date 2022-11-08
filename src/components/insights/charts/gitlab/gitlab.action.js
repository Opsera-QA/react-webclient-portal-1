import baseActions from "utils/actionsBase";

import {
  getDateObjectFromKpiConfiguration,
  getDeploymentStageFromKpiConfiguration,
  getGitlabProjectFromKpiConfiguration,
  getResultFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const gitlabBaseURL = "analytics/gitlab/v1/";

const gitlabActions = {};

gitlabActions.gitlabPendingMergeRequests = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  projectName,
  dashboardOrgs,
) => {
  const apiUrl = gitlabBaseURL + "gitlabPendingMergeRequests";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

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
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    type: tableFilterDto?.getData("type"),
    projectName: projectName,
    dashboardOrgs: dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  projectName,
  dashboardOrgs,
) => {
  const apiUrl = gitlabBaseURL + "gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

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
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    type: tableFilterDto?.getData("type"),
    projectName: projectName,
    dashboardOrgs: dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabProjects = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  dashboardOrgs,
) => {
  const apiUrl = gitlabBaseURL + "gitlabProjects";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

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
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    type: tableFilterDto?.getData("type"),
    dashboardOrgs: dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabDeploymentStatistics = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
) => {
  const apiUrl = gitlabBaseURL + "gitlabDeploymentStatistics";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  // TODO Revert this code when timezone is fixed everywhere
  const timeOffsetInMins = new Date(dateRange?.start).getTimezoneOffset() * 60000;
  const startDate = new Date(dateRange?.start);
  const endDate = new Date(dateRange?.end);
  startDate.setTime(startDate.getTime() - timeOffsetInMins);
  endDate.setTime(endDate.getTime() - timeOffsetInMins);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  const postBody = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    deploymentStages: getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    gitlabProjects: getGitlabProjectFromKpiConfiguration(kpiConfiguration),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabLeadTimeForChange = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs
) => {
  const apiUrl = gitlabBaseURL + "gitlabLeadTimeForChange";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  // TODO Revert this code when timezone is fixed everywhere
  const timeOffsetInMins = new Date(dateRange?.start).getTimezoneOffset() * 60000;
  const startDate = new Date(dateRange?.start);
  const endDate = new Date(dateRange?.end);
  startDate.setTime(startDate.getTime() - timeOffsetInMins);
  endDate.setTime(endDate.getTime() - timeOffsetInMins);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  const postBody = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    deploymentStages: getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    gitlabProjects: getGitlabProjectFromKpiConfiguration(kpiConfiguration),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabAverageCommitTimeToMerge = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  projectName,
  dashboardOrgs,
) => {
  const apiUrl = gitlabBaseURL + "gitlabAverageCommitTimeToMerge";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  // TODO Revert this code when timezone is fixed everywhere
  const timeOffsetInMins = new Date(dateRange?.start).getTimezoneOffset() * 60000;
  const startDate = new Date(dateRange?.start);
  const endDate = new Date(dateRange?.end);
  startDate.setTime(startDate.getTime() - timeOffsetInMins);
  endDate.setTime(endDate.getTime() - timeOffsetInMins);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  const postBody = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    deploymentStages: getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    gitlabProjects: getGitlabProjectFromKpiConfiguration(kpiConfiguration),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabBranchList = async (
  getAccessToken,
  cancelTokenSource,
) => {
  // TODO FILTER WITH TAGS
  const apiUrl = gitlabBaseURL + "gitlabBranchList";
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, {});
};

gitlabActions.gitlabPipelineData = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
) => {
  const apiUrl = gitlabBaseURL + "gitlabPipelineData";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  // TODO Revert this code when timezone is fixed everywhere
  const timeOffsetInMins = new Date(dateRange?.start).getTimezoneOffset() * 60000;
  const startDate = new Date(dateRange?.start);
  const endDate = new Date(dateRange?.end);
  startDate.setTime(startDate.getTime() - timeOffsetInMins);
  endDate.setTime(endDate.getTime() - timeOffsetInMins);

  const postBody = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    deploymentStages: getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    gitlabProjects: getGitlabProjectFromKpiConfiguration(kpiConfiguration),
    gitlabBranches: getResultFromKpiConfiguration(kpiConfiguration, "gitlab-branch"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default gitlabActions;

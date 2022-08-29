import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getJenkinsResultFromKpiConfiguration,
  getJenkinsJobUrlFromKpiConfiguration,
  getJenkinsBuildNumberFromKpiConfiguration,
  getJiraIssueTypeFromKpiConfiguration,
  getJiraIssueComponentsFromKpiConfiguration,
  getJiraIssueLabelsFromKpiConfiguration,
  getJiraIssueStatusFromKpiConfiguration,
  getJiraIssueStartStatusFromKpiConfiguration,
  getJiraIssueDoneStatusFromKpiConfiguration,
  getSonarProjectKeyFromKpiConfiguration,
  getDomainFromKpiConfiguration,
  getApplicationFromKpiConfiguration,
  getSprintFromKpiConfiguration,
  getReleaseFromKpiConfiguration,
  getProjectFromKpiConfiguration,
  getSeleniumTestSuitesFromKpiConfiguration,
  getSonarProjectLanguagesFromKpiConfiguration,
  getServiceNowPrioritiesFromKpiConfiguration,
  getServiceNowAssignmentGroupsFromKpiConfiguration,
  getServiceNowServiceOfferingsFromKpiConfiguration,
  getServiceNowConfigurationItemsFromKpiConfiguration,
  getServiceNowBusinessServicesFromKpiConfiguration,
  getHierarchyFiltersFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
  getDeploymentStageFromKpiConfiguration,
  getGitlabProjectFromKpiConfiguration
} from "components/insights/charts/charts-helpers";
import { addDays } from "date-fns";

const chartsActions = {};

chartsActions.getChartMetrics = async (request, metric, date, tags, getAccessToken) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, apiUrl, postBody);
};

chartsActions.getSonarUnitTestsMetrics = async(kpiConfiguration, dashboardTags, getAccessToken, cancelTokenSource, tableFilterDto, dashboardOrgs)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/sonar/v1/sonarUnitTestsMetrics";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGithubPullRequestsMetrics = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs, tableFilterDto, type, repository)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/github/v1/actionable/githubcommits";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    type: type,
    repository,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGithubTotalCommitsPerContributorsAndRepositories = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs, tableFilterDto, repository)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/github/v1/actionable/githubTotalCommitsPerContributorsAndRepositories";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    repository,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGithubTotalCommitsMetrics = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/github/v1/githubTotalCommits";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitCustodianFilters = async(getAccessToken, cancelTokenSource, filters) => {
  const apiUrl = "/analytics/gitscraper/v1/dashboard/filters";
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, filters);
};

chartsActions.getGitCustodianChartsData = async(getAccessToken, cancelTokenSource, filterModel)=>{
  const apiUrl = "/analytics/gitscraper/v1/dashboard/charts";

  const postBody = {
      startDate: filterModel.getFilterValue('date').startDate,
      endDate: addDays(new Date(filterModel.getFilterValue('date').endDate), 1),
      tags: filterModel.getFilterValue('tags') ? filterModel.getFilterValue('tags') : [],
      filters: {
        repositories: filterModel.getFilterValue('repositories') ? filterModel.getFilterValue('repositories') : [],
        authors: filterModel.getFilterValue('authors') ? filterModel.getFilterValue('authors') : [],
        service: filterModel.getFilterValue('service') ? filterModel.getFilterValue('service') : [],
        status: filterModel.getFilterValue('status') ? filterModel.getFilterValue('status') : [],
        email: filterModel.getFilterValue('email') ? filterModel.getFilterValue('email') : [],
        type: filterModel.getFilterValue('type') ? filterModel.getFilterValue('type') : [],
      }
    };
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitCustodianTableData = async(getAccessToken, cancelTokenSource, filterModel, tableFilterDto)=>{
  const apiUrl = "/analytics/gitscraper/v1/dashboard/table";

  const postBody = {
      startDate: filterModel.getFilterValue('date').startDate,
      endDate: addDays(new Date(filterModel.getFilterValue('date').endDate), 1),
      sortOption: tableFilterDto?.getData("sortOption")?.value,
      search: tableFilterDto?.getData("search"),
      tags: filterModel.getFilterValue('tags') ? filterModel.getFilterValue('tags') : [],
      filters: {
        repositories: filterModel.getFilterValue('repositories') ? filterModel.getFilterValue('repositories') : [],
        authors: filterModel.getFilterValue('authors') ? filterModel.getFilterValue('authors') : [],
        service: filterModel.getFilterValue('service') ? filterModel.getFilterValue('service') : [],
        status: filterModel.getFilterValue('status') ? filterModel.getFilterValue('status') : [],
        email: filterModel.getFilterValue('email') ? filterModel.getFilterValue('email') : [],
        type: filterModel.getFilterValue('type') ? filterModel.getFilterValue('type') : [],
      },
      page: tableFilterDto?.getData("currentPage"),
      size: tableFilterDto?.getData("pageSize"),
    };
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.exportGitCustodianData = async(getAccessToken, cancelTokenSource, filterModel)=>{
  const apiUrl = "/analytics/gitscraper/v1/dashboard/download";

  const postBody = {
    startDate: filterModel.getFilterValue('date').startDate,
    endDate: addDays(new Date(filterModel.getFilterValue('date').endDate), 1),
    tags: filterModel.getFilterValue('tags') ? filterModel.getFilterValue('tags') : [],
    filters: {
      repositories: filterModel.getFilterValue('repositories') ? filterModel.getFilterValue('repositories') : [],
      authors: filterModel.getFilterValue('authors') ? filterModel.getFilterValue('authors') : [],
      service: filterModel.getFilterValue('service') ? filterModel.getFilterValue('service') : [],
      status: filterModel.getFilterValue('status') ? filterModel.getFilterValue('status') : [],
      email: filterModel.getFilterValue('email') ? filterModel.getFilterValue('email') : [],
      type: filterModel.getFilterValue('type') ? filterModel.getFilterValue('type') : [],
    }
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.createGitCustodianJiraTicket = async(getAccessToken, cancelTokenSource, postBody)=>{
  delete postBody.issuesList;
  const apiUrl = "/analytics/actions/v1/jira/ticket/createDefault";
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitScraperMetrics = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs, tableFilterDto, type, repository)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/gitscraper/v1/gitScraperMetrics";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    type: type,
    repository,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitScraperIssues = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs, tableFilterDto, type, repository)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/gitscraper/v1/gitScraperIssues";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    type: type,
    repository,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitScraperCleanRepos = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs, tableFilterDto, type, repository)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/gitscraper/v1/gitScraperCleanRepos";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    type: type,
    repository,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitScraperIssuesActionableInsights = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs, tableFilterDto, repository, branch)=>{

  const apiUrl = "/analytics/gitscraper/v1/gitScraperIssuesActionableInsights";

  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    repository,
    branch
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getMetadataInfo = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/opserapipelines/v1/deploymentAnalyticsPipelines";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs
  };
    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};
chartsActions.getDeploymentAnalytics = async(kpiConfiguration, getAccessToken, cancelTokenSource, metadataName,tableFilterDto, dashboardTags, dashboardOrgs)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/opserapipelines/v1/deploymentAnalyticsMetrics";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
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
    startDate: date.start,
    endDate: date.end,
    metadataName: metadataName,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
  
};


chartsActions.getSfdcMetrics = async(kpiConfiguration, getAccessToken, cancelTokenSource, dashboardTags, dashboardOrgs)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/sfdc/v1/getSfdcMetrics";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.parseConfigurationAndGetChartMetrics = async (
  getAccessToken,
  cancelTokenSource,
  request,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  projectTags,
  dashboardOrgs,
  pipelineName,
  currentDate,
  dateRange,
  actionableInsightsQueryData,
  coveritySeverity,
  priorityMTTR,
  headCommitSha,
  projectName,
  runCount,
  pipelineId
) => {
  const apiUrl = "/analytics/metrics",
    date = getDateObjectFromKpiConfiguration(kpiConfiguration),
    jenkinsResult = getJenkinsResultFromKpiConfiguration(kpiConfiguration),
    jenkinsJobUrl = getJenkinsJobUrlFromKpiConfiguration(kpiConfiguration),
    jenkinsBuildNumber = getJenkinsBuildNumberFromKpiConfiguration(kpiConfiguration),
    jiraIssueType = getJiraIssueTypeFromKpiConfiguration(kpiConfiguration),
    jiraIssueComponents = getJiraIssueComponentsFromKpiConfiguration(kpiConfiguration),
    jiraIssueLabels = getJiraIssueLabelsFromKpiConfiguration(kpiConfiguration),
    jiraIssueStatus = getJiraIssueStatusFromKpiConfiguration(kpiConfiguration),
    jiraIssueStartStatus = getJiraIssueStartStatusFromKpiConfiguration(kpiConfiguration),
    jiraIssueDoneStatus = getJiraIssueDoneStatusFromKpiConfiguration(kpiConfiguration),
    sonarProjectKey = getSonarProjectKeyFromKpiConfiguration(kpiConfiguration),
    domain = getDomainFromKpiConfiguration(kpiConfiguration),
    application = getApplicationFromKpiConfiguration(kpiConfiguration),
    sprint = getSprintFromKpiConfiguration(kpiConfiguration),
    release = getReleaseFromKpiConfiguration(kpiConfiguration),
    project = getProjectFromKpiConfiguration(kpiConfiguration),
    seleniumTestSuites = getSeleniumTestSuitesFromKpiConfiguration(kpiConfiguration),
    sonarProjectLanguages = getSonarProjectLanguagesFromKpiConfiguration(kpiConfiguration),
    serviceNowPriorities = getServiceNowPrioritiesFromKpiConfiguration(kpiConfiguration),
    serviceNowAssignmentGroups = getServiceNowAssignmentGroupsFromKpiConfiguration(kpiConfiguration),
    serviceNowServiceOfferings = getServiceNowServiceOfferingsFromKpiConfiguration(kpiConfiguration),
    serviceNowConfigurationItems = getServiceNowConfigurationItemsFromKpiConfiguration(kpiConfiguration),
    serviceNowBusinessServices = getServiceNowBusinessServicesFromKpiConfiguration(kpiConfiguration),
    deploymentStages = getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    gitlabProjects = getGitlabProjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  let hierarchyFilters = getHierarchyFiltersFromKpiConfiguration(kpiConfiguration);
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
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    jenkinsResult: jenkinsResult,
    jenkinsJobUrl: jenkinsJobUrl,
    jenkinsBuildNumber: jenkinsBuildNumber,
    jiraIssueType: jiraIssueType,
    jiraIssueComponents: jiraIssueComponents,
    jiraIssueLabels: jiraIssueLabels,
    jiraIssueStatus: jiraIssueStatus,
    jiraIssueStartStatus: jiraIssueStartStatus,
    jiraIssueDoneStatus: jiraIssueDoneStatus,
    sonarProjectKey: sonarProjectKey,
    domain: domain,
    application: application,
    release: release,
    sprint: sprint,
    project: project,
    seleniumTestSuites: seleniumTestSuites,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    search: tableFilterDto?.getData("search"),
    sortOption: tableFilterDto?.getData("sortOption")?.value,
    projectTags: projectTags,
    dashboardOrgs: dashboardOrgs,
    pipelineName: pipelineName,
    currentDate: currentDate,
    dateRange: dateRange,
    sonarProjectLanguages: sonarProjectLanguages,
    serviceNowPriorities: serviceNowPriorities,
    serviceNowAssignmentGroups: serviceNowAssignmentGroups,
    serviceNowServiceOfferings: serviceNowServiceOfferings,
    serviceNowConfigurationItems: serviceNowConfigurationItems,
    serviceNowBusinessServices: serviceNowBusinessServices,
    actionableInsightsQueryData: actionableInsightsQueryData,
    coveritySeverity: coveritySeverity,
    priorityMTTR: priorityMTTR,
    headCommitSha: headCommitSha,
    hierarchyFilters: useKpiTags ? hierarchyFilters : null,
    projectName: projectName,
    runCount: runCount,
    pipelineId: pipelineId,
    deploymentStages:deploymentStages,
    gitlabProjects: gitlabProjects
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGithubListOfRepositories = async(getAccessToken, cancelTokenSource,kpiConfiguration, dashboardTags, dashboardOrgs, tableFilterDto)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/github/v1/githubListOfRepositories";
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    search: tableFilterDto?.getData("search"),
    type: tableFilterDto?.getData("type"),
    sortOption: tableFilterDto?.getData("sortOption")?.value,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};



export default chartsActions;

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
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const chartsActions = {};

chartsActions.getChartMetrics = async (request, metric, date, tags, getAccessToken) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, undefined, apiUrl, postBody);
};

chartsActions.getSonarUnitTestsMetrics = async (
  kpiConfiguration,
  dashboardTags,
  getAccessToken,
  cancelTokenSource,
  tableFilterDto,
  dashboardOrgs
) => {
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
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGithubPullRequestsMetrics = async(kpiConfiguration, getAccessToken, cancelTokenSource, tags, dashboardOrgs, tableFilterDto, type, repository)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/github/v1/actionable/githubcommits";
  const postBody = {
    startDate: date.start,
    endDate: date.end,
    tags: tags,
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

chartsActions.getGithubTotalCommitsMetrics = async(kpiConfiguration, getAccessToken, cancelTokenSource, tags, dashboardOrgs)=>{
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const apiUrl = "/analytics/github/v1/githubTotalCommits";
  const postBody = {
    startDate: date.start,
    endDate: date.end,
    tags: tags,
    dashboardOrgs: dashboardOrgs
  };

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

chartsActions.getGitCustodianFilters = async(getAccessToken, cancelTokenSource)=>{
  const apiUrl = "/analytics/gitscraper/v1/dashboard/filters";
  return await baseActions.handleNodeAnalyticsApiGetRequest(getAccessToken, cancelTokenSource, apiUrl);
};

chartsActions.getGitCustodianChartsData = async(getAccessToken, cancelTokenSource, filterModel)=>{
  const apiUrl = "/analytics/gitscraper/v1/dashboard/charts";

  const postBody = {
      startDate: filterModel.getFilterValue('date').startDate,
      endDate: filterModel.getFilterValue('date').endDate,
      filters: {
        repositories: filterModel.getFilterValue('repositories') ? filterModel.getFilterValue('repositories').map(el => el.value) : [],
        authors: filterModel.getFilterValue('authors') ? filterModel.getFilterValue('authors').map(el => el.value) : [],
        service: filterModel.getFilterValue('service') ? filterModel.getFilterValue('service').map(el => el.value) : [],
        status: filterModel.getFilterValue('status') ? filterModel.getFilterValue('status').map(el => el.value) : []
      }
    };
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getGitCustodianTableData = async(getAccessToken, cancelTokenSource, filterModel, tableFilterDto)=>{
  const apiUrl = "/analytics/gitscraper/v1/dashboard/table";

  const postBody = {
      startDate: filterModel.getFilterValue('date').startDate,
      endDate: filterModel.getFilterValue('date').endDate,
      filters: {
        repositories: filterModel.getFilterValue('repositories') ? filterModel.getFilterValue('repositories').map(el => el.value) : [],
        authors: filterModel.getFilterValue('authors') ? filterModel.getFilterValue('authors').map(el => el.value) : [],
        service: filterModel.getFilterValue('service') ? filterModel.getFilterValue('service').map(el => el.value) : [],
        status: filterModel.getFilterValue('status') ? filterModel.getFilterValue('status').map(el => el.value) : []
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
    endDate: filterModel.getFilterValue('date').endDate,
    filters: {
      repositories: filterModel.getFilterValue('repositories') ? filterModel.getFilterValue('repositories').map(el => el.value) : [],
      authors: filterModel.getFilterValue('authors') ? filterModel.getFilterValue('authors').map(el => el.value) : [],
      service: filterModel.getFilterValue('service') ? filterModel.getFilterValue('service').map(el => el.value) : [],
      status: filterModel.getFilterValue('status') ? filterModel.getFilterValue('status').map(el => el.value) : []
    }
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.createGitCustodianJiraTicket = async(getAccessToken, cancelTokenSource, postBody)=>{
  delete postBody.issuesList;
  const apiUrl = "/analytics/actions/v1/jira/ticket/createDefault";
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
    serviceNowBusinessServices = getServiceNowBusinessServicesFromKpiConfiguration(kpiConfiguration);
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
    projectName: projectName,
    runCount: runCount,
    pipelineId: pipelineId,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default chartsActions;

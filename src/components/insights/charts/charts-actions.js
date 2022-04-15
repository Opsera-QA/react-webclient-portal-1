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
  coveritySeverity
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
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default chartsActions;

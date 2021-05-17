import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getJenkinsResultFromKpiConfiguration,
  getJenkinsJobUrlFromKpiConfiguration,
  getJenkinsBuildNumberFromKpiConfiguration,
  getJiraIssueTypeFromKpiConfiguration,
  getJiraIssueStartStatusFromKpiConfiguration,
  getJiraIssueDoneStatusFromKpiConfiguration,
  getSonarProjectKeyFromKpiConfiguration,
  getDomainFromKpiConfiguration,
  getApplicationFromKpiConfiguration,
  getSprintFromKpiConfiguration,
  getReleaseFromKpiConfiguration,
  getProjectFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const chartsActions = {};

chartsActions.getChart = async (request, metric, date, getAccessToken) => {
  const apiUrl = "/analytics/data";

  const postBody = {
    data: [
      {
        request: request,
        metric: metric,
      },
    ],
    startDate: date.start,
    endDate: date.end,
  };

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

chartsActions.getChartData = async (getAccessToken, cancelTokenSource, request, metric, kpiConfiguration) => {
  const apiUrl = "/analytics/data";
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    data: [
      {
        request: request,
        metric: metric,
      },
    ],
    startDate: date.start,
    endDate: date.end,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

chartsActions.getChartMetrics = async (request, metric, date, tags, getAccessToken) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags,
  };

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
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
  pipelineName
) => {
  const apiUrl = "/analytics/metrics";
  const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tags = getTagsFromKpiConfiguration(kpiConfiguration);
  const jenkinsResult = getJenkinsResultFromKpiConfiguration(kpiConfiguration);
  const jenkinsJobUrl = getJenkinsJobUrlFromKpiConfiguration(kpiConfiguration);
  const jenkinsBuildNumber = getJenkinsBuildNumberFromKpiConfiguration(kpiConfiguration);
  const jiraIssueType = getJiraIssueTypeFromKpiConfiguration(kpiConfiguration);
  const jiraIssueStartStatus = getJiraIssueStartStatusFromKpiConfiguration(kpiConfiguration);
  const jiraIssueDoneStatus = getJiraIssueDoneStatusFromKpiConfiguration(kpiConfiguration);
  const sonarProjectKey = getSonarProjectKeyFromKpiConfiguration(kpiConfiguration);
  const domain = getDomainFromKpiConfiguration(kpiConfiguration);
  const application = getApplicationFromKpiConfiguration(kpiConfiguration);
  const sprint = getSprintFromKpiConfiguration(kpiConfiguration);
  const release = getReleaseFromKpiConfiguration(kpiConfiguration);
  const project = getProjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    request: request,
    startDate: date.start,
    endDate: date.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    jenkinsResult: jenkinsResult,
    jenkinsJobUrl: jenkinsJobUrl,
    jenkinsBuildNumber: jenkinsBuildNumber,
    jiraIssueType: jiraIssueType,
    jiraIssueStartStatus: jiraIssueStartStatus,
    jiraIssueDoneStatus: jiraIssueDoneStatus,
    sonarProjectKey: sonarProjectKey,
    domain: domain,
    application: application,
    release: release,
    sprint: sprint,
    project: project,
    page: tableFilterDto?.getData("currentPage"),
    size: tableFilterDto?.getData("pageSize"),
    projectTags: projectTags,
    dashboardOrgs: dashboardOrgs,
    pipelineName: pipelineName,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default chartsActions;

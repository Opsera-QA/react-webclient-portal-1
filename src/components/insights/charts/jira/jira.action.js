import baseActions from "utils/actionsBase";

import {
  getDateObjectFromKpiConfiguration,
  getResultFromKpiConfiguration,
  getTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const jiraBaseURL = "analytics/jira/v1/";

const jiraActions = {};

jiraActions.getJiraMTTR = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
) => {
  const apiUrl = jiraBaseURL + "jiraMTTR";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    jiraProjects: getResultFromKpiConfiguration(kpiConfiguration, 'jira-projects'),
    jiraPriorities: getResultFromKpiConfiguration(kpiConfiguration, 'jira-priorities'),
    jiraServiceComponents: getResultFromKpiConfiguration(kpiConfiguration, 'jira-service-components'),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

jiraActions.getJiraPriorities = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = jiraBaseURL + "jiraPriorities";
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    {},
  );
};

jiraActions.getJiraProjects = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = jiraBaseURL + "jiraProjects";
  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    {},
  );
};

jiraActions.getJiraChangeTypes = async (
  getAccessToken,
  cancelTokenSource,
  project
) => {
  const apiUrl = jiraBaseURL + "jiraChangeTypes";
  let postBody = {};
  // For change failure rate, project will be given as string
  // Api is written in such a way that it accepts multiple projects.
  if(Array.isArray(project)) {
    if(project.length > 0){
      postBody = {jiraProjects:project};
    }
  } else if(project){
    postBody = {jiraProjects:[project]};
  }

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

jiraActions.getJiraServiceComponents = async (
  getAccessToken,
  cancelTokenSource,
  project
) => {
  const apiUrl = jiraBaseURL + "jiraServiceComponents";
  let postBody = {};
  // project will be given as string
  // Api is written in such a way that it accepts multiple projects.
  if(Array.isArray(project)) {
    if(project.length > 0){
      postBody = {jiraProjects:project};
    }
  } else if(project){
    postBody = {jiraProjects:[project]};
  }

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

jiraActions.getJiraResolutionNames = async (
  getAccessToken,
  cancelTokenSource,
  project
) => {
  const apiUrl = jiraBaseURL + "jiraResolutionNames";
  let postBody = {};
  // project will be given as string
  // Api is written in such a way that it accepts multiple projects.
  if(Array.isArray(project)) {
    if(project.length > 0){
      postBody = {jiraProjects:project};
    }
  } else if(project){
    postBody = {jiraProjects:[project]};
  }

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

jiraActions.getJiraChangeFailureRate = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
  jiraChangeTypes,
) => {
  const apiUrl = jiraBaseURL + "jiraChangeFailureRate";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

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
    jiraProjects: [getResultFromKpiConfiguration(kpiConfiguration,'jira-projects')],
    jiraChangeTypes: jiraChangeTypes,
    jiraServiceComponents: getResultFromKpiConfiguration(kpiConfiguration, 'jira-service-components'),
    jiraResolutionNames: getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names')
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default jiraActions;

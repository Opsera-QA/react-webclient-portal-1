import baseActions from "utils/actionsBase";

import {
  getDateObjectFromKpiConfiguration,
  getJiraPrioritiesFromKpiConfiguration,
  getJiraProjectsFromKpiConfiguration,
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
    jiraProjects: getJiraProjectsFromKpiConfiguration(kpiConfiguration),
    jiraPriorities: getJiraPrioritiesFromKpiConfiguration(kpiConfiguration),
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

export default jiraActions;

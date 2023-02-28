import baseActions from "utils/actionsBase";

import {
  getUseDashboardTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getDateObjectFromKpiConfiguration,
  getDeploymentStageFromKpiConfiguration,
  getGitlabProjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getResultFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";

const doraBaseURL = "analytics/dora/v1/";

const doraActions = {};

doraActions.jiraGitlabRolledUp = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
  jiraResolutionNames,
) => {
  const apiUrl = doraBaseURL + "jiraGitlabRolledUpDora";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  const startDate = new Date(dateRange?.start);
  const endDate = new Date(dateRange?.end);

  // Checking the use kpi tags toggle
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

  let jiraProjectsMTTR = getResultFromKpiConfiguration(kpiConfiguration, "jira-projects-mttr");
  jiraProjectsMTTR = jiraProjectsMTTR ? [jiraProjectsMTTR] : null;
  let jiraProjectsCFR = getResultFromKpiConfiguration(kpiConfiguration, "jira-projects-cfr");
  jiraProjectsCFR = jiraProjectsCFR ? [jiraProjectsCFR] : null;

  const postBody = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    tags:
      tags && dashboardTags
        ? tags.concat(dashboardTags)
        : dashboardTags?.length > 0
        ? dashboardTags
        : tags,
    dashboardOrgs,
    deploymentStages: getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    gitlabProjects: getGitlabProjectFromKpiConfiguration(kpiConfiguration),
    jiraProjectsMTTR,
    jiraProjectsCFR,
    jiraChangeTypes: getResultFromKpiConfiguration(kpiConfiguration, KPI_FILTER_TYPES.JIRA_CHANGE_TYPES),
    jiraResolutionNames,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

doraActions.doraJiraActionableDashboards = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    tableFilterDto,
    org
) => {
  const apiUrl = doraBaseURL + "doraJiraActionableDashboards";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);
  const startDate = new Date(dateRange?.start);
  const endDate = new Date(dateRange?.end);

  // Checking the use kpi tags toggle
  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }

  const postBody = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    tags: tags,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    org: org,
  };
  return await baseActions.handleNodeAnalyticsApiPostRequest(
      getAccessToken,
      cancelTokenSource,
      apiUrl,
      postBody,
  );
};

export default doraActions;

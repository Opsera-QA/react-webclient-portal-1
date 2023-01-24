import baseActions from "utils/actionsBase";
import { addDays } from "date-fns";

import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const apigeeBaseURL = "analytics/apigee/v1/";

const apigeeActions = {};

apigeeActions.getPipelines = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto
) => {
  const apiUrl = apigeeBaseURL + "getPipelines";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: _getTagsApplied(kpiConfiguration, dashboardTags),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeActions.getReport = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  pipelineId,
) => {
  const apiUrl = apigeeBaseURL + "report";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: _getTagsApplied(kpiConfiguration, dashboardTags),
    pipelineId: pipelineId,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    assetType: tableFilterDto?.getData("assetType"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeActions.getReportDetails = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  pipelineId,
  organization,
  environment,
  tableFilterDto,
  assetType
) => {
  const apiUrl = apigeeBaseURL + "report/details";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: _getTagsApplied(kpiConfiguration, dashboardTags),
    pipelineId: pipelineId,
    organization: organization,
    environment: environment,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    assetType: assetType,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeActions.getSummaryChartDetails = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
) => {
  const apiUrl = apigeeBaseURL + "metrics";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  
  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: _getTagsApplied(kpiConfiguration, dashboardTags),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);

};

apigeeActions.downloadReport = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  tableFilterDto,
  pipelineId,
) => {
  const apiUrl = apigeeBaseURL + "report/download";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: _getTagsApplied(kpiConfiguration, dashboardTags),
    pipelineId: pipelineId,    
    search: tableFilterDto?.getData("search"),
    assetType: tableFilterDto?.getData("assetType"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

const _getTagsApplied = (kpiConfiguration, dashboardTags) => {
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;    
  }
  return tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags;
};

export default apigeeActions;

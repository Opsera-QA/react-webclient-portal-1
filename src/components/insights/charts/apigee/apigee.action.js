import baseActions from "utils/actionsBase";
import { addDays } from "date-fns";

import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration
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
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
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
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    pipelineId: pipelineId,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
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
) => {
  const apiUrl = apigeeBaseURL + "report/details";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    pipelineId: pipelineId,
    organization: organization,
    environment: environment,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
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
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
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
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    pipelineId: pipelineId,    
    search: tableFilterDto?.getData("search"),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default apigeeActions;

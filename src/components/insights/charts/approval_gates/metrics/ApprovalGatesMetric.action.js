import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration
} from "components/insights/charts/charts-helpers";

import baseActions from "utils/actionsBase";


const approvalGatesChartsActions = {};

approvalGatesChartsActions.approvalGates = async(getAccessToken, cancelTokenSource,kpiConfiguration, dashboardTags, dashboardOrgs)=>{
    const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
    const apiUrl = "analytics/approvalgate/v1/approvalgate";
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
    };
  
    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
  };
  
  
  approvalGatesChartsActions.approvalGatesPipeline = async(getAccessToken, cancelTokenSource,kpiConfiguration, dashboardTags, dashboardOrgs)=>{
    const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
    const apiUrl = "analytics/approvalgate/v1/pipelines/approvals/listOfPipelines";
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
      page: 1, //tableFilterDto?.getData("currentPage"),
      size: 20, //tableFilterDto?.getData("pageSize"),
    };
  
    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
  };
  
  approvalGatesChartsActions.approvalGatesTableData = async(getAccessToken, cancelTokenSource,kpiConfiguration, dashboardTags, dashboardOrgs, tableFilterDto,pipeline_id,action)=>{
    const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
    const apiUrl = "analytics/approvalgate/v1/pipelines/approvals/selectedPipelineInfo";
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
      search: tableFilterDto?.getData("search"),
      sort: tableFilterDto?.getData("sortOption")?.value,
      pipeline_id,
      action
    };
  
    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
  };
  
  approvalGatesChartsActions.pipelinesWithApprovalgatesTableData = async(getAccessToken, cancelTokenSource,kpiConfiguration, dashboardTags, dashboardOrgs, tableFilterDto,pipeline_id,action)=>{
    const date = getDateObjectFromKpiConfiguration(kpiConfiguration);
    const apiUrl = "analytics/approvalgate/v1/pipelinesWithApprovalgates";
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
      search: tableFilterDto?.getData("search"),
      sort: tableFilterDto?.getData("sortOption")?.value,
      pipeline_id,
      action
    };
  
    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
  };
  
  export default approvalGatesChartsActions;
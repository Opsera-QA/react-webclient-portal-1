import baseActions from "utils/actionsBase";

const KpiActions = {};

KpiActions.getKpisV2 = async (getAccessToken, cancelTokenSource, kpiFilterDto) => {
  const apiUrl = "/analytics/kpi/configurations";
  let sortOption = kpiFilterDto.getData("sortOption");
  let status = kpiFilterDto.getData("status");
  let policySupport = kpiFilterDto.getData("policySupport");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: kpiFilterDto.getData("pageSize"),
      page: kpiFilterDto.getData("currentPage"),
      tool: kpiFilterDto.getFilterValue("tool"),
      category: kpiFilterDto.getFilterValue("category"),
      status: status ? status.value : undefined,
      policySupport: policySupport ? policySupport.value : undefined,
      search: kpiFilterDto.getFilterValue("search"),
    },
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

// Remove after all instances are updated to v2
KpiActions.getAllKpis = async (getAccessToken, status, policySupport) => {
  const apiUrl = "/analytics/kpi/configurations";
  const urlParams = {
    params: {
      pageSize: 10000,
      status: status ? status.value : undefined,
      policySupport: policySupport ? policySupport.value : undefined,
    },
  };

  return baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

KpiActions.getAllKpisV2 = async (getAccessToken, cancelTokenSource, status, policySupport, manualDataEntry) => {
  const apiUrl = "/analytics/kpi/configurations";
  const urlParams = {
    params: {
      pageSize: 10000,
      status: status ? status : undefined,
      policySupport: policySupport ? policySupport : undefined,
      manualDataEntry: manualDataEntry ? manualDataEntry : undefined
    },
  };

  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};


KpiActions.getKpiById = async (getAccessToken, cancelTokenSource, kpiId) => {
  const apiUrl = `/analytics/kpi/configurations/${kpiId}`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

KpiActions.getKpiByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `/analytics/kpi/configurations/identifier/${identifier}`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

KpiActions.createKpiV2 = async (getAccessToken, cancelTokenSource, kpiDataDto) => {
  let postBody = {
    ...kpiDataDto.getPersistData(),
  };
  const apiUrl = "analytics/kpi/configurations/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

KpiActions.createKpi = async (kpiDataDto, getAccessToken) => {
  let postData = {
    ...kpiDataDto.getPersistData(),
  };
  const apiUrl = "analytics/kpi/configurations/create";
  return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

KpiActions.updateKpiV2 = async (getAccessToken, cancelTokenSource, kpiDataDto) => {
  let postBody = {
    ...kpiDataDto.getPersistData(),
  };
  const apiUrl = `analytics/kpi/configurations/${kpiDataDto.getData("_id")}/update`;
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

KpiActions.updateKpi = async (kpiDataDto, getAccessToken) => {
  let postData = {
    ...kpiDataDto.getPersistData(),
  };
  const apiUrl = `/analytics/kpi/configurations/${kpiDataDto.getData("_id")}/update/`;
  return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

KpiActions.deleteKpi = async (kpiDataDto, getAccessToken) => {
  const apiUrl = `/analytics/kpi/configurations/${kpiDataDto.getData("_id")}/`;
  return baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

export default KpiActions;

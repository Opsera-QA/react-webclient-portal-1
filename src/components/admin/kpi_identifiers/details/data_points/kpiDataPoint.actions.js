import baseActions from "utils/actionsBase";

const kpiDataPointActions = {};

kpiDataPointActions.getKpiDataPointsV2 = async (getAccessToken, cancelTokenSource, kpiId) => {
  const apiUrl = `/analytics/kpi/${kpiId}/data-points`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

kpiDataPointActions.createKpiDataPointV2 = async (getAccessToken, cancelTokenSource, kpiDataPointModel, kpiId) => {
  const postBody = {
    ...kpiDataPointModel.getPersistData(),
  };

  const apiUrl = `analytics/kpi/${kpiId}/data-points/create`;
  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

kpiDataPointActions.updateKpiDataPointV2 = async (getAccessToken, cancelTokenSource, kpiDataPointModel, kpiId) => {
  const postBody = {
    ...kpiDataPointModel.getPersistData(),
  };
  const apiUrl = `analytics/kpi/${kpiId}/data-points/${kpiDataPointModel?.getData("_id")}/update`;
  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

kpiDataPointActions.deleteKpiDataPointV2 = async (getAccessToken, cancelTokenSource, kpiDataPointModel, kpiId) => {
  const apiUrl = `/analytics/kpi/${kpiId}/data-points/${kpiDataPointModel.getData("_id")}`;
  return baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default kpiDataPointActions;

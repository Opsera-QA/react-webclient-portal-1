import { axiosApiService } from "api/apiService";

const KpiActions = {};

KpiActions.getKpis = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/kpi/configurations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

KpiActions.get = async (kpiId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/kpi/configurations/${kpiId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

KpiActions.getTools = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/tools?hidden=true`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

KpiActions.create = async (kpiData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "analytics/kpi/configurations/create";
  const response = await axiosApiService(accessToken).post(apiUrl, kpiData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

KpiActions.update = async (kpiId, postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/kpi/configurations/${kpiId}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default KpiActions;
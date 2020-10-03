import { axiosApiService } from "api/apiService";

const KpiActions = {};

KpiActions.getKpis = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/analytics/kpi/configurations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
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

KpiActions.createKpi = async (kpiDataDto, getAccessToken) => {
  let postData = {
    ...kpiDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "analytics/kpi/configurations/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

KpiActions.updateKpi = async (kpiDataDto, getAccessToken) => {
  let postData = {
    ...kpiDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/analytics/kpi/configurations/${kpiDataDto.getData("_id")}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default KpiActions;
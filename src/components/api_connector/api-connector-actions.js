import {axiosApiService} from "../../api/apiService";

const apiConnectorActions = {};

apiConnectorActions.updateConnectorSettings = async (tool, apiConnectorDto, getAccessToken) => {
  const postBody = {
    ...apiConnectorDto.getPersistData()
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/${tool}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

apiConnectorActions.createConnectorSettings = async (tool, apiConnectorDto, getAccessToken) => {
  const postBody = {
    ...apiConnectorDto.getPersistData()
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/${tool}/trigger`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

apiConnectorActions.getConnectorSettings = async (tool, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/${tool}/settings`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default apiConnectorActions;
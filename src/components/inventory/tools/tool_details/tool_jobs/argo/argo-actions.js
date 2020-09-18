import {axiosApiService} from "../../../../../../api/apiService";

const argoActions = {};

argoActions.deleteArgoApplication = async (argoApplicationId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/`;
  const response = await axiosApiService(accessToken).delete(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

argoActions.updateArgoApplication = async (argoApplicationDto, getAccessToken) => {
  const postBody = {
    ...argoApplicationDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = ``;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

argoActions.createArgoApplication = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = ``;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default argoActions;
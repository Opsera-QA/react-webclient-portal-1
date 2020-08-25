import { axiosApiService } from "../../../api/apiService";

const adminTagsActions = {};

adminTagsActions.delete = async (tagId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagId}`;
  const response = await axiosApiService(accessToken).delete(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

adminTagsActions.cancel = async (tagId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagId}/reset/`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

adminTagsActions.update = async (tagDataDto, getAccessToken) => {
  let postBody = {
    ...tagDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagDataDto.getData("_id")}/update/`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

adminTagsActions.getTags = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tags?hidden=true";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

adminTagsActions.get = async (tagId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tags/${tagId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

adminTagsActions.create = async (tagDataDto, getAccessToken) => {
  let postBody = {
    ...tagDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/tags/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

// TODO: Implement if necessary
// adminTagsActions.duplicate = async (tagId, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/pipelines/${tagId}/duplicate/`;
//   const response = await axiosApiService(accessToken).put(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

export default adminTagsActions;
import {axiosApiService} from "../../../api/apiService";
const toolsActions = {};

toolsActions.deleteTool = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/${userId}`;
  const response = await axiosApiService(accessToken).delete(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.updateTool = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  }
  let id = toolDataDto.getData("_id");
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${id}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.createTool = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/get-users?page=1&size=10000`;";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getTools = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/tools";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getToolRegistryList = async (toolFilterDto, getAccessToken) => {
  let urlParams = {
    params: {
      sort: toolFilterDto.getData("sortOption"),
      status: toolFilterDto.getData("status"),
      tool: toolFilterDto.getData("toolIdentifier"),
      page: toolFilterDto.getData("currentPage"),
      size: toolFilterDto.getData("pageSize")
    }
  }

  const accessToken = await getAccessToken();
  const apiUrl = `/registry`;
  const response = await axiosApiService(accessToken).get(apiUrl, urlParams)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getToolTypes = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/types";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.updateToolConfiguration = async (toolData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${toolData._id}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, toolData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
}

export default toolsActions;
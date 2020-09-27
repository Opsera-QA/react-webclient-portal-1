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
  let status = toolFilterDto.getData("status");
  let toolIdentifier = toolFilterDto.getData("toolIdentifier");

  // TODO: Wire up sort, page, etc
  let urlParams = {
    params: {
      sort: "name",
      order: 1,
      status: status,
      tool: toolIdentifier,
      size: 10000
    }
  }

  // if (status != null) {
  //   urlParams += `&status=${status}`
  // }
  //
  // if (toolIdentifier != null) {
  //   urlParams += `&tool=${toolIdentifier}`
  // }

  //todo: make hidden an optional filter, by default only show active
  //todo: wire up paging and replace "size" with a default of 50 records.
  //todo: wire up a sorting option with these explicit values: "oldest", "newest", "name", "lastupdated"
  // All details on how to use sorting, paging and filters will be here:
  // https://opsera.atlassian.net/wiki/spaces/OAD/pages/317751606/Tool+Registry+Tags+APIs
  //todo: can we swap the "new Tool" button placement and filters.  I'd like the button to be either
  // the top item or above the table all together, then filters should be directly above the table title bar

  // TODO: Construct actual pagination
  // sort by name ascending &sort=name&order=1

  console.log("urlParams: " + JSON.stringify(urlParams));

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

export default toolsActions;
import { axiosApiService } from "../../../../../../api/apiService";

const octopusActions = {};

octopusActions.deleteOctopusApplication = async (toolID, type, getAccessToken, appID) => {
  const postBody = {
    type: "delete",
    item: type,
  };
  const accessToken = await getAccessToken();
  const apiUrl = `registry/action/octopus/${toolID}/create-app/${appID}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

octopusActions.updateOctopusApplication = async (octopusApplicationDto, type, getAccessToken, appID) => {
  const postBody = {
    data: octopusApplicationDto.getPersistData(),
    type: "update",
    item: type,
  };
  const accessToken = await getAccessToken();
  const toolID = octopusApplicationDto.data.toolId;
  const apiUrl = `registry/action/octopus/${toolID}/create-app/${appID}`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

octopusActions.createOctopusApplication = async (toolDataDto, type, getAccessToken) => {
  const postBody = {
    data: toolDataDto.getPersistData(),
    type: "create",
    item: type,
  };
  const accessToken = await getAccessToken();
  const toolID = toolDataDto.data.toolId;
  const apiUrl = `registry/action/octopus/${toolID}/create-app`;
  const response = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return response;
};

export default octopusActions;

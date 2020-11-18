import {axiosApiService} from "../../../../../../api/apiService";

const slackConnectorActions = {};

slackConnectorActions.getSlackUrl = async (toolId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/slack/authorization-url/${toolId}`;

  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default slackConnectorActions;
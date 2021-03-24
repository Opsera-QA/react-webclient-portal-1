import {axiosApiService} from "../../../../../../../../api/apiService";

const nexusStepActions = {};

// TODO: This might make more sense to put into a master stepToolActions form. I'll do that, if most of the other configurations only have one unique API call
nexusStepActions.getNexusRepositoriesList = async (toolID, getAccessToken) => {
  let postBody = {
    params: {
      tool: "nexus",
      toolId: toolID,
    }
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/tools/nexus/repositories`;
  const response = await axiosApiService(accessToken).get(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default nexusStepActions;
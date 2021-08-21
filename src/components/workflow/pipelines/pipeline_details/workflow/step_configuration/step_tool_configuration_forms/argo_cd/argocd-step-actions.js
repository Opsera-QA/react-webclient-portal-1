import { axiosApiService } from "../../../../../../../../api/apiService";
import baseActions from "utils/actionsBase";

const ArgoCDStepActions = {};

ArgoCDStepActions.searchArgoAppsList = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/argo/applications";
  const postBody = {
    tool: "argo",
    id: id,
  };
  const res = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

ArgoCDStepActions.getArgoApplicationsV2 = async (getAccessToken, cancelTokenSource, argoToolId) => {
  const apiUrl = "/tools/argo/applications";
  const postBody = {
    tool: "argo",
    id: argoToolId,
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default ArgoCDStepActions;

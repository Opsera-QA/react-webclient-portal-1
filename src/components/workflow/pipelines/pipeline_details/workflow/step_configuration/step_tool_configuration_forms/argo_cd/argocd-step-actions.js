import { axiosApiService } from "../../../../../../../../api/apiService";

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

ArgoCDStepActions.searchArgoList = async (service, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service;
    const res = await axiosApiService(accessToken)
      .get(apiUrl)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
    return res;
  };

  ArgoCDStepActions.searchRepositories = async (service, gitAccountId, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getRepositories",
      gitAccountId: gitAccountId,
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

  ArgoCDStepActions.searchBranches = async (service, gitAccountId, repoId, workspaces, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getBranches",
      gitAccountId: gitAccountId,
      repoId: repoId,
      workspaces: workspaces
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

export default ArgoCDStepActions;

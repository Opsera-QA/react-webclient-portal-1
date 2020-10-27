import { axiosApiService } from "api/apiService";

const GitActionsHelper = {};

  GitActionsHelper.searchRepositories = async (service, gitAccountId, getAccessToken) => {
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

  GitActionsHelper.searchBranches = async (service, gitAccountId, repoId, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getBranches",
      gitAccountId: gitAccountId,
      repoId: repoId,
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

export default GitActionsHelper;

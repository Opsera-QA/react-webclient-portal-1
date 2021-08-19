import { axiosApiService } from "api/apiService";
import baseActions from "utils/actionsBase";

const GitActionsHelper = {};

  GitActionsHelper.searchRepositories = async (service, gitAccountId, workspaces, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getRepositories",
      gitAccountId: gitAccountId,
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

  GitActionsHelper.searchRepositoriesV2 = async (service, gitAccountId, workspaces, getAccessToken, cancelTokenSource) => {
    let postBody = {
      tool: service,
      metric: "getRepositories",
      gitAccountId: gitAccountId,
      workspaces: workspaces
    };
    const apiUrl = "/tools/properties";
    return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
  };

  GitActionsHelper.searchBranches = async (service, gitAccountId, repoId,workspaces, getAccessToken) => {
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

  GitActionsHelper.getReviewers = async (service, gitAccountId, repoId, workspaces, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getReviewers",
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

export default GitActionsHelper;

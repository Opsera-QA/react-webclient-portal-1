import baseActions from "utils/actionsBase";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const workspaceActions = {};

workspaceActions.getFreeTrialWorkspaceItems = async (
  getAccessToken,
  cancelTokenSource,
  type = "all",
  searchKeyword,
) => {
  const apiUrl = `trial/workspace/items`;
  const params = {};

  if (workspaceConstants.isWorkspaceTypeValid(type) === true) {
    params.type = type;
  }

  if (hasStringValue(searchKeyword) === true) {
    params.search = searchKeyword;
  }

  const urlParams = {
    params: params,
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

workspaceActions.getFreeTrialCustomerWorkspaceItems = async (
  getAccessToken,
  cancelTokenSource,
  userId,
  searchKeyword,
) => {
  const apiUrl = `trial/workspace/items/${userId}`;
  const params = {};

  if (hasStringValue(searchKeyword) === true) {
    params.search = searchKeyword;
  }

  const urlParams = {
    params: params,
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};


workspaceActions.getFreeTrialUserActivityReport = async (
  getAccessToken,
  cancelTokenSource,
  userId,
  searchKeyword,
) => {
  const apiUrl = `trial/workspace/activity-report`;
  const params = {};

  if (hasStringValue(searchKeyword) === true) {
    params.search = searchKeyword;
  }

  if (isMongoDbId(userId) === true) {
    params.userId = userId;
  }

  const urlParams = {
    params: params,
  };

  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    urlParams,
  );
};

workspaceActions.getFreeTrialWorkspaceTasksByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `trial/workspace/tasks/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

workspaceActions.getFreeTrialWorkspacePipelinesByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `trial/workspace/pipelines/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
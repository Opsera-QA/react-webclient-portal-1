import baseActions from "utils/actionsBase";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const freeTrialWorkspaceActions = {};

freeTrialWorkspaceActions.getFreeTrialWorkspaceItems = async (
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

freeTrialWorkspaceActions.getFreeTrialCustomerWorkspaceItems = async (
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

freeTrialWorkspaceActions.getFreeTrialUserActivityReportPipelines = async (
  getAccessToken,
  cancelTokenSource,
  userId,
  searchKeyword,
) => {
  const apiUrl = `trial/workspace/activity-report/pipelines`;
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

freeTrialWorkspaceActions.getFreeTrialUserActivityReportTasks = async (
  getAccessToken,
  cancelTokenSource,
  userId,
  searchKeyword,
) => {
  const apiUrl = `trial/workspace/activity-report/tasks`;
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


freeTrialWorkspaceActions.getFreeTrialWorkspaceTasksByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `trial/workspace/tasks/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

freeTrialWorkspaceActions.getFreeTrialWorkspacePipelinesByIdentifier = async (getAccessToken, cancelTokenSource, identifier) => {
  const apiUrl = `trial/workspace/pipelines/${identifier}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};
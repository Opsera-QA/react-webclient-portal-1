import baseActions from "utils/actionsBase";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { hasStringValue } from "components/common/helpers/string-helpers";

export const workspaceActions = {};

workspaceActions.getFreeTrialWorkspaceItems = async (getAccessToken, cancelTokenSource, type = "all", searchKeyword) => {
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

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};
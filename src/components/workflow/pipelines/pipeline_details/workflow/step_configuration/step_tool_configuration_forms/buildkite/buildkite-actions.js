import baseActions from "utils/actionsBase";

const buildkiteActions = {};

buildkiteActions.getPipelines = async (dataObject, getAccessToken, cancelTokenSource) => {
  const postBody = {
    "toolId": dataObject?.getData("toolConfigId")
  };
  const apiUrl = `/tools/buildkite/pipelines`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default buildkiteActions;
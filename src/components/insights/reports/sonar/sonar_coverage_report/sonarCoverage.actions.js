import baseActions from "utils/actionsBase";

const sonarBaseURL = "analytics/sonar/v1/";

const sonarCoverageActions = {};

sonarCoverageActions.sonarGetCoverageReport = async (
  getAccessToken,
  cancelTokenSource,
  projectId,
  toolId
) => {
  const apiUrl = sonarBaseURL + "sonarGetCoverageReport";

  const postBody = {
    projectId: projectId,
    toolId: toolId
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postBody,
  );
};

export default sonarCoverageActions;
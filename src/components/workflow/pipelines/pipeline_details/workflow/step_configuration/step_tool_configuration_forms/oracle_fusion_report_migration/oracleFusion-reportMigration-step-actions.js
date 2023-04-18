import baseActions from "utils/actionsBase";

const OracleFusionReportMigrationStepActions = {};

OracleFusionReportMigrationStepActions.getSourceInstanceReports = async (getAccessToken, cancelTokenSource, toolId, sourceFolder) => {
  const apiUrl = `tools/${toolId}/oracleFusion/sourceReports`;
  const queryParameters = {
    folderAbsolutePath: sourceFolder
  };  
  return baseActions.apiGetCallV3(getAccessToken, cancelTokenSource, apiUrl, queryParameters);
};

export default OracleFusionReportMigrationStepActions;

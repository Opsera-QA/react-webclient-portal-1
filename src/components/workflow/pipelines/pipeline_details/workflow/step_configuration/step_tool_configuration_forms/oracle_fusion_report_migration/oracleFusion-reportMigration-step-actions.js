import baseActions from "utils/actionsBase";

const OracleFusionReportMigrationStepActions = {};

OracleFusionReportMigrationStepActions.getSourceInstanceReports = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `tools/${toolId}/oracleFusion/sourceReports`;
  return baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

export default OracleFusionReportMigrationStepActions;

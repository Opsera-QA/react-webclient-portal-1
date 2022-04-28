import baseActions from "utils/actionsBase";

const sonarScanReportActions = {};

sonarScanReportActions.getAllSonarScanIssues = async(getAccessToken, cancelTokenSource, pipelineId, runCount, stepId) => {
  const apiUrl = `reports/scans/sonar/all-issues/pipelineId`;
  const postData = {
    pipelineId: pipelineId, 
    runCount: runCount, 
    stepId: stepId
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

sonarScanReportActions.getSonarScanIssuesByPage = async(getAccessToken, cancelTokenSource, pipelineId, runCount, stepId, pageCount, pageSize) => {
  const apiUrl = `reports/scans/sonar/all-issues/pipelineId`;
  const postData = {
    pipelineId: pipelineId, 
    runCount: runCount, 
    stepId: stepId,
    pageCount: pageCount, 
    pageSize: pageSize
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

export default sonarScanReportActions;
import baseActions from "utils/actionsBase";

export const sonarPipelineScanReportActions = {};

sonarPipelineScanReportActions.getAllSonarScanIssues = async(
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  stepId,
  runCount,
  ) => {
  const apiUrl = `reports/scans/sonar/all-issues/${pipelineId}`;
  const postData = {
    runCount: runCount,
    stepId: stepId
  };

  return baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postData,
    );
};

sonarPipelineScanReportActions.getSonarScanIssuesByPage = async (
  getAccessToken,
  cancelTokenSource,
  pipelineId,
  stepId,
  runCount,
  pageCount,
  pageSize,
  ) => {
  const apiUrl = `reports/scans/sonar/issues-by-page/${pipelineId}`;
  const postData = {
    runCount: runCount,
    stepId: stepId,
    pageCount: pageCount, 
    pageSize: pageSize,
  };

  return baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postData,
    );
};
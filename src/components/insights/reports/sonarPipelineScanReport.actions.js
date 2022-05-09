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
  pageNumber,
  pageSize,
  issueType,
) => {
  const apiUrl = `reports/scans/sonar/issues-by-page/${pipelineId}`;
  const postData = {
    runCount: runCount,
    stepId: stepId,
    pageNumber: pageNumber,
    pageSize: pageSize,
    issueType: issueType,
  };

  return baseActions.apiPostCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
    postData,
  );
};

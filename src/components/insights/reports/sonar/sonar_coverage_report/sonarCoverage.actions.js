import baseActions from "utils/actionsBase";

import {
    getDateObjectFromKpiConfiguration,
    getTagsFromKpiConfiguration,
    getUseKpiTagsFromKpiConfiguration,
    getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";
import {sonarPipelineScanReportActions} from "../sonarPipelineScanReport.actions";

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

sonarPipelineScanReportActions.getAllSonarScanIssues = async(
    getAccessToken,
    cancelTokenSource,
    pipelineId,
    stepId,
    runCount,
    issueType,
) => {
    const apiUrl = `reports/scans/sonar/all-issues/${pipelineId}`;
    const postData = {
        runCount: runCount,
        stepId: stepId,
        issueType: issueType,
    };

    return baseActions.apiPostCallV2(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postData,
    );
};

export default sonarCoverageActions;
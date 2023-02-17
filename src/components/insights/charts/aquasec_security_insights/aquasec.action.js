import baseActions from "utils/actionsBase";

import {
    getDateObjectFromKpiConfiguration,
    getTagsFromKpiConfiguration,
    getUseKpiTagsFromKpiConfiguration,
    getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const aquasecBaseURL = "analytics/aquasec/v1/";

const aquasecActions = {};

aquasecActions.aquasecSecurityInsightsBaseKPI = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = aquasecBaseURL + "aquasecSecurityInsightsBaseKPI";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);

    // Checking the use kpi tags toggle
    const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
    const useDashboardTags =
        getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

    if (!useKpiTags) {
        tags = null;
    }
    if (!useDashboardTags) {
        dashboardTags = null;
        dashboardOrgs = null;
    }
    const postBody = {
        startDate: dateRange?.start,
        endDate: dateRange?.end,
        tags:
            tags && dashboardTags
                ? tags.concat(dashboardTags)
                : dashboardTags?.length > 0
                    ? dashboardTags
                    : tags,
        dashboardOrgs: dashboardOrgs,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

aquasecActions.aquasecSecurityInsightsActionableOne = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
    severity
) => {
    const apiUrl =
        aquasecBaseURL + "aquasecSecurityInsightsActionableOne";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);

    // Checking the use kpi tags toggle
    const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
    const useDashboardTags =
        getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

    if (!useKpiTags) {
        tags = null;
    }
    if (!useDashboardTags) {
        dashboardTags = null;
        dashboardOrgs = null;
    }

    const postBody = {
        startDate: dateRange?.start,
        endDate: dateRange?.end,
        tags:
            tags && dashboardTags
                ? tags.concat(dashboardTags)
                : dashboardTags?.length > 0
                    ? dashboardTags
                    : tags,
        page: tableFilterDto?.getData("currentPage")
            ? tableFilterDto?.getData("currentPage")
            : 1,
        size: tableFilterDto?.getData("pageSize")
            ? tableFilterDto?.getData("pageSize")
            : 5,
        dashboardOrgs: dashboardOrgs,
        severity: severity,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

aquasecActions.aquasecSecurityInsightsActionableTwo = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
    severity,
    imageName,
    pipelineId
) => {
    const apiUrl =
        aquasecBaseURL + "aquasecSecurityInsightsActionableTwo";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);

    // Checking the use kpi tags toggle
    const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
    const useDashboardTags =
        getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

    if (!useKpiTags) {
        tags = null;
    }
    if (!useDashboardTags) {
        dashboardTags = null;
        dashboardOrgs = null;
    }

    const postBody = {
        startDate: dateRange?.start,
        endDate: dateRange?.end,
        tags:
            tags && dashboardTags
                ? tags.concat(dashboardTags)
                : dashboardTags?.length > 0
                    ? dashboardTags
                    : tags,
        page: tableFilterDto?.getData("currentPage")
            ? tableFilterDto?.getData("currentPage")
            : 1,
        size: tableFilterDto?.getData("pageSize")
            ? tableFilterDto?.getData("pageSize")
            : 5,
        dashboardOrgs: dashboardOrgs,
        severity: severity,
        imageName: imageName,
        pipelineId: pipelineId,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

export default aquasecActions;

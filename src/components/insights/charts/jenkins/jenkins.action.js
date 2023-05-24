import baseActions from "utils/actionsBase";

import {
    getDateObjectFromKpiConfiguration,
    getTagsFromKpiConfiguration,
    getUseKpiTagsFromKpiConfiguration,
    getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const jenkinsBaseURL = "analytics/jenkins/v1/";

const jenkinsActions = {};

jenkinsActions.jenkinsChangeFailureRate = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = jenkinsBaseURL + "jenkinsChangeFailureRate";
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

jenkinsActions.jenkinsChangeFailureRateActionableInsights = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
) => {
    const apiUrl =
        jenkinsBaseURL + "jenkinsChangeFailureRateActionableInsights";
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
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

export default jenkinsActions;
import baseActions from "utils/actionsBase";

import {
    getDateObjectFromKpiConfiguration,
    getTagsFromKpiConfiguration,
    getUseKpiTagsFromKpiConfiguration,
    getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const codeAnalyserBaseURL = "analytics/codeanalyser/v1/";

const codeAnalyserActions = {};

codeAnalyserActions.salesforceCodeAnalyserBaseKPI = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = codeAnalyserBaseURL + "salesforceCodeAnalyserBaseKPI";
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

codeAnalyserActions.salesforceCodeAnalyserPipelineActionable = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
) => {
    const apiUrl =
        codeAnalyserBaseURL + "salesforceCodeAnalyserPipelineActionable";
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
            : 10,
        dashboardOrgs: dashboardOrgs,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

codeAnalyserActions.salesforceCodeAnalyserCategoryActionable = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
) => {
    const apiUrl =
        codeAnalyserBaseURL + "salesforceCodeAnalyserCategoryActionable";
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
            : 10,
        dashboardOrgs: dashboardOrgs,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

codeAnalyserActions.salesforceCodeAnalyserRuleActionable = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
) => {
    const apiUrl =
        codeAnalyserBaseURL + "salesforceCodeAnalyserRuleActionable";
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
            : 10,
        dashboardOrgs: dashboardOrgs,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

codeAnalyserActions.salesforceCodeAnalyserCategoryActionableTwo = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
    category
) => {
    const apiUrl =
        codeAnalyserBaseURL + "salesforceCodeAnalyserCategoryActionableTwo";
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
            : 10,
        dashboardOrgs: dashboardOrgs,
        category: category,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

codeAnalyserActions.salesforceCodeAnalyserRuleActionableTwo = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs,
    rule
) => {
    const apiUrl =
        codeAnalyserBaseURL + "salesforceCodeAnalyserRuleActionableTwo";
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
            : 10,
        dashboardOrgs: dashboardOrgs,
        rule: rule,
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

export default codeAnalyserActions;
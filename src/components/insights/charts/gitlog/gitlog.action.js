import baseActions from "utils/actionsBase";

import {
    getUseDashboardTagsFromKpiConfiguration,
    getUseKpiTagsFromKpiConfiguration,
    getDateObjectFromKpiConfiguration,
    getDeploymentStageFromKpiConfiguration,
    getGitlabProjectFromKpiConfiguration,
    getTagsFromKpiConfiguration,
    getResultFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const gitLogBaseURL = "analytics/gitLog/v1/";

const gitLogActions = {};

gitLogActions.getCommitActivities = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = gitLogBaseURL + "commitActivities";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);
    const startDate = new Date(dateRange?.start);
    const endDate = new Date(dateRange?.end);

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
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
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

gitLogActions.getDeveloper360 = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = gitLogBaseURL + "developer360";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);
    const startDate = new Date(dateRange?.start);
    const endDate = new Date(dateRange?.end);
    const repositories = getResultFromKpiConfiguration(kpiConfiguration,'gitLog-repositories');
    const authors = getResultFromKpiConfiguration(kpiConfiguration,'gitLog-authors');
    const branches = getResultFromKpiConfiguration(kpiConfiguration,'gitLog-branches');
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
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        tags:
            tags && dashboardTags
                ? tags.concat(dashboardTags)
                : dashboardTags?.length > 0
                    ? dashboardTags
                    : tags,
        dashboardOrgs: dashboardOrgs,
        repositories: repositories,
        branches: branches,
        authors: authors
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(
        getAccessToken,
        cancelTokenSource,
        apiUrl,
        postBody,
    );
};

gitLogActions.getRepositoriesList = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = gitLogBaseURL + "repositoriesList";
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

gitLogActions.getAuthorsList = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = gitLogBaseURL + "authorsList";
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

gitLogActions.getRefsList = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
) => {
    const apiUrl = gitLogBaseURL + "refsList";
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

export default gitLogActions;

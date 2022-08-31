import baseActions from "utils/actionsBase";

import {
    getDateObjectFromKpiConfiguration,
    getTagsFromKpiConfiguration
} from "components/insights/charts/charts-helpers";

const gitlabBaseURL = "analytics/gitlab/v1/";

const gitlabActions = {};

gitlabActions.gitlabPendingMergeRequests = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    projectName,
    dashboardOrgs
) => {
    const apiUrl = gitlabBaseURL + "gitlabPendingMergeRequests";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);

    const postBody = {
        startDate: dateRange?.start,
        endDate: dateRange?.end,
        tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
        page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
        size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
        search: tableFilterDto?.getData("search"),
        type: tableFilterDto?.getData("type"),
        projectName: projectName,
        dashboardOrgs:dashboardOrgs
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    projectName,
    dashboardOrgs
) => {
    const apiUrl = gitlabBaseURL + "gitlabTimeTakenToCompleteMergeRequestReviewAndPushTime";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);

    const postBody = {
        startDate: dateRange?.start,
        endDate: dateRange?.end,
        tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
        page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
        size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
        search: tableFilterDto?.getData("search"),
        type: tableFilterDto?.getData("type"),
        projectName: projectName,
        dashboardOrgs:dashboardOrgs
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

gitlabActions.gitlabProjects= async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    tableFilterDto,
    dashboardOrgs
) => {
    const apiUrl = gitlabBaseURL + "gitlabProjects";
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    let tags = getTagsFromKpiConfiguration(kpiConfiguration);

    const postBody = {
        startDate: dateRange?.start,
        endDate: dateRange?.end,
        tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
        page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
        size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
        search: tableFilterDto?.getData("search"),
        type: tableFilterDto?.getData("type"),
        dashboardOrgs:dashboardOrgs
    };

    return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


export default gitlabActions;

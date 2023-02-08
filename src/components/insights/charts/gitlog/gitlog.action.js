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

const doraBaseURL = "analytics/gitLog/v1/";

const gitlogActions = {};

gitlogActions.getCommitActivities = async (
    getAccessToken,
    cancelTokenSource,
    kpiConfiguration,
    dashboardTags,
    dashboardOrgs,
    jiraResolutionNames,
) => {
    const apiUrl = doraBaseURL + "commitActivities";
    // const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    // let tags = getTagsFromKpiConfiguration(kpiConfiguration);
    // const startDate = new Date(dateRange?.start);
    // const endDate = new Date(dateRange?.end);
    //
    // // Checking the use kpi tags toggle
    // const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
    // const useDashboardTags =
    //     getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
    //
    // if (!useKpiTags) {
    //     tags = null;
    // }
    // if (!useDashboardTags) {
    //     dashboardTags = null;
    //     dashboardOrgs = null;
    // }
    // const postBody = {
    //     startDate: startDate.toISOString(),
    //     endDate: endDate.toISOString(),
    //     tags:
    //         tags && dashboardTags
    //             ? tags.concat(dashboardTags)
    //             : dashboardTags?.length > 0
    //                 ? dashboardTags
    //                 : tags,
    //     dashboardOrgs: dashboardOrgs,
    //     deploymentStages: getDeploymentStageFromKpiConfiguration(kpiConfiguration),
    //     gitlabProjects: getGitlabProjectFromKpiConfiguration(kpiConfiguration),
    //     jiraProjects: [
    //         getResultFromKpiConfiguration(kpiConfiguration, "jira-projects"),
    //     ],
    //     jiraChangeTypes: getResultFromKpiConfiguration(
    //         kpiConfiguration,
    //         "jira-change-types",
    //     ),
    //     jiraResolutionNames: jiraResolutionNames,
    // };
    //
    // return await baseActions.handleNodeAnalyticsApiPostRequest(
    //     getAccessToken,
    //     cancelTokenSource,
    //     apiUrl,
    //     postBody,
    // );
};

export default gitlogActions;

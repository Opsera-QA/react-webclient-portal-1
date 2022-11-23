const JiraChangeFailureRateMaturityScoreInsightsMetadata = {
    idProperty: "_id",
    type: "Jira Change Failure Rate Table Report",
    fields: [
        {
            label: "Team Name",
            id: "issueTeamName",
        },
        {
            label: "Service Component",
            id: "issueServiceComponent",
        },
        {
            label: "Maturity Score",
            id: "maturityScoreText",
        },
        {
            label: "Change Failure Rate",
            id: "maturityScoreValue",
        },
        {
            label: "Total Changes",
            id: "totalChanges",
        },
        {
            label: "Total Failures",
            id: "failedChanges",
        },
    ],
    newObjectFields: {},
};

export default JiraChangeFailureRateMaturityScoreInsightsMetadata;

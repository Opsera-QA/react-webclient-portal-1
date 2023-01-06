const GitlabMergeRequestActionableMetadata = {
    idProperty: "_id",
    type: "Gitlab Merge Request Statistics Report",
    fields: [
        {
            label: "Total Merge Requests",
            id: "totalMR",
        },
        {
            label: "Projects",
            id: "projects",
        },
        {
            label: "Repositories",
            id: "repos",
        },
        {
            label: "Total Reviewers",
            id: "users",
        },
        {
            label: "Pipeline Id",
            id: "pipelineId",
        },
        {
            label: "Average Open Time (days)",
            id: "avgTimeToMerge",
        },
        {
            label: "Branches",
            id: "branches",
        },
        {
            label: "Repo Name",
            id: "repoName",
        },
        {
            label: "Tag Name",
            id: "tagName",
        },
        {
            label: "Reviewer",
            id: "userName",
        },
    ],
    newObjectFields: {},
};

export default GitlabMergeRequestActionableMetadata;
export const jenkinsChangeFailureRateMetadata = {
    type: "Jenkins Change Failure Rate",
    fields: [
        {
            label: "Tags",
            id: "tags",
        },
        {
            label: "Date Range",
            id: "date",
        },
    ],
    newObjectFields: {
        tags: [],
        date: undefined,
        repositories: [],
        branches: [],
    },
};

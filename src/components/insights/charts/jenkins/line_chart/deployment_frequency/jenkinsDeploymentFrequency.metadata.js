export const jenkinsDeploymentFrequencyMetadata = {
  type: "Deployment Frequency",
  fields: [
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Deployment Stage",
      id: "deployment-stage",
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  },
};

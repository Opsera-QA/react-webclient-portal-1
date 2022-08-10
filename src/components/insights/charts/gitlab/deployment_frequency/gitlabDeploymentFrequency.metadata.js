export const gitlabDeploymentFrequencyMetadata = {
  type: "Deployment Freqency",
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
      label: "Gitlab Project",
      id: "gitlab-project",
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  }
};
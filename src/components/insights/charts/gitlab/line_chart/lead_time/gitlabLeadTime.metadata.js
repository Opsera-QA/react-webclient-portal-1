export const gitlabLeadTimeMetadata = {
  type: "Gitlab Lead Time",
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
  commitFields:[
    {
      label: "Author Name",
      id: "authorName",
    },
    {
      label: "Branch",
      id: "branch",
    },
    {
      label: "Time",
      id: "commitTimeStamp",
    },
    {
      label: "Title",
      id: "commitTitle",
    },
    {
      label: "Lead Time",
      id: "leadTime",
    },
    {
      label: "Repository Url",
      id: "repositoryUrl",
    },
    {
      label: "Job Id",
      id: "stepId",
    },
  ],
  newObjectFields: {
    tags: [],
    date: undefined,
  }
};
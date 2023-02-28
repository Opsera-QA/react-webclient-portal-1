export const doraJiraGitlabRolledUpMetadata = {
  type: "Dora Rolled Up",
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
      label: "Jira Projects for MTTR",
      id: "jira-projects-mttr",
    },
    {
      label: "Jira Projects for CFR",
      id: "jira-projects-cfr",
    },
    {
      label: "Exclude Jira Change Types (Values will be excluded from results)",
      id: "jira-change-types",
    },
    {
      label: "Jira Service Components",
      id: "jira-service-components",
    },
    {
      label: "Jira Resolution Names",
      id: "jira-resolution-names",
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

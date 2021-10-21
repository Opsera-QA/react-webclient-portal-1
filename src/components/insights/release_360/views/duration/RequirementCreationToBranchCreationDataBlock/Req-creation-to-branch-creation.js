const RequirementToBranchCreationTableMetadata = {
  idProperty: "_id",
  type: "Requirement To Branch Creation",
  fields: [
    {
      label: "Issue Key",
      id: "jiraIssueKey",
    },
    {
      label: "Github Branch",
      id: "githubBranch",
    },
    {
      label: "Jira Issue Creation Time",
      id: "jiraIssueCreationTime",
    },
    {
      label: "Branch Creation Time",
      id: "branchCreationTime",
    },
    {
      label: "Time Difference (Secs)",
      id: "secondsDifference",
    },
  ],
  newObjectFields: {},
};

export default RequirementToBranchCreationTableMetadata;

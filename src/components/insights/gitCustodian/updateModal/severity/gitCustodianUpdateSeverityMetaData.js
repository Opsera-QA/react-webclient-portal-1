const GitCustodianUpdateSeverityMetaData = {
  type: "Git Custodian Update Severity",
  fields: [
    {
      label: "Severity",
      id: "severity",
      isRequired: true,
    },
    {
      label: "Comments",
      id: "comment",
      isRequired: false,
      maxLength: 500,
    },
    {
      label: "Issues",
      id: "issues",
    },
    {
      label: "Issues List",
      id: "issuesList",
      isRequired: true,
      minItems: 1,
    },
  ],
  newObjectFields: {
    severity: "",
    comment: "",
    issues: [],
    issuesList: [],
  },
};

export default GitCustodianUpdateSeverityMetaData;

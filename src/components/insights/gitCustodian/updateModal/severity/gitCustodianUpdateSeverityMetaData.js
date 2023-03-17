const GitCustodianUpdateSeverityMetaData = {
  type: "Git Custodian Severity",
  fields: [
    {
      label: "Severity",
      id: "severity",
      isRequired: true,
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
    issues: [],
    issuesList: [],
  }
};

export default GitCustodianUpdateSeverityMetaData;

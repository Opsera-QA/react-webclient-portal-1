const GitCustodianUpdateStatusMetaData = {
  type: "Git Custodian Update Status",
  fields: [
    {
      label: "Status",
      id: "status",
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
    status: "",
    issues: [],
    issuesList: [],
  }
};

export default GitCustodianUpdateStatusMetaData;

const GitCustodianUpdateStatusMetaData = {
  type: "Git Custodian Update Status",
  fields: [
    {
      label: "Status",
      id: "status",
      isRequired: true,
    },
    {
      label:"Comments",
      id:"comment",
      isRequired: false,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
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
    comment:"",
    issues: [],
    issuesList: [],
  }
};

export default GitCustodianUpdateStatusMetaData;

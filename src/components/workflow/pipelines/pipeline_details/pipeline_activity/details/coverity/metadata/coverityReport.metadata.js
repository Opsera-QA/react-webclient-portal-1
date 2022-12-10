const coverityReportMetaData = {
  type: "Coverity Report Metadata",
  fields: [
    {
      label: "Fix Target",
      id: "fixTarget",
    },
    {
      label: "Type",
      id: "displayType",
    },
    {
      label: "Severity",
      id: "severity",
    },    
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Impact",
      id: "displayImpact",
    },
    {
      label: "CWE",
      id: "cwe",
    },
    {
      label: "Issue Type",
      id: "displayIssueKind",
    },
    {
      label: "Category",
      id: "displayCategory",
    },
    {
      label: "Count",
      id: "occurrenceCount",
    },
    {
      label: "Component",
      id: "displayComponent",
    },
    {
      label: "score",
      id: "score",
    },
    {
      label: "Action",
      id: "action",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "File",
      id: "displayFile",
    },
    {
      label: "Function Merge Name",
      id: "functionMergeName",
    },  
  ],
  newObjectFields: {
    fixTarget: "",
    displayType: "",
    severity: "",
    status: "",
    displayImpact: "",
    linkToCWE: "",
    displayIssueKind: "",
    displayCategory: "",
    occurrenceCount: "",
    displayComponent: "",    
    score: "",
    action: "",
    owner: "",
    linkToDisplayFile: "",
    functionMergeName: "",
  }
};

export default coverityReportMetaData;

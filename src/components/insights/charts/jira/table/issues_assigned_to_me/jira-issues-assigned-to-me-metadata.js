const jiraIssuesAssignedToMeMetadata = {
    idProperty: "_id",
    type: "Jenkins Recent Pipeline Status",
    fields: [
        {
          label: "Ticket Number",
          id: "issueKey",
        },
        {
          label: "Issue Type",
          id: "type",
        },
        {
          label: "Priority",
          id: "priority",
        },
        {
          label: "Summary",
          id: "summary",
        }
      ],
    newObjectFields: {
    }
  };
  
  export default jiraIssuesAssignedToMeMetadata;
export const mergeSyncTaskJiraTicketMetadata = {
  type: "Merge Sync Task Jira Ticket Details",
  fields: [
    {
      label: "Issue Id",
      id: "id",      
    },
    {
      label: "Issue Key",
      id: "key",      
    },
    {
      label: "Issue Type",
      id: "issueType",      
    },
    {
      label: "Status",
      id: "status",      
    },
    {
      label: "Assignee",
      id: "assignee",      
    },
    {
      label: "Summary",
      id: "summary",      
    },
    {
      label: "Link",
      id: "link",      
    },    
  ],
  newObjectFields: {
    id: "",
    key: "",
    issueType: "",
    status: "",
    assignee: "",
    summary: "",
    link: "",
  }
};

const teamsStepNotificationMetadata = {
  idProperty: "name",
  type: "Teams Step Notification",
  fields: [
    {
      label: "Type",
      id: "type",
    },    
    {
      label: "Notification Level",
      id: "event",
      isRequired: true
    },
    {
      label: "Teams Tool",
      id: "toolId",
      isRequired: "true"
    },
    {
      label: "Teams Notifications",
      id: "enabled",
    },
    {
      label: "Include last 10 lines of log (limited to 1000 characters)",
      id: "logEnabled",
    },
  ],
  newObjectFields: {
    type: "teams",
    event: "all",
    toolId: "",
    enabled: false,
    logEnabled: false,
  }
};

export default teamsStepNotificationMetadata;

const gChatStepNotificationMetadata = {
  idProperty: "name",
  type: "GChat Step Notification",
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
      label: "GChat Tool",
      id: "toolId",
      isRequired: "true"
    },
    {
      label: "GChat Notifications",
      id: "enabled",
    },
    {
      label: "Include last 10 lines of log (limited to 1000 characters)",
      id: "logEnabled",
    },
  ],
  newObjectFields: {
    type: "gchat",
    event: "all",
    toolId: "",
    enabled: false,
    logEnabled: false,
  }
};

export default gChatStepNotificationMetadata;

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
  ],
  newObjectFields: {
    type: "gchat",
    event: "all",
    toolId: "",
    enabled: false,
  }
};

export default gChatStepNotificationMetadata;

const gChatNotificationMetadata = {
  idProperty: "name",
  type: "GChat Notification",
  fields: [
    {
      label: "Type",
      id: "type",
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
    toolId: "",
    enabled: false,
  }
};

export default gChatNotificationMetadata;

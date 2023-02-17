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
      isRequired: true
    }
  ],
  newObjectFields: {
    type: "gchat",
    event: "all",
    toolId: "",
  }
};

export default gChatNotificationMetadata;

const teamsNotificationMetadata = {
  idProperty: "name",
  type: "Teams Notification",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Teams Tool",
      id: "toolId",
      isRequired: true
    }
  ],
  newObjectFields: {
    type: "teams",
    event: "all",
    toolId: "",
  }
};

export default teamsNotificationMetadata;
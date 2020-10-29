const teamsStepNotificationMetadata = {
  idProperty: "name",
  type: "Teams Step Notification",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Teams Tool ID",
      id: "toolId",
      isRequired: "true"
    },
    {
      label: "Teams Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "teams",
    toolId: "",
    enabled: false,
  }
};

export default teamsStepNotificationMetadata;
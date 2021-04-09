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
  ],
  newObjectFields: {
    type: "teams",
    event: "all",
    toolId: "",
    enabled: false,
  }
};

export default teamsStepNotificationMetadata;
const serviceNowStepNotificationMetadata = {
  idProperty: "name",
  type: "ServiceNow Notification",
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
      label: "ServiceNow Tool",
      id: "toolId",
      isRequired: "true",
      maxLength: 24,
      regexDefinitionName: "mongoId"
    },
    {
      label: "ServiceNow User",
      id: "serviceNowUserId",
      // isRequired: "true"
    },
    {
      label: "ServiceNow Group",
      id: "serviceNowGroupId",
      isRequired: "true"
    },
    {
      label: "ServiceNow Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "servicenow",
    event: "all",
    toolId: "",
    serviceNowUserId: "",
    serviceNowGroupId: "",
    enabled: false,
  }
};

export default serviceNowStepNotificationMetadata;
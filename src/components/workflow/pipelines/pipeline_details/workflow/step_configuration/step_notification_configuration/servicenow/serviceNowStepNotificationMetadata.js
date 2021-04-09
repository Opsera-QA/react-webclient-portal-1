import regexHelpers from "utils/regexHelpers";

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
      regexValidator: regexHelpers.regexTypes.mongoId
    },
    {
      label: "ServiceNow User",
      id: "serviceNowUserId",
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
    enabled: false,
  }
};

export default serviceNowStepNotificationMetadata;
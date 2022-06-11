// TODO: put metadata on node server and pull down that way?
const emailStepNotificationMetadata = {
  idProperty: "name",
  type: "Email Step Notification",
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
      label: "Email Addresses",
      id: "addresses",
      minItems: 1,
      isRequired: true,
      isEmailArray: true,
      maxItems: 5,
      formText: "You can select up to five Email Addresses to receive notifications",
    },
    {
      label: "Email Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "email",
    addresses: [],
    event: "error",
    enabled: false,
  }
};

export default emailStepNotificationMetadata;
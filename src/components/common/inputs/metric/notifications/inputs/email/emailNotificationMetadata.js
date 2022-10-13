// TODO: put metadata on node server and pull down that way?
const emailNotificationMetadata = {
  idProperty: "name",
  type: "Email Notification",
  fields: [
    {
      label: "Type",
      id: "type",
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
    enabled: false,
  }
};

export default emailNotificationMetadata;

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
      label: "Email Address",
      id: "address",
    },
    {
      label: "Email Addresses",
      id: "addresses",
      minItems: 1,
      isRequired: true,
      isEmailArray: true,
    },
    {
      label: "Email Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "email",
    address: "",
    addresses: [],
    event: "error",
    enabled: false,
  }
};

export default emailStepNotificationMetadata;
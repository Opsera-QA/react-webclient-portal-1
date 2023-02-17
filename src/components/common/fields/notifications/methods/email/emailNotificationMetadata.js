const emailNotificationMetadata = {
  idProperty: "name",
  type: "Email Notification",
  fields: [
    {
      label: "Email Address",
      id: "address",
      isRequired: true,
      isEmail: true,
      lowercase: true
    },
    {
      label: "Type",
      id: "type",
    },
  ],
  newObjectFields: {
    address: "",
    type: "email",
  }
};

export default emailNotificationMetadata;
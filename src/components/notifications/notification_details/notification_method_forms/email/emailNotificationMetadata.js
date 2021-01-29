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
  ],
  newObjectFields: {
    address: "",
  }
};

export default emailNotificationMetadata;
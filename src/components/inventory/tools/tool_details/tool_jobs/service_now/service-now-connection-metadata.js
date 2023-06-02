const serviceNowConnectionMetadata = {
  type: "ServiceNow Configuration",
  fields: [
    {
      label: "ServiceNow URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "Username",
      id: "userName",
      isRequired: true
    },
    {
      label: "Password",
      id: "secretKey",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      toolURL: "",
      userName: "",
      secretKey: "",
    }
};

export default serviceNowConnectionMetadata;
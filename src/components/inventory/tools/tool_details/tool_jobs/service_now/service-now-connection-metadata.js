const serviceNowConnectionMetadata = {
  type: "Service Now Configuration",
  fields: [
    {
      label: "Service Now URL",
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
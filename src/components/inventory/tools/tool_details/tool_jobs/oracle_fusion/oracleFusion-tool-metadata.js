const OracleFusionMetadata = {
  type: "Oracle Fusion Tool Configuration",
  idProperty: "_id",
  fields: [    
    {
      label: "Instance Url",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "UserID",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true
    },
  ],
  newObjectFields:
  {
    toolURL: "",
    accountUsername: "",
    accountPassword: "",
  }
};

export default OracleFusionMetadata;

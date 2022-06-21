const BoomiConnectionMetadata = {
  type: "Boomi Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Tool URL",
      id: "toolURL",
    },
    {
      label: "Account ID",
      id: "accountId",
    },
    {
      label: "Username",
      id: "accountUsername",
    },
    {
      label: "Password",
      id: "accountPassword",
    },
    {
      label: "API Type",
      id: "apiType",
    },
  ],
  newObjectFields:
    {
      toolURL: "",
      accountId: "",
      accountUsername: "",
      accountPassword: "",
      apiType: ""
    }
};

export default BoomiConnectionMetadata;
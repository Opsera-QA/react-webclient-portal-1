const BoomiConnectionMetadata = {
  type: "Boomi Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Tool URL",
      id: "toolURL",
      isRequiredFunction: (model) => {
        return model?.getData("apiType") === "custom";
      },
      isSecureUrl: true,
    },
    {
      label: "Account ID",
      id: "accountId",
      isRequiredFunction: (model) => {
        return model?.getData("apiType") === "native";
      },
    },
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true
    },
    {
      label: "API Type",
      id: "apiType",
      isRequired: true
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
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
    {
      label: "Client ID",
      id: "client_id",
      isRequiredFunction: (model) => {
        return model?.getData("apiType") === "custom";
      },
      maxLength: 1024
    },
    {
      label: "Client Secret",
      id: "client_secret",
      isRequiredFunction: (model) => {
        return model?.getData("apiType") === "custom";
      },
      maxLength: 1024
    },
    {
      label: "Auth Server URL",
      id: "authServerUrl",
      isRequiredFunction: (model) => {
        return model?.getData("apiType") === "custom";
      },
      isSecureUrl: true,
    },
  ],
  newObjectFields:
    {
      toolURL: "",
      accountId: "",
      accountUsername: "",
      accountPassword: "",
      apiType: "",
      client_id: "",
      client_secret: "",
      authServerUrl: "",
    }
};

export default BoomiConnectionMetadata;
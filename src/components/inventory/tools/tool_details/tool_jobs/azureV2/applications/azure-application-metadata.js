
const azureApplicationsMetadata = {
  type: "Azure Application Credential",
  fields: [
    {
      label: "Name",
      id: "credentialName",
      isRequired: true,
    },
    {
      label: "Client ID",
      id: "clientId",
      isRequired: true
    },
    {
      label: "Client Secret",
      id: "clientSecret",
      isRequired: true,
    },
    {
      label: "Resource",
      id: "resource",
      isRequired: true,
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Connection Status",
      id: "connectionState",
    },
    {
      id: "azureAppId",
    },
  ],
  newObjectFields: {
    _id: "",
    credentialName: "",
    clientId: "",
    clientSecret: "",
    resource: "https://management.azure.com",
    active: true,
    connectionState: {},
    azureAppId: "",
  }
};

export default azureApplicationsMetadata;
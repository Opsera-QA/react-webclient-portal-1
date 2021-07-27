import regexHelpers from "utils/regexHelpers";

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
      isRequired: true,
    },
  ],
  newObjectFields: {
    _id: "",
    credentialName: "",
    clientId: "",
    clientSecret: "",
    resource: "",
    active: true,
  }
};

export default azureApplicationsMetadata;
const AzureConnectionMetadata = {
  type: "Azure Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Subscription ID",
      id: "subscriptionId",
      isRequired: true
    },
    {
      label: "Tenant ID",
      id: "tenantId",
      isRequired: true
    },
    {
      label: "Application ID",
      id: "applicationId",
      isRequired: true
    },
    {
      label: "Password",
      id: "applicationPassword",
      isRequired: true
    },
    {
      label: "Secret Key",
      id: "applicationKey",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      subscriptionId: "",
      tenantId: "",
      applicationId: "",
      applicationPassword: "",
      applicationKey: "",
    }
};

export default AzureConnectionMetadata;
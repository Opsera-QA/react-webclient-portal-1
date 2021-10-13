const AzureConnectionMetadata = {
  type: "Azure Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Subscription ID",
      id: "azureSubscriptionId",
      isRequired: true
    },
    {
      label: "Tenant ID",
      id: "azureTenantId",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      azureSubscriptionId: "",
      azureTenantId: ""
    }
};

export default AzureConnectionMetadata;
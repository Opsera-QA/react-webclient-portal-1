
const azureStorageMetadata = {
    type: "Azure Storage Account",
    fields: [
      {
        label: "Azure Storage Account Name",
        id: "storageAccountName",
        isRequired: true,
        regexDefinitionName: "azureLabels",
        maxLength: 100
      },
      {
        label: "Azure Storage Shared Access Signature",
        id: "azureStorageAccountToken",
        isRequired: true,
        regexDefinitionName: "azureLabels",
        maxLength: 100
      },
    ],
    newObjectFields: {
      storageAccountName: "",
      azureStorageAccountToken:""
    }
  };
  
  export default azureStorageMetadata;

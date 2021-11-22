
const azureStorageMetadata = {
    type: "Azure Storage Account",
    fields: [
      {
        label: "Azure Storage Account Name",
        id: "storageName",
        isRequired: true,
        regexDefinitionName: "azureLabels",
        maxLength: 100
      },
      {
        label: "Azure Storage Shared Access Signature",
        id: "storageAccessToken",
        isRequired: true,
        regexDefinitionName: "azureLabels",
        maxLength: 100
      },
    ],
    newObjectFields: {
      storageName: "",
      storageAccessToken:""
    }
  };
  
  export default azureStorageMetadata;

export const azureStorageAccountMetadata = {
    type: "Azure Storage Account",
    fields: [
      {
        label: "Azure Storage Account Name",
        id: "storageAccountName",
        isRequired: true,
        maxLength: 100
      },
      {
        label: "Azure Storage Access Key",
        id: "azureStorageAccountToken",
        isRequired: true
      },
    ],
    newObjectFields: {
      storageAccountName: "",
      azureStorageAccountToken: "",
      type: "storage",
    }
  };

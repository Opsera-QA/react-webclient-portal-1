export const endpointRequestFieldMetadata = {
  fields: [
    {
      label: "Field Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Field Name",
      id: "fieldName",
      isRequired: true,
      infoText: "Filter by selected component types or leave blank for all"
    },
    {
      label: "Is Sensitive Data",
      id: "isSensitiveData",
    },
    {
      label: "Is Required",
      id: "isRequired",
    },
  ],
  newObjectFields: {
    type: "string",
    fieldName: "",
    isRequired: false,
    isSensitiveData: false,
  }
};

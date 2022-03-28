export const endpointResponseFieldMetadata = {
  type: "Field",
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

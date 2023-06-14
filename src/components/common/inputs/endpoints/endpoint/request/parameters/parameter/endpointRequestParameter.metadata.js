export const endpointRequestParameterMetadata = {
  fields: [
    {
      label: "Field Name",
      id: "fieldName",
      isRequired: true,
    },
    {
      label: "Value",
      id: "value",
    },
    {
      label: "Field Type",
      id: "fieldType",
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
    fieldName: "",
    value: undefined,
    type: "",
    isSensitiveData: false,
    isRequired: false,
  }
};

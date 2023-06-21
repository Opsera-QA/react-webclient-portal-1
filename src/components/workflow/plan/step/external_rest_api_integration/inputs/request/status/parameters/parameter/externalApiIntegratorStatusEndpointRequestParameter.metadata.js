export const externalApiIntegratorStatusEndpointRequestParameterMetadata = {
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
    {
      label: "Use Parameter From API Run Response",
      id: "useRunApiResponseParameter",
    },
    {
      label: "Run Endpoint Response Parameter Field Name",
      id: "runEndpointFieldName",
    },
  ],
  newObjectFields: {
    fieldName: "",
    value: undefined,
    type: "",
    isSensitiveData: false,
    isRequired: false,
    useRunApiResponseParameter: false,
    runEndpointFieldName: "",
  }
};

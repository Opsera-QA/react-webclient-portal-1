export const endpointRequestFieldMetadata = {
  type: "Field",
  fields: [
    {
      label: "Field Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Field Name",
      id: "fieldName",
      isRequired: true,
      maxLength: 25,
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
      label: "Default Value",
      id: "defaultValue",
    },
    {
      label: "Hardcode Value",
      id: "hardcodeValue",
      formText: "Hardcoded values cannot be edited in the Pipeline Step."
    },
    {
      label: "Use Parameter From API Run Response",
      id: "useRunApiResponseParameter",
    },
  ],
  newObjectFields: {
    type: "string",
    fieldName: "",
    isRequired: false,
    isSensitiveData: false,
    defaultValue: "",
    hardcodeValue: false,
    useRunApiResponseParameter: false,
  }
};

const customSettingQueryMetadata = {
  fields: [
    {
      label: "Field",
      id: "field",
      isRequired: true
    },
    {
      label: "Field Filter Operator",
      id: "operator",
    },
    {
      label: "Value",
      id: "value",
      isRequired: true
    },
  ],
  newObjectFields: {
    field: "",
    operator: "=",
    value: "",
    type: "string"
  }
};

export default customSettingQueryMetadata;
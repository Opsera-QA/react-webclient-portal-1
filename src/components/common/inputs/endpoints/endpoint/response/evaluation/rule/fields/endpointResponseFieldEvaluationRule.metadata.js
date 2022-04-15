export const endpointResponseFieldEvaluationRuleMetadata = {
  fields: [
    {
      label: "Field Name",
      id: "fieldName",
      isRequired: true
    },
    {
      label: "Filter",
      id: "filter",
      isRequired: true
    },
    {
      label: "Value",
      id: "value",
      isRequired: true,
      // maxLength: 20,
    },
  ],
  newObjectFields: {
    fieldName: "",
    filter: "is_not_null",
    value: "",
  }
};

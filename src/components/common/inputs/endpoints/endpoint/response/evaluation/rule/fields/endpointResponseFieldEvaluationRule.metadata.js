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
      infoText: "Filter by selected component types or leave blank for all"
    },
  ],
  newObjectFields: {
    fieldName: "",
    filter: "not_null",
    value: "",
  }
};

const sfdcRuleMetadata = {
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Component Range",
      id: "range",
      isRequired: true
    },
    {
      label: "Field",
      id: "field",
      isRequired: true
    },
    {
      label: "Values",
      id: "values",
      isRequired: true
    },
    {
      label: "Operand",
      id: "operand",
    },
  ],
  newObjectFields: {
    type: "include",
    range: "all",
    field: "",
    values: [],
    operand: ""
  }
};

export default sfdcRuleMetadata;
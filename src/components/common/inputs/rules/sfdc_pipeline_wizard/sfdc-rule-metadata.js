const sfdcRuleMetadata = {
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    // TODO: Rename componentTypes
    {
      label: "Component Filter",
      id: "componentTypes",
      isRequired: true,
      infoText: "Filter by selected component types or leave blank for all"
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
  ],
  newObjectFields: {
    type: "include",
    componentTypes: [],
    field: "",
    values: [],
  }
};

export default sfdcRuleMetadata;
export const mergeSyncTaskFileSelectionRuleMetadata = {
  type: "Rule",
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Field",
      id: "field",
      isRequired: true,
    },
    {
      label: "Filter",
      id: "fieldFilter",
      isRequired: true,
    },
    {
      label: "Values",
      id: "values",
      isRequired: true
    },
  ],
  newObjectFields: {
    type: "include",
    field: "",
    fieldFilter: "equals",
    values: [],
  }
};

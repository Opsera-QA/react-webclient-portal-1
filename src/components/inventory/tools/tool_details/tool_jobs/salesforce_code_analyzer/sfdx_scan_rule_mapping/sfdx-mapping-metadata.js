const sfdxRulesMapMetadata = {
  type: "SFDX Quality Gate",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
    },
    {
      label: "Category",
      id: "category",
      isRequired: true,
    },
    {
      label: "Threshold",
      id: "threshold",
      formText: "This threshold is applicable for all rules under the selected category"
    },
    {
      label: "Quality Gates",
      id: "qualityGates",
      isRequired: true,
      maxItems: 50,
    },
  ],
  newObjectFields: {
    name: "",
    category: "",
    threshold: "",
    qualityGates: [],
  },
};

export default sfdxRulesMapMetadata;

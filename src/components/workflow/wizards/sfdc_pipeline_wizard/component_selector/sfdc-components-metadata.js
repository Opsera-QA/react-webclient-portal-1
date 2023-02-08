const sfdcComponentsMetadata = {
  idProperty: "_id",
  type: "Salesforce Component Selections",
  fields: [
    {
      label: "Components",
      id: "selectedComponentTypes",
    },
    {
      label: "Selected Components",
      id: "selected",
    },
  ],
  newObjectFields: {
    selectedComponentTypes: []
  }
};

export default sfdcComponentsMetadata;
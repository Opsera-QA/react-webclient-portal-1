export const sapCpqRunParameterConfigurationMetadata = {
  type: "SAP CPQ Run Parameters",
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Script Category",
      id: "scriptCategory",
    },
    {
      label: "From Time",
      id: "commitFromTimestamp",
      isRequired: true
    },
    {
      label: "To Time",
      id: "commitToTimestamp",
      isRequired: true
    },
  ],
  newObjectFields: {
    name: "",
    scriptCategory: [],
    commitFromTimestamp: undefined,
    commitToTimestamp: undefined
  }
};
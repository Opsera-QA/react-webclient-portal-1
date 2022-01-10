const toolPathMetadata = {
  type: "Tool Path",
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Path",
      id: "path",
      isRequired: true,
      regexDefinitionName: "pathField",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    path: "",
    type: "repository-package-structure",
  }
};

export default toolPathMetadata;
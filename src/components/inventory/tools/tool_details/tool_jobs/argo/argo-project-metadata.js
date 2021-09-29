const argoProjectMetadata = {
  type: "Argo Project",
  fields: [
    {
      label: "Argo Tool",
      id: "toolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "Description",
      id: "description",
      lowercase: true,
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Source Repository",
      id: "sourceRepos",
      isRequired: true
    },
  ],
  newObjectFields: {
    name: "",
    gitToolId: "",
    sourceRepos: "",
    description: "",
  }
};

export default argoProjectMetadata;
// TODO: Add restrictions
export const pipelineMappingJobMetadata = {
  type: "Pipeline Mapping Job",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Description can be up to 1000 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Environments",
      id: "environments",
      isRequired: true,
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    key: "",
    tags: [],
    environments: [],
  }
};

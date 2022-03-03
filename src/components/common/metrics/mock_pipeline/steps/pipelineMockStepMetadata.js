export const pipelineMockStepMetadata = {
  type: "Pipeline Mapping Step",
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

// TODO: These are the fields for the mock step
//   tool: {
//   tool_identifier: { type: String, lowercase: true }, //I'm leaving this because I think we can still always map to a tool identifer.  Maybe not a tool in tool registery BUT still a tool:  GitLab, Octopus, etc?
//   configuration: Object, //just like with normal pipeline this is a custom objet to store any specific settings about the step that we may want to report on or be aware of.  In the YAML, that may be the "steps" details
//     job_type: { type: String, lowercase: true }, //build, test, scan, deploy
//   environment: { type: String, lowercase: true }, //development, testing, production, etc
// },
// trigger: Array,
//   type: Array, //stores type of step for step processing (using in step logic)
//   tool_category: String, //tool type: deploy, build, security scan, etc
//   active: Boolean,
// },

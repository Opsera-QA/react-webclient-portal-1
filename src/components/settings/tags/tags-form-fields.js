// TODO: put metadata on node server and pull down that way?
const tagEditorMetadata = {
  idProperty: "_id",
  type: "Tag",
  fields: [
    {
      label: "Account",
      id: "account"
    },
    {
      label: "ID",
      id: "_id"
    },
    {
      label: "Created",
      id: "createdAt"
    },
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Value",
      id: "value",
      isRequired: true
    },
    {
      label: "Configuration Properties",
      id: "configuration",
      // fields: ["name", "value"],
    },
    {
      label: "Status",
      id: "active",
    },
  ],
  newObjectFields: {
    key: "",
    value: "",
    configuration: {},
    active: true,
  }
};

export const defaultTags = [
  {type: null, value: "None"},
  {type: "pipeline", value: "Pipeline"},
  {type: "application", value: "Application"},
  {type: "project", value: "Project"},
  {type: "release", value: "Release"},
  {type: "tool", value: "Tool"},
  {type: "custom", value: "Custom"},
];

export default tagEditorMetadata;
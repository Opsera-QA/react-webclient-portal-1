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
  ]
};

export const defaultTags = [
  {type: "pipeline", value: "Pipeline"},
  {type: "application", value: "Application"},
  {type: "project", value: "Project"},
  {type: "release", value: "Release"},
  {type: "custom", value: "Custom"},
];

export default tagEditorMetadata;
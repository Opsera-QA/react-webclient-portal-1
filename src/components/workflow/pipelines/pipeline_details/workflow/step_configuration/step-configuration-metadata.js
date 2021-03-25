const stepConfigurationMetadata = {
  type: "Pipeline Step Configuration",
  fields: [
    {
      label: "Step Enabled",
      id: "active",
    },
    {
      label: "Step Name",
      id: "name",
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Tool",
      id: "tool_identifier",
      isRequired: true,
      formText: "Tool cannot be changed after being set. The step would need to be deleted and recreated to change the tool.",
      maxLength: 50
    },
    {
      label: "Tags",
      id: "tags"
    },
  ],
  newModelBase: {
    name: "",
    type: "",
    tool_identifier: "",
    tags: [],
    active: true,
  }
};

export default stepConfigurationMetadata;
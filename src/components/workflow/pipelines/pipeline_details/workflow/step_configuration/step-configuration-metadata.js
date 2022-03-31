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
      formText: "Tool cannot be changed after this form is saved. To change tool, delete the step and create a new one.",
      maxLength: 50
    },
    {
      label: "Tags",
      id: "tags"
    },
    {
      label: "Step Type",
      id: "type"
    },
  ],
  newObjectFields: {
    name: "",
    type: "",
    tool_identifier: "",
    tags: [],
    active: true,
  }
};

export default stepConfigurationMetadata;
const stepConfigurationMetadata = {
  type: "Step Definition",
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
      id: "tags",
      formText: `
        Tags are used for log analysis and for generating dashboards and charts. 
        This is strongly recommend to be configured before running a Pipeline otherwise the analytics of previous runs will be incomplete. 
        If you aren't sure what Tag value to use and no Tags are applied, Opsera will recommend something upon save."
      `,
      noItemsWarning: true,
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
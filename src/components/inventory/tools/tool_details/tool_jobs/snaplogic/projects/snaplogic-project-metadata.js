const snaplogicProjectMetadata = {
  type: "Snaplogic Project",
  fields: [
    {
      label: "Snaplogic tool",
      id: "toolConfigId",
    },
    {
      label: "Project Name",
      id: "project",
      isRequired: true,
    },
    {
      label: "Project Space",
      id: "projectSpace",
      isRequired: true,
    },
    {
      label: "Permissions",
      id: "permissions",
      isRequired: true,
      maxItems: 50,
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    project: "",
    projectSpace: "",
    permissions: [],
  },
};

export default snaplogicProjectMetadata;

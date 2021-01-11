const jiraProjectMetadata = {
  type: "Jira Project Configuration",
  fields: [
    {
      label: "Project Name",
      id: "name",
    },
    {
      label: "ID",
      id: "id"
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Project Configuration",
      id: "configuration"
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    configuration: {},
    enabled: false,
  }
};

export default jiraProjectMetadata;
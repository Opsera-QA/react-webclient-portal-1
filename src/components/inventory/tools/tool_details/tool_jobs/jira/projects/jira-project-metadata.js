// TODO: If this is used again in the same way, make this generic toolProjectMetadata
const jiraProjectMetadata = {
  type: "Jira Project Configuration",
  activeField: "active",
  detailView: function (record) {
    return `/admin/organizations/details/${record.getData("name")}`;
  },
  detailViewTitle: function (record) {
    return `Jira Project Details [${record.getOriginalValue("name")}]`;
  },
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
// TODO: If this is used again in the same way, make this generic toolProjectMetadata
export const jiraProjectMetadata = {
  type: "Jira Project Configuration",
  activeField: "active",
  detailView: function (record) {
    return `/inventory/tools/details/${record.getData("_id")}`; 
  },
  detailViewTitle: function (record) {
    return `${record.getOriginalValue("name")} Jira Project Details]`;
  },
  fields: [
    {
      label: "Project Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
      formText: "Names can be up to 50 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods",
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

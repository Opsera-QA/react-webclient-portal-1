const gitTasksMetadata = {
  idProperty: "_id",
  type: "Task",
  activeField: "active",
  detailView: function(record) {
    return `/task/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Task Details [${record.getOriginalValue("name")}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 25,
      regexDefinitionName: "limitedTextWithSpaces",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 255,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Role Access Level",
      id: "role_access_level",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "generalText",
    },
    {
      label: "Tool",
      id: "tool_identifier",
      maxLength: 10,
      regexDefinitionName: "generalText",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Configuration",
      id: "configuration",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "LDAP Account",
      id: "account",
      maxLength: 50,
      regexDefinitionName: "generalText",
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "Access Rules",
      id: "roles",
    },
    {
      label: "Jenkins List",
      id: "jenkinsIds",
    },
    {
      label: "Notification Settings",
      id: "notifications",
    },
    {
      label: "Schedule",
      id: "schedule"
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    type: "",
    tool_identifier: "",
    active: true,
    configuration: {},
    status: "",
    notifications: [],
    tags: [],
    roles: [],
    account: "",
  }
};

export default gitTasksMetadata;
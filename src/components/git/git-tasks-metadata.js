const gitTasksMetadata = {
  idProperty: "_id",
  type: "Git Task",
  activeField: "active",
  detailView: function(record) {
    return `/git/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Git Task Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Tool Identifier",
      id: "tool_identifier",
      // isRequired: true,
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
      id: "nextSteps",
    },
    {
      label: "Created",
      id: "createdAt",
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    type: "",
    tool_identifier: "",
    active: true,
    configuration: {},
    status: "",
    tags: [],
    roles: [],
    account: "",
  }
};

export default gitTasksMetadata;
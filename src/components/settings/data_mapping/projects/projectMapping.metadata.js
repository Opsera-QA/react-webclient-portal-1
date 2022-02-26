const projectMappingMetadata = {
  idProperty: "_id",
  type: "Project Mapping",
  activeField: "active",
  detailView: function (record) {
    return `/settings/data_mapping/projects/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `${record?.getData("key")} Project Mapping`;
  },
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Tool",
      id: "tool_identifier",
      isRequired: true,
    },
    {
      label: "Tool Registry Entry",
      id: "tool_id",
      isRequired: true,
    },
    {
      label: "Mapping Key",
      id: "key",
      isRequired: true,
    },
    {
      label: "Project Name",
      id: "value",
      isRequired: true,
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Workspace",
      id: "tool_prop",
    },
    {
      label: "Workspace/Project",
      id: "tool_prop_name",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
  ],
  newObjectFields: {
    type: "project",
    tool_identifier: "",
    tool_id: "",
    key: "",
    value: [],
    tool_prop: "",
    createdAt: "",
    active : true
  },
};

export default projectMappingMetadata;

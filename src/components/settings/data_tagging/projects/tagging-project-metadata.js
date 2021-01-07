const projectTagsMetadata = {
  idProperty: "_id",
  type: "Project Mapping",
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
      label: "Tool Registry Configuration",
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
      label: "Active",
      id: "active",
      isRequired: true,
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
    owner : "",
    account : {},
    tool_prop: "",
    createdAt: "",
    active : true
  },
};

export default projectTagsMetadata;

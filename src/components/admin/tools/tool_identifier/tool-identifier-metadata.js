const toolIdentifierMetadata = {
  idProperty: "_id",
  type: "Tool Identifier",
  fields: [
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
      label: "ID",
      id: "_id",
    },
  {
    label: "Identifier",
    id: "identifier",
      isRequired: true
  },
  {
    label: "Tool Type Identifier",
    id: "tool_type_identifier",
  },
  {
    label: "Tags",
    id: "tags",
  },
  {
    label: "Properties",
    id: "properties",
  },
    {
      label: "Created At",
      id: "createdAt",
    },
  {
    label: "Active",
    id: "active",
  },
],
  newObjectFields: {
    name: "",
    description: "",
    identifier: "",
    tags: [],
    rules: {},
    properties: {
      isLiveStream: false
    },
    active: true,
  }
}


export default toolIdentifierMetadata;
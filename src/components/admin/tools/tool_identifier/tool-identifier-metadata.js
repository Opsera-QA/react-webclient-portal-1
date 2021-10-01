const toolIdentifierMetadata = {
  idProperty: "_id",
  type: "Tool Identifier",
  activeField: "active",
  detailView: function(record) {
    return `/admin/tools/identifiers/details/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `Tool Identifier Details [${record?.getOriginalValue("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Usage Type",
      id: "usageType",
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
      label: "Category Type",
      id: "tool_type_identifier",
      isRequired: true
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
      label: "Updated At",
      id: "updatedAt",
    },
    {
      label: "Enabled in Tool Registry?",
      id: "enabledInRegistry"
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
    enabledInRegistry: true,
    active: true,
  }
};


export default toolIdentifierMetadata;
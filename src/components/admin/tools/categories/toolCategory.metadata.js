export const toolCategoryMetadata = {
  idProperty: "_id",
  type: "Tool Category",
  activeField: "active",
  detailView: function (record) {
    return `/admin/tools/types/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")} Tool Category Details`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "limitedTextWithSpaces",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Identifier",
      id: "identifier",
      isRequired: true,
      lowercase: true
    },
    {
      label: "Tags",
      id: "tags",
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
    name: "",
    description: "",
    identifier: "",
    tags: [],
    active: true,
  }
};

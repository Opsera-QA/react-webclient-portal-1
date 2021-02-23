import regexHelpers from "utils/regexHelpers";

const toolCategoryMetadata = {
  idProperty: "_id",
  type: "Tool Category",
  activeField: "active",
  detailView: function (record) {
    return `/admin/tools/types/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Tool Category Details [${record?.getData("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 25,
      regexValidator: regexHelpers.regexTypes.limitedTextWithSpaces
    },
    {
      label: "Description",
      id: "description",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces
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
    "name": "",
    "description": "",
    "identifier": "",
    "tags": [],
    "active": true,
  }
};

export default toolCategoryMetadata;
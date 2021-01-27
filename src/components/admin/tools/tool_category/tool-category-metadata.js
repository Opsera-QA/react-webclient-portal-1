const toolCategoryMetadata = {
  idProperty: "_id",
  type: "Tool Category",
  activeField: "active",
  detailView: function(record) {
    return `/admin/tools/types/details/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `Tool Category Details [${record?.getData("name")}]`;
  },
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
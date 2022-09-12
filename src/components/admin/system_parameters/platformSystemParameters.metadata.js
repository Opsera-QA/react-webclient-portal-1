export const platformSystemParametersMetadata = {
  idProperty: "_id",
  type: "System Parameter",
  activeField: "active",
  detailView: function(record) {
    return `/admin/platform/system-parameters/details/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 50,
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      regexDefinitionName: "nameField",
    },
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Value",
      id: "value",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
  ],
  newObjectFields: {
    type: "string",
    name: "",
    value: "",
    description: "",
    active: true,
  },
};
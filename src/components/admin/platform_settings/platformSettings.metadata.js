export const platformSettingsMetadata = {
  idProperty: "_id",
  type: "System Parameter",
  activeField: "active",
  detailView: function(record) {
    return `/admin/platform/system-parameters/details/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `${record?.getOriginalValue("platformId")} Platform Settings`;
  },
  fields: [
    {
      label: "Platform ID",
      id: "platformId",
      maxLength: 100,
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
      label: "Features",
      id: "features",
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Value",
      id: "value",
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
    platformId: "",
    features: [],
    value: "",
    active: true,
  },
};
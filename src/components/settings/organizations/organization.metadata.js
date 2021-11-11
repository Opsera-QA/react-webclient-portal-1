export const organizationMetadata = {
  idProperty: "name",
  type: "Organization",
  detailView: function (record) {
    return `/settings/organizations/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      minLength: 3,
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Leader",
      id: "leader",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Owner Name",
      id: "owner_name",
    },
    {
      label: "Show in Application",
      id: "active",
    },
    {
      label: "Tags",
      id: "tags",
    },
  ],
  newObjectFields: {
    name: "",
    owner: "",
    leader: null,
    active: true,
    tags: []
  }
};
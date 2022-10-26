export const transferOwnershipMetadata = {
  idProperty: "name",
  type: "User",
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "Owner",
      id: "owner",
      isRequired: true
    },
  ],
  newObjectFields: {
    owner: "",
  }
};
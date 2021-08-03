export const accessTokenMetadata = {
  idProperty: "_id",
  type: "Access Token",
  // detailView: function (record) {
  //   return `/user/accessTokens/details/${record.getData("_id")}`;
  // },
  detailViewTitle: function (record) {
    return `Access Token Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
    },
    {
      label: "Expires After",
      id: "expiration",
      isRequired: true,
    },
    {
      label: "Scope",
      id: "scope",
      isRequired: true
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "ID",
      id: "_id",
    },
  ],
  newObjectFields: {
    name: "",
    expiration: "1mo",
    scope: "api",
  }
};
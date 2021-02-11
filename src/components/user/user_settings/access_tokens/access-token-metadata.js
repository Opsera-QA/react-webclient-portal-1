import regexHelpers from "utils/regexHelpers";

// TODO: Move to server, pull with data
export const accessTokenMetadata = {
  idProperty: "_id",
  type: "Access Token",
  detailView: function (record) {
    return `/user/accessTokens/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Access Token Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes["generalTextWithSpaces"],
    },
    {
      label: "Expires At",
      id: "expiration",
      isRequired: true,
    },
    {
      label: "Scope",
      id: "scope",
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
    scope: "pipeline",
  }
}
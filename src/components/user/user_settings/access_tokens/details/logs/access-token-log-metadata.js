// TODO: Move to server, pull with data
export const accessTokenLogMetadata = {
  idProperty: "_id",
  type: "Access Token Log",
  // detailView: function (record) {
  //   return `/user/accessTokens/details/${record.getData("_id")}`;
  // },
  detailViewTitle: function (record) {
    return `Access Token Details [${record.getOriginalValue("name")}]`;
  },
  fields: [
    {
      label: "Target",
      id: "target",
    },
    {
      label: "Scope",
      id: "scope",
    },
    {
      label: "User ID",
      id: "user_id",
    },
    {
      label: "Used On",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "Token ID",
      id: "token_id",
    },
  ],
  newObjectFields: {
  }
};
import regexHelpers from "utils/regexHelpers";

// TODO: Move to server, pull with data
export const accessTokenMetadata = {
  idProperty: "name",
  type: "Access Token",
  // detailView: function (record) {
  //   return `/admin/organizations/details/${record.getData("name")}`;
  // },
  detailViewTitle: function (record) {
    return `Access Token Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      maxLength: 50,
      inputMaskRegex: regexHelpers.regexTypes["generalTextWithSpaces"],
      formText: "Group name must be unique and must begin with a letter."
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
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "Updated At",
      id: "updatedAt",
    },
  ],
  newObjectFields: {
    name: "",
    id: new Date(),
    scope: "pipeline",
  }
}
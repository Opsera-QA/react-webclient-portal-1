// TODO: Move to server, pull with data
export const organizationMetadata = {
  idProperty: "name",
  type: "Organization",
  detailView: function (record) {
    return `/settings/organizations/details/${record.getData("name")}`;
  },
  detailViewTitle: function (record) {
    return `Organization Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      maxLength: 25,
      inputMaskRegex: /^[A-Za-z][A-Za-z0-9-_]*$/,
      formText: "Organization name must be unique and must begin with a letter."
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
      label: "Tags",
      id: "tags",
    },
  ],
  newObjectFields: {
    name: "",
    leader: {},
    tags: []
  }
};
// TODO: Move to server, pull with data
export const ldapGroupMetaData = {
  idProperty: "name",
  type: "Group",
  // detailView: function (record) {
  //   return `/admin/organizations/details/${record.getData("name")}`;
  // },
  detailViewTitle: function (record) {
    const name = record?.getOriginalValue("name");

    if (name === "PowerUsers") {
      return "Power Users";
    }

    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      maxLength: 25,
      inputMaskRegex: /^[A-Za-z][A-Za-z0-9-_]*$/,
      formText: "Group name must be unique and must begin with a letter."
    },
    {
      label: "Group Type",
      id: "groupType",
      isRequired: true,
    },
    {
      label: "External Sync Group",
      id: "externalSyncGroup",
    },
    {
      label: "Sync",
      id: "isSync",
    },
    {
      label: "Members",
      id: "members",
    },
    {
      label: "User Count",
      id: "memberCount",
    },
    {
      label: "Owner Email",
      id: "ownerEmail",
    },
  ],
  newObjectFields: {
    name: "",
    groupType: "user",
    externalSyncGroup: undefined,
    isSync: false,
  }
};
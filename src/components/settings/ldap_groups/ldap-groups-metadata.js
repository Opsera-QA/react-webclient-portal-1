// TODO: Move to server, pull with data
export const ldapGroupMetaData = {
  idProperty: "name",
  type: "Group",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      maxLength: 25
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
    // TODO: Set Default Value When user groups can use it
    externalSyncGroup: undefined,
    isSync: false,
  }
}
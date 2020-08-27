// TODO: Move to server, pull with data
export const ldapGroupMetaData = {
  idProperty: "name",
  type: "Group",
  fields: [
  {
    label: "Name",
    id: "name",
    isRequired: true,
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
    label: "User Count",
    id: "members",
  },
  {
    label: "Owner Email",
    id: "ownerEmail",
  },
]
}
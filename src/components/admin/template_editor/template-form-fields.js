const templateEditorMetadata = {
  idProperty: "_id",
  type: "Template",
  fields: [
  {
    label: "Name",
    id: "name",
      minLength: 3,
      isRequired: true 
  },
    {
      label: "ID",
      id: "_id",
    },
  {
    label: "Description",
    id: "description",
      minLength: 3,
      isRequired: true 
  },
  {
    label: "Type",
    id: "type",
    // value: [],
  },
    {
      label: "Created At",
      id: "createdAt",
      // value: [],
    },
  {
    label: "Roles",
    id: "roles",
    // value: ["opsera", "everyone"],
  },
  { //this should be a dropdown that lists Org Accounts (showing domain in UI) but saving orgAccount name in fields
    label: "LDAP Account",
    id: "account",
      isRequired: true
  },
  {
    label: "Tags",
    id: "tags",
    // value: [],
  },
  {
    label: "Status",
    id: "active",
  },
  {
    label: "Plan",
    id: "plan",
    type: "JSON",
    toShow: true,
    value: [
      {
        "tool": {},
        "trigger": [],
        "type": [],
        "notification": [],
        "name": "",
        "description": "",
        "active": true
      }
    ],
  },
],
  newObjectFields: {
    "type": [],
    "tags": [],
    "name": "",
    "description": "",
    "active": true,
    "roles": ["opsera", "everyone"],
    "account": "",
    "plan": [{}]
  }
};

export default templateEditorMetadata;
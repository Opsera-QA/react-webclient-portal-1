const templateEditorMetadata = {
  idProperty: "_id",
  type: "Template",
  fields: [
    {
      label: "Name",
      id: "name",
      minLength: 3,
      isRequired: true,
    },
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Description",
      id: "description",
      minLength: 3,
      isRequired: true,
    },
    {
      label: "Type",
      id: "type",
      formText: "Type of pipeline supported.  Current supported values: sfdc or freetrial."
    },
    {
      label: "Created At",
      id: "createdAt",
      // value: [],
    },
    {
      label: "Roles",
      id: "roles",
      value: ["everyone"],
      formText: "Defines who can see this template.  This works in concert with Account.  If Everyone is selected here, all customers see it.  To restrict this template to one customer account, remove everyone here and select that account in the Account field."
    },
    { //this should be a dropdown that lists Org Accounts (showing domain in UI) but saving orgAccount name in fields
      label: "LDAP Account",
      id: "account",
      isRequired: false, //optional value
      formText: "Optional Account (LDAP) to limit visibility of this template to a specific customer.  Only one custoemr can be selected, so if the template is required for multiple customers, create multiple templates."
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
      label: "Read Only",
      id: "readOnly",
      formText: "If enabled will prevent user from using this template, but it will be visible in the catalog list."
    },
    {
      label: "Single Use",
      id: "singleUse",
      formText: "If enabled, user can only have one copy of this template in use at a time.  They will not be allowed to create a second pipeline while another one exists with this template."
    },
    {
      label: "Plan",
      id: "plan",
      type: "JSON",
      toShow: true,
      isCollapsed: true,
      value: [
        {
          "tool": {},
          "trigger": [],
          "type": [],
          "notification": [],
          "name": "",
          "description": "",
          "active": true,
        },
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
    "plan": [{}],
  },
};

export default templateEditorMetadata;
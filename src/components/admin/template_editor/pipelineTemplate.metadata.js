const templateEditorMetadata = {
  idProperty: "_id",
  type: "Pipeline Template",
  activeField: "active",
  detailView: function (record) {
    return `/admin/templates/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
      minLength: 3,
      maxLength:50,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Description",
      id: "description",
      minLength: 3,
      maxLength:1000,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Type",
      id: "type",
      formText: "Type of pipeline supported.  Current supported values: sfdc or freetrial."
    },
    {
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "Roles",
      id: "roles",
      value: ["opsera", "everyone"],
      formText: "Defines who can see this template.  This works in concert with Account.  If Everyone is selected here, all customers see it.  To restrict this template to one customer account, remove everyone here and select that account in the Account field."
    },
    { //this should be a dropdown that lists Org Accounts (showing domain in UI) but saving orgAccount name in fields
      label: "LDAP Account",
      id: "account",
      formText: "Optional Account (LDAP) to limit visibility of this template to a specific customer.  Only one customer can be selected, so if the template is required for multiple customers, create multiple templates."
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "State",
      id: "active",
    },
    {
      label: "Read Only",
      id: "readOnly",
      formText: "If enabled will prevent user from using this template, but it will be visible in the catalog list."
    },
    {
      label: "Public Use",
      id: "publicUse",
      formText: "If enabled, ALL users will be able to see this template across ALL customer stacks."
    },
    {
      label: "Single Use",
      id: "singleUse",
      formText: "If enabled will prevent user from using this template, but it will be visible in the catalog list."
    },
    {
      label: "Access",
      id: "access"
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
    "publicUse": true,
    "singleUse": false,
    "account": "",
    "access": [],
    "plan": [{}],
  },
};

export default templateEditorMetadata;
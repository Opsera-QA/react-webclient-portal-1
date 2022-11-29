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
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      minLength: 3,
      maxLength: 50,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Identifier",
      id: "identifier",
      formText: "This is to aid with the dynamic deployment of Pipeline Templates across the environment, currently only used for Free Trial",
      maxLength: 200,
      lowercase: true,
      spacesAllowed: false,
    },
    {
      label: "Description",
      id: "description",
      minLength: 3,
      maxLength: 1000,
      isRequired: true,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
    {
      label: "Updated At",
      id: "updatedAt",
    },
    {
      label: "Roles",
      id: "roles",
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
      formText: "If enabled, user can only have one copy of this template in use at a time.  They will not be allowed to create a second pipeline while another one exists with this template.",
    },
    {
      label: "Access",
      id: "access"
    },
    {
      label: "Owner",
      id: "owner"
    },
    {
      label: "Plan",
      id: "plan",
      type: "JSON",
      toShow: true,
      isCollapsed: true,
    },
  ],
  newObjectFields: {
    type: [],
    tags: [],
    name: "",
    description: "",
    identifier: "",
    active: true,
    publicUse: true,
    singleUse: false,
    account: "",
    access: [],
    roles: [],
    plan: [
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
};

export default templateEditorMetadata;
export const ldapOrganizationMetaData = {
  idProperty: "name",
  type: "Organization",
  detailView: function(record) {
    return `/admin/organizations/details/${record.getData("name")}`;
  },
  detailViewTitle: function(record) {
    return `Organization Details [${record.getOriginalValue("name")}]`;
  },
  fields: [
    {
      label: "LDAP Organization ID",
      id: "name",
      isRequired: true,
    },
    {
      label: "Common Organization Name",
      id: "orgName",
      isRequired: true,
      formText: "For consistency, by default this field should map to the customer company name as saved in ssoUsers.  Recommended to match the Common Account Name (at the account level).",
    },
    {
      label: "Organization Owner/Contact",
      id: "orgOwner",
      isRequired: true,
      formText: "This field is populated by the Opsera Customer Record drop down",
    },
    {
      label: "Opsera Customer Record",
      id: "orgOwnerEmail",
      isRequired: true,
      isEmail: true,
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Environment Count",
      id: "envCount",
      formText: "Not implemented yet",
    },
    {
      label: "Number of Licenses",
      id: "numberOfLicenses",
      formText: "Not implemented yet",
    },
    {
      label: "Object Count",
      id: "objectCount",
      formText: "Not implemented yet",
    },
    {
      label: "Subscriptions",
      id: "subscription",
      formText: "Not implemented yet",
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    envCount: "5",
    numberOfLicenses: "2000",
    objectCount: "50000",
    orgName: "",
    orgOwner: "",
    orgOwnerEmail: "",
    subscription: ["apps", "eventHooks"],
  },
};
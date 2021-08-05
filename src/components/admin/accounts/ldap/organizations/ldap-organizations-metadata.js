export const ldapOrganizationMetaData = {
  idProperty: "name",
  type: "Organization",
  detailView: function (record) {
    return `/admin/organizations/details/${record.getData("name")}`;
  },
  detailViewTitle: function (record) {
    return `Organization Details [${record.getOriginalValue("name")}]`;
  },
  fields: [
    {
      label: "LDAP Organization ID",
      id: "name",
      isRequired: true
    },
    {
      label: "Common Organization Name",
      id: "orgName",
      isRequired: true
    },
    {
      label: "Organization Owner/Contact",
      id: "orgOwner",
      isRequired: true,
      formText: "This field is populated by the Opsera Customer Record drop down"
    },
    {
      label: "Owner Email",
      id: "orgOwnerEmail",
      isRequired: true,
      isEmail: true,
      formText: "This field is populated by the Opsera Customer Record drop down"
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Environment Count",
      id: "envCount",
    },
    {
      label: "Number of Licenses",
      id: "numberOfLicenses",
    },
    {
      label: "Object Count",
      id: "objectCount",
    },
    {
      label: "Subscriptions",
      id: "subscription",
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
    subscription: ["apps", "eventHooks"]
  }
};
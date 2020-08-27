export const ldapOrganizationsFormFields = {
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      isRequired: true
    }
  },
  name: {
    label: "LDAP Organization ID",
    id: "name",
    rules: {
      isRequired: true
    }
  },
  orgName: {
    label: "Common Organization Name",
    id: "orgName",
    rules: {
      isRequired: true
    },
  },
  orgOwner: {
    label: "Organization Owner/Contact",
    id: "orgOwner",
    rules: {
      isRequired: true
    },
    fieldText: "This field is populated by the Opsera Customer Record drop down"
  },
  orgOwnerEmail: {
    label: "Owner Email",
    id: "orgOwnerEmail",
    rules: {
      isRequired: true,
      isEmail: true
    },
    fieldText: "This field is populated by the Opsera Customer Record drop down"
  },
  description: {
    label: "Description",
    id: "description",
    rules: {
      // isRequired: true
    }
  },
  envCount: {
    label: "Environment Count",
    id: "envCount",
    rules: {
      // isRequired: true
    }
  },
  numberOfLicenses: {
    label: "Number of Licenses",
    id: "numberOfLicenses",
    rules: {
      // isRequired: true
    }
  },
  objectCount: {
    label: "Object Count",
    id: "objectCount",
    rules: {
      // isRequired: true
    }
  },
  subscription: {
    label: "Subscriptions",
    id: "subscription",
    rules: {
      // isRequired: true
    }
  },
};

export default ldapOrganizationsFormFields;

export const ldapOrganizationMetaData = {
  idProperty: "name",
  type: "Organization",
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
  ]
};
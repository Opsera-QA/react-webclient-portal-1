export const ldapOrganizationsFormFields = {
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      isRequired: true
    }
  },
  name: {
    label: "Internal Name",
    id: "name",
    rules: {
      isRequired: true
    }
  },
  orgName: {
    label: "Organization Name",
    id: "orgName",
    rules: {
      isRequired: true
    },
  },
  orgOwner: {
    label: "Owner",
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
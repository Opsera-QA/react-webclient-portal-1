export const ldapOrganizationAccountFormFields = {
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      isRequired: true
    }
  },
  org: {
    label: "LDAP Organization ID",
    id: "org",
    fieldText: "This field is populated by the Opsera Customer Record drop down",
    rules: {
      isRequired: true
    }
  },
  orgOwner: {
    label: "Account Owner",
    id: "orgOwner",
    fieldText: "This field is populated by the Opsera Customer Record drop down",
    rules: {
      isRequired: true
    }
  },
  orgOwnerEmail: {
    label: "Account Owner Email",
    id: "orgOwnerEmail",
    fieldText: "This field is populated by the Opsera Customer Record drop down",
    rules: {
      isRequired: true
    }
  },
  orgDomain: {
    label: "Organization Domain",
    id: "orgDomain",
    rules: {
      // isRequired: true
    }
  },
  administrator: {
    label: "Administrator",
    id: "administrator",
    fieldText: "This user is created based on the Opsera Customer Record selected.",
    rules: {
      isRequired: true
    }
  },
  accountName: {
    label: "Common Account Name",
    id: "accountName",
    rules: {
      // isRequired: true
    }
  },
  name: {
    label: "LDAP Org Account ID",
    id: "name",
    rules: {
      isRequired: true
    }
  },
  description: {
    label: "Description",
    id: "description",
    rules: {
      // isRequired: true
    }
  },
  idpPostURL: {
    label: "IDP Post URL",
    id: "idpPostURL",
    rules: {
      // isRequired: true
    }
  },
  idpVendor: {
    label: "IDP Vendor",
    id: "idpVendor",
    rules: {
      // isRequired: true
    }
  },
  idpReturnAttributes: {
    label: "IDP Return Attributes",
    id: "idpReturnAttributes",
    rules: {
      // isRequired: true
    }
  },
  isMultipleIDP: {
    label: "Is Multiple IDP?",
    id: "isMultipleIDP",
    rules: {
      // isRequired: true
    }
  },
  localAuth: {
    label: "Local Auth?",
    id: "localAuth",
    rules: {
      // isRequired: true
    }
  },
  samlEnabled: {
    label: "Saml Enabled?",
    id: "samlEnabled",
    rules: {
      // isRequired: true
    }
  },
  oAuthEnabled: {
    label: "oAuth Enabled?",
    id: "oAuthEnabled",
    rules: {
      // isRequired: true
    }
  },
  configEntryType: {
    label: "Config Entry Type",
    id: "configEntryType",
    rules: {
      // isRequired: true
    }
  },
  entityID: {
    label: "Entity ID",
    id: "entityID",
    rules: {
      // isRequired: true
    }
  },
};

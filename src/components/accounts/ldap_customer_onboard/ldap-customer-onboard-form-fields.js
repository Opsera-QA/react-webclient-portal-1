// TODO: put metadata on node server and pull down that way?
export const ldapCustomerOnboardFormFields = {
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      isRequired: true
    }
  },
  //TODO: Confirm field labels
  accountName: {
    label: "accountName",
    id: "accountName",
    rules: {
      // isRequired: true
    }
  },
  name: {
    label: "Name",
    id: "name",
    rules: {
      // isRequired: true
    }
  },
  description: {
    label: "description",
    id: "description",
    rules: {
      // isRequired: true
    }
  },
  localAuth: {
    label: "localAuth",
    id: "localAuth",
    rules: {
      // isRequired: true
    }
  },
  samlEnabled: {
    label: "samlEnabled",
    id: "samlEnabled",
    rules: {
      // isRequired: true
    }
  },
  oAuthEnabled: {
    label: "oAuthEnabled",
    id: "oAuthEnabled",
    rules: {
      // isRequired: true
    }
  },
  idpPostURL: {
    label: "idpPostURL",
    id: "idpPostURL",
    rules: {
      // isRequired: true
    }
  },
  idpVendor: {
    label: "idpVendor",
    id: "idpVendor",
    rules: {
      // isRequired: true
    }
  },
  configEntryType: {
    label: "configEntryType",
    id: "configEntryType",
    rules: {
      // isRequired: true
    }
  },
  entityID: {
    label: "entityID",
    id: "entityID",
    rules: {
      // isRequired: true
    }
  },
  isMultipleIDP: {
    label: "isMultipleIDP",
    id: "isMultipleIDP",
    rules: {
      // isRequired: true
    }
  },
  idpReturnAttributes: {
    label: "idpReturnAttributes",
    id: "idpReturnAttributes",
    rules: {
      // isRequired: true
    }
  },
  orgDomain: {
    label: "orgDomain",
    id: "orgDomain",
    rules: {
      // isRequired: true
    }
  },
  users: {
    label: "LDAP Users",
    id: "users",
    rules: {
      // isRequired: true
    }
  },
};

export const ldapCustomerIdpAccountsFormFields = {
  name: {
    label: "Idp account name",
    id: "name",
    rules: {
      // isRequired: true
    }
  },
  idpRedirectURI: {
    label: "IDP Redirect URI",
    id: "idpRedirectURI",
    rules: {
      // isRequired: true
    }
  },
  clientID: {
    label: "Client ID",
    id: "clientID",
    rules: {
      // isRequired: true
    }
  },
  issuer: {
    label: "Issuer",
    id: "issuer",
    rules: {
      // isRequired: true
    }
  },
  baseUrl: {
    label: "Base URL",
    id: "baseUrl",
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
  configEntryType: {
    label: "Configuration Entry Type",
    id: "configEntryType",
    rules: {
      // isRequired: true
    }
  },
  idpNameIDMapping: {
    label: "Name ID Mapping",
    id: "idpNameIDMapping",
    rules: {
      // isRequired: true
    }
  },
};




export const ldapIdpAccountsMetaData = {
  idProperty: "name",
  type: "IDP Account",
  fields: [
  {
    label: "IDP Account Name",
    id: "name",
      isRequired: true
  },
  {
    label: "IDP Domain",
    id: "domain",
      isRequired: true
  },
  {
    label: "IDP Redirect URI",
    id: "idpRedirectURI",
      isRequired: true
  },
  {
    label: "Client ID",
    id: "clientID",
      // isRequired: true
  },
  {
    label: "Issuer",
    id: "issuer",
    // isRequired: true
  },
  {
    label: "Base URL",
    id: "baseUrl",
      // isRequired: true
  },
  {
    label: "IDP Vendor",
    id: "idpVendor",
  },
  {
    label: "Configuration Entry Type",
    id: "configEntryType",
  },
  {
    label: "Name ID Mapping",
    id: "idpNameIDMapping",
  },
],
  newObjectFields: {
    name: "",
    domain: "",
    idpRedirectURI: "https://portal.opsera.io/implicit/callback",
    clientID: "0oaou6bztkPJFnxaL0h7",
    issuer: "https://dev-842100.oktapreview.com/oauth2/default",
    baseUrl: "https://dev-842100.oktapreview.com",
    idpVendor: "OKTA",
    configEntryType: "IDP",
    idpNameIDMapping: "idmap"
  }
};

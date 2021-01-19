export const ldapOrganizationAccountMetaData = {
  idProperty: "name",
  type: "Organization Account",
  fields: [
    {
      label: "LDAP Organization ID",
      id: "org",
      fieldText: "This field is populated by the Opsera Customer Record drop down",
      isRequired: true
    },
    {
      label: "Account Owner",
      id: "orgOwner",
      fieldText: "This field is populated by the Opsera Customer Record drop down",
      isRequired: true
    },
    {
      label: "Account Owner Email",
      id: "orgOwnerEmail",
      fieldText: "This field is populated by the Opsera Customer Record drop down",
      isRequired: true
    },
    {
      label: "Organization Domain",
      id: "orgDomain",
    },
    {
      label: "Administrator",
      id: "administrator",
      fieldText: "This user is created based on the Opsera Customer Record selected.",
    },
    {
      label: "Common Account Name",
      id: "accountName",
    },
    {
      label: "LDAP Org Account ID",
      id: "name",
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "IDP Post URL",
      id: "idpPostURL",
    },
    {
      label: "IDP Vendor",
      id: "idpVendor",
    },
    {
      label: "IDP Return Attributes",
      id: "idpReturnAttributes",
    },
    {
      label: "Is Multiple IDP?",
      id: "isMultipleIDP",
    },
    {
      label: "Local Auth?",
      id: "localAuth",
    },
    {
      label: "Saml Enabled?",
      id: "samlEnabled",
    },
    {
      label: "oAuth Enabled?",
      id: "oAuthEnabled",
    },
    {
      label: "Config Entry Type",
      id: "configEntryType",
    },
    {
      label: "Entity ID",
      id: "entityID",
    }
  ],
  newObjectFields: {
    org: "",
    name: "",
    localAuth: true,
    samlEnabled: true,
    oAuthEnabled: true,
    idpPostURL: "https://testurl.com",
    idpVendor: "OKTA",
    configEntryType: "Not sure",
    entityID: "https://dev-842100.oktapreview.com",
    description: "",
    isMultipleIDP: false,
    idpReturnAttributes: [
      "mail",
      "cn"],
    accountName: "",
    orgDomain: "",
    administrator: {}
  }
};

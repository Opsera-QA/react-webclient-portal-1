export const ldapOrganizationAccountMetaData = {
  idProperty: "name",
  type: "Organization Account",
  detailView: function (record) {
    return `/admin/organization-accounts/${record.getData("orgDomain")}/details/`;
  },
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "LDAP Organization ID",
      id: "org",
      formText: "This field is populated by the Opsera Customer Record drop down",
      isRequired: true
    },
    {
      label: "Account Owner",
      id: "orgOwner",
      formText: "This field is populated by the Opsera Customer Record drop down",
      isRequired: true
    },
    {
      label: "Account Owner Email",
      id: "orgOwnerEmail",
      formText: "This field is populated by the Opsera Customer Record drop down",
      isRequired: true
    },
    {
      label: "Inherited Organization Domain",
      id: "orgDomain",
    },
    {
      label: "Administrator",
      id: "administrator",
      formText: "This user is created based on the Opsera Customer Record selected.",
    },
    {
      label: "Common Account Name",
      id: "accountName",
      formText: "Maps to the organizationName in ssoUsers and is visible in the UI.  Recommended to match the company name."
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
      label: "IdP Post URL",
      id: "idpPostURL",
    },
    {
      label: "IdP Vendor",
      id: "idpVendor",
      formText: "Currently only support Okta"
    },
    {
      label: "Custom Tenant Login Domain",
      id: "idpBaseUrl",
      regexDefinitionName: "domainNameField",
      formText: "Used to restrict user login to domain.  Value must match what is defined in tenant config (REACT_APP_OPSERA_TENANT) or be null for no enforcement."
    },
    {
      label: "IdP Return Attributes",
      id: "idpReturnAttributes",
    },
    {
      label: "Is Multiple IdP?",
      id: "isMultipleIDP",
      formText: "Not implemented yet"
    },
    {
      label: "Local Authentication Form (Opsera Okta)",
      id: "localAuth",
      formText: "Indicates if the customer is using the local registration form (with Opsera Okta) OR the Okta Widget which supports both federated authentication or Opsera Okta.  Must be disabled with a IdpIdentifier other than 0 for federation to work.  If disabled and IdpIdentifier is 0, it uses Okta Widget with local auth (Opsera Okta)"
    },
    {
      label: "Saml Enabled?",
      id: "samlEnabled",
      formText: "Not implemented yet"
    },
    {
      label: "oAuth Enabled?",
      id: "oAuthEnabled",
      formText: "Not implemented yet"
    },
    {
      label: "Config Entry Type",
      id: "configEntryType",
    },
    {
      label: "IdP Identifier",
      id: "entityID",
      isRequired: true,
      maxLength: 50,
      formText: "Maps to the Okta configured Identity Provider ID in Opsera Okta.  Disabled Federation set to 0"
    },
    {
      label: "New User Registration URL",
      id: "urlString",
      formText: "Do not use if account is Federated or if the user’s domain does not match the account owner’s. In those cases, you must use the New User form in User Management in Account Settings."
    }
  ],
  newObjectFields: {
    org: "",
    name: "",
    localAuth: true,
    samlEnabled: false,
    oAuthEnabled: true,
    idpPostURL: "https://testurl.com",
    idpVendor: "OKTA",
    configEntryType: "Not sure",
    entityID: "0",
    description: "",
    idpBaseUrl: "",
    isMultipleIDP: false,
    idpReturnAttributes: [
      "mail",
      "cn"],
    accountName: "",
    orgDomain: "",
    administrator: {}
  }
};

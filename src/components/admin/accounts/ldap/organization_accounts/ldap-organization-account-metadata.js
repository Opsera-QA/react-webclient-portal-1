export const ldapOrganizationAccountMetaData = {
  idProperty: "name",
  type: "Organization Account",
  detailView: function (record) {
    return `/admin/organization-accounts/${record.getData("orgDomain")}/details/`;
  },
  detailViewTitle: function (record) {
    return `Organization Account Details [${record.getOriginalValue("name")}]`;
  },
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
      label: "Inherited Organization Domain",
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
      label: "Local Authentication Provider (Opsera Okta)",
      id: "localAuth",
      formText: "Indicates if the customer is using federated authentication or Opsera Okta (local)"
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
      formText: "Maps to the Okta configured Identity Provider ID in Opsera Okta"
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

export const ldapOrganizationAccountMetaData = {
  idProperty: "name",
  type: "Organization Account",
  detailView: function (record) {
    return `/admin/organization-accounts/${record.getData("orgDomain")}/details/`;
  },
  detailViewTitle: function (record) {
    return `Organization Account Details [${record.getData("name")}]`;
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
    },
    {
      label: "Custom Tenant Login Domain",
      id: "idpBaseUrl",
      regexDefinitionName: "domainNameField",
    },
    {
      label: "IdP Return Attributes",
      id: "idpReturnAttributes",
    },
    {
      label: "Is Multiple IdP?",
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
      label: "IdP Identifier",
      id: "entityID",
      isRequired: true,
      maxLength: 50
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

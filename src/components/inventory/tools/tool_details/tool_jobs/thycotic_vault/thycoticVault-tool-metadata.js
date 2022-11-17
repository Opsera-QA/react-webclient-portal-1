const ThycoticVaultMetadata = {
  type: "Thycotic Vault Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Vault Tenant",
      id: "tenantName",
      isRequired: true,
      maxLength: 128,
      regexDefinitionName: "alphanumeric",
    },
    {
      label: "Vault Domain",
      id: "domainName",
      isRequired: true
    },
    {
      label: "Client Id",
      id: "clientId",
      isRequired: true,
      maxLength: 1024,
    },
    {
      label: "Client Secret",
      id: "clientSecret",
      isRequired: true,
      maxLength: 1024,
    },
    {
      label: "Vault Path",
      id: "vaultPath",
      isRequired: true,
      maxLength: 1024,
      regexDefinitionName: "pathField",
    },
    {
      label: "Vault Type",
      id: "vaultType",
      isRequired: true
    },
  ],
  newObjectFields:
  {
    tenantName: "",
    domainName: "",
    clientId: "",
    clientSecret: "",
    vaultPath: "",
    vaultType: "",
  }
};

export default ThycoticVaultMetadata;

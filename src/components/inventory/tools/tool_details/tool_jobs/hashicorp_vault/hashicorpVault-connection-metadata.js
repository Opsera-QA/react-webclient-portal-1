const HashicorpVaultConnectionMetadata = {
  type: "Hashicorp Vault Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Vault URI",
      id: "vaultUri",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "Vault Token",
      id: "vaultToken",
      isRequired: true
    },
    {
      label: "Vault Key",
      id: "vaultKey",
      isRequired: true
    },
    {
      label: "Vault Path",
      id: "vaultPath",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      vaultUri: "",
      vaultToken: "",
      vaultKey: "",
      vaultPath: ""
    }
};

export default HashicorpVaultConnectionMetadata;
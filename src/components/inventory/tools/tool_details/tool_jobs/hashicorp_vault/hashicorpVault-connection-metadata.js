const HashicorpVaultConnectionMetadata = {
  type: "Hashicorp Vault Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Vault URL",
      id: "dnsName",
      isRequired: true
    },
    {
      label: "Password",
      id: "password",
      isRequired: true
    }
  ],
  newObjectFields:
    {
      dnsName: "",
      password: ""
    }
};

export default HashicorpVaultConnectionMetadata;
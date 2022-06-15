const SapCpqConnectionMetadata = {
  type: "MongoDB Realm Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Domain Name",
      id: "domainName",
      maxLength: 50,
      isRequired: true,
    },
    {
      label: "Account User Name",
      id: "accountUsername",
      maxLength: 50,
      isRequired: true,
    },
    {
      label: "Account Password",
      id: "accountPassword",
      maxLength: 256,
      isRequired: true,
    },
    {
      label: "Environment",
      id: "environment",
      maxLength: 250,
    },
  ],
  newObjectFields: {
    domainName: "",
    accountUsername: "",
    accountPassword: "",
    environment: "",
  },
};

export default SapCpqConnectionMetadata;

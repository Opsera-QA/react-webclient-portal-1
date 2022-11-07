const anchoreScanConnectionMetadata = {
  type: "Anchore Scan Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Anchore Scan URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      toolURL: "",
      accountUsername: "",
      accountPassword: "",
    }
};

export default anchoreScanConnectionMetadata;
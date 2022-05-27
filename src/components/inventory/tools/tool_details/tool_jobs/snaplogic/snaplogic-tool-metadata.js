const SnaplogicMetadata = {
  type: "Snaplogic Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Organization Name",
      id: "organization",
      isRequired: true
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
    {
      label: "MetaSnap URL",
      id: "metaSnapURL",
      isRequired: true
    },
    {
      label: "MetaSnap Bearer Token",
      id: "metaSnapToken",
      isRequired: true
    },
  ],
  newObjectFields:
  {
    organization: "",
    accountUsername: "",
    accountPassword: "",
    metaSnapURL: "",
    metaSnapToken: "",
  }
};

export default SnaplogicMetadata;

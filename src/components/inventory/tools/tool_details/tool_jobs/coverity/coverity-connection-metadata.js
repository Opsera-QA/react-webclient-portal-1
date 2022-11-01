const CoverityConnectionMetadata = {
    type: "Coverity Connect Tool Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Coverity Connect URL",
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
      {
        label: "Coverity License",
        id: "license",
        isRequired: true
      },
      {
        label: "Coverity License file name",
        id: "fileName",
      },
    ],
    newObjectFields:
      {
        toolURL: "",
        accountUsername: "",
        accountPassword: "",
        license: "",
        fileName: ""
      }
  };

  export default CoverityConnectionMetadata;
const AquasecMetadata = {
  type: "Aquasec Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "URL",
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

export default AquasecMetadata;

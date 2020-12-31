const anchoreIntegratorConnectionMetadata = {
  type: "Anchore Integrator Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Anchore Integrator URL",
      id: "toolURL",
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
  ],
  newModelBase:
    {
      toolURL: "",
      accountUsername: "",
      accountPassword: "",
    }
};

export default anchoreIntegratorConnectionMetadata;
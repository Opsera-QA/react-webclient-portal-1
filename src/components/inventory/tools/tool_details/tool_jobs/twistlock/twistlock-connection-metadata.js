const TwistlockConnectionMetadata = {
  type: "Twistlock Tool Configuration",
  idProperty: "_id",
  fields: [
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
      label: "Twistlock URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    }
  ],
  newObjectFields:
    {
      accountUsername: "",
      accountPassword: "",
      toolURL: ""
    }
};

export default TwistlockConnectionMetadata;
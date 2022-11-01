const jfrogConnectionMetadata = {
  type: "JFrog Tool Configuration",
  fields: [
  {
    label: "JFrog Container URL",
    id: "toolURL",
    isRequired: true,
    isSecureUrl: true,
  },
    {
      label: "JFrog User ID",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "JFrog Password",
      id: "accountPassword",
      isRequired: true
    }
],
  newObjectFields: {
    toolURL: "",
    accountUsername: "",
    accountPassword: ""
  }
};

export default jfrogConnectionMetadata;
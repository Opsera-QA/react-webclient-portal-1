const nexusConnectionMetadata = {
  type: "Nexus Tool Configuration",
  fields: [
  {
    label: "Nexus Container URL",
    id: "toolURL",
    isRequired: true
  },
    {
      label: "Nexus User ID",
      id: "userName",
      isRequired: true
    },
    {
      label: "Nexus Password",
      id: "accountPassword",
      isRequired: true
    }
],
  newModelBase: {
    toolURL: "",
    userName: "",
    accountPassword: "",
    proxyEnable: false
  }
};

export default nexusConnectionMetadata;
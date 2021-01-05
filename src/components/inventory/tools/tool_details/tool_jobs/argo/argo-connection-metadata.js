const argoConnectionMetadata = {
  type: "Argo Tool Configuration",
  fields: [
  {
    label: "Argo Container URL",
    id: "toolURL",
    isRequired: true
  },
    {
      label: "Argo User ID",
      id: "userName",
      isRequired: true
    },
    {
      label: "Argo Password",
      id: "accountPassword",
      isRequired: true
    }
],
  newObjectFields: {
    toolURL: "",
    userName: "",
    accountPassword: "",
    proxyEnable: false
  }
};

export default argoConnectionMetadata;
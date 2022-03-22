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
      isRequiredFunction: (model) => {
        return !model?.getData("secretAccessTokenEnabled");        
      }
    },
    {
      label: "Use Secret Access Token",
      id: "secretAccessTokenEnabled",
      isRequired: true
    },
    {
      label: "Secret Access Token",
      id: "secretAccessTokenKey",
      isRequiredFunction: (model) => {
        return model?.getData("secretAccessTokenEnabled");        
      }
    }
],
  newObjectFields: {
    toolURL: "",
    userName: "",
    accountPassword: "",
    proxyEnable: false,
    secretAccessTokenEnabled: false,

  }
};

export default argoConnectionMetadata;
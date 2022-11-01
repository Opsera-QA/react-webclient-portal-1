const argoConnectionMetadata = {
  type: "Argo Tool Configuration",
    fields: [
    {
      label: "Argo Container URL",
      id: "toolURL",
      isRequired: true,
      isSecureUrl: true,
    },
    {
      label: "Argo User ID",
      id: "userName",
      isRequiredFunction: (model) => {
        return !model?.getData("secretAccessTokenEnabled");        
      }
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
    secretAccessTokenKey: ""
  }
};

export default argoConnectionMetadata;
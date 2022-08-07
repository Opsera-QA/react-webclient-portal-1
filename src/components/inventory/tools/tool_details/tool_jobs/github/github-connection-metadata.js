const githubConnectionMetadata = {
  type: "Github Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Personal Access Token",
      id: "accountPassword",
      maxLength: 256,
      isRequiredFunction: (model) => {
        return model.getData("twoFactorAuthentication") !== true;
      },
    },
    {
      label: "Enable Two Factor Authentication?",
      id: "twoFactorAuthentication",
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
      isRequiredFunction: (model) => {
        return model?.getData("twoFactorAuthentication") === true;
      },
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      maxLength: 256,
      isRequiredFunction: (model) => {
        return model?.getData("twoFactorAuthentication") === true;
      },
    },
  ],
  newObjectFields:
    {
      accountUsername: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false
    }
};

export default githubConnectionMetadata;
const gitlabConnectionMetadata = {
  type: "Gitlab Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Url",
      id: "url",
      isRequired: true,
      maxLength: 100
    },
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
        return model?.getData("twoFactorAuthentication") !== true;
      },
    },
    {
      label: "Use SSH Key",
      id: "twoFactorAuthentication",
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
      maxLength: 10000,
      isRequiredFunction: (model) => {
        return model?.getData("twoFactorAuthentication") === true;
      },
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      maxLength: 10000,
      isRequiredFunction: (model) => {
        return model?.getData("twoFactorAuthentication") === true;
      },
    },
  ],
  newObjectFields:
    {
      url: "https://gitlab.com/",
      accountUsername: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false
    }
};

export default gitlabConnectionMetadata;
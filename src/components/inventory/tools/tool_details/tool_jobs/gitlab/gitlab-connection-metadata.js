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
      label: "Password",
      id: "accountPassword",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Enable Two Factor Authentication?",
      id: "twoFactorAuthentication",
      maxLength: 100
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      maxLength: 256,
    },
  ],
  fieldsAlt: [
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
      label: "Password",
      id: "accountPassword",
      maxLength: 256
    },
    {
      label: "Enable Two Factor Authentication?",
      id: "twoFactorAuthentication",
      maxLength: 100
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
      isRequired: true,
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      isRequired: true,
      maxLength: 256,
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
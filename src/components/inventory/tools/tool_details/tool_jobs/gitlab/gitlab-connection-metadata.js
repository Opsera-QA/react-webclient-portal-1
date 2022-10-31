const gitlabConnectionMetadata = {
  type: "Gitlab Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Url",
      id: "url",
      isRequired: true,
      isSecureUrl: true,
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
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Use SSH Key",
      id: "twoFactorAuthentication",
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
      maxLength: 10000,
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      maxLength: 10000,
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
      label: "Use SSH Key",
      id: "twoFactorAuthentication"
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
      isRequired: true,
      maxLength: 10000,
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      isRequired: true,
      maxLength: 10000,
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
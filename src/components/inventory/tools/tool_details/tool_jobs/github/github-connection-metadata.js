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
      accountUsername: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false
    }
};

export default githubConnectionMetadata;
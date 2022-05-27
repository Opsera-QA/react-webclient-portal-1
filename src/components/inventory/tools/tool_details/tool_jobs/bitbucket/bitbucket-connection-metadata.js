const bitbucketConnectionMetadata = {
  type: "Bitbucket Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "URL",
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
      label: "API Token",
      id: "accountPassword",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
    },
    {
      label: "Enable Two-Factor Authentication",
      id: "twoFactorAuthentication",
    },
    {
      label: "API Type",
      id: "apiType",
    },
  ],
  fieldsAlt: [
    {
      label: "URL",
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
    {
      label: "Enable Two-Factor Authentication",
      id: "twoFactorAuthentication",
    },
    {
      label: "API Type",
      id: "apiType",
      isRequired: true,
    },
  ],
  newObjectFields:
    {
      url: "https://api.bitbucket.org/",
      accountUsername: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false,
      apiType: "cloud"
    }
};

export default bitbucketConnectionMetadata;
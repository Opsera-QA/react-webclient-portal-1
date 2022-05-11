const githubDeployKeyMetadata = {
  type: "Github Deploy Key",
  fields: [
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "User Name",
      id: "accountUsername",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      isRequired: true
    },
    {
      label: "Deploy Key",
      id: "deployKey",
      isRequired: true,
    }
  ],
  newObjectFields: {
    name: "",
    accountUsername: "",
    sshUrl: "",
    deployKey: "",
  }
};

export default githubDeployKeyMetadata;
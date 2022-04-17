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
      label: "SSH URL",
      id: "sshUrl",
      isRequired: true
    },
    {
      label: "Deploy Key",
      id: "deployKey",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "customParameterValueRegex",
    }
  ],
  newObjectFields: {
    name: "",
    sshUrl: "",
    deployKey: "",
  }
};

export default githubDeployKeyMetadata;
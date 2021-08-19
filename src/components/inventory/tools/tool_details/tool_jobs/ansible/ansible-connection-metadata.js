const ansibleConnectionMetadata = {
  type: "Ansible Tool Configuration",
  fields: [
    {
      label: "Server URL",
      id: "url",
      isRequired: true
    },
    {
      label: "Server Port",
      id: "port",
      regexDefinitionName: "portField",
      maxLength: 5
    },
    {
      label: "User Name",
      id: "accountUsername",
      isRequired: true
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true
    },
    {
      label:"Private Key",
      id:'secretPrivateKey',
      isRequired: true
    }
],
  newObjectFields: {
    url: "",
    port: "",
    accountUsername: "",
    accountPassword: "",
    secretPrivateKey: ""
  }
};

export default ansibleConnectionMetadata;
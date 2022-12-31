const ansibleConnectionMetadata = {
  type: "Ansible Tool Configuration",
  fields: [
    {
      label: "Host Name",
      id: "hostName",
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
      id: "userName",
      isRequired: true
    },
    /* {
      label: "Password",
      id: "accountPassword",
      isRequired: true
    },
    {
      label:"Private Key",
      id:'secretPrivateKey',
      isRequired: true
    }, */
    {
      label:"Ansible Public Key Path",
      id:"pubKeyPath"
    },
    {
      label: "Public Key",
      id: "publicKey",
      maxLength: 10000,
    }
],
  newObjectFields: {
    hostName: "",
    port: "",
    userName: "",
    pubKeyPath:"",
    // accountPassword: "",
    // secretPrivateKey: ""
  }
};

export default ansibleConnectionMetadata;

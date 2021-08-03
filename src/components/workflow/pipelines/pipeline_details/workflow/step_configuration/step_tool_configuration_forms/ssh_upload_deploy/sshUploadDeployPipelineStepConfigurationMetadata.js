const sshUploadDeployPipelineStepConfigurationMetadata = {
  type: "SFDC Pipeline Step Configuration",
  fields: [
    {
      label: "Security Key",
      id: "fileName",
      isRequired: true,
      formText: "Attach the PEM/CER key file needed for accessing the EC2 instance.  This data will be secured in our Vault."
    },
    {
      label: "User Name",
      id: "userName",
      maxLength: 150,
      formText: "Username needed to access the EC2 instance."
    },
    {
      label: "Server Address",
      id: "serverIp",
      maxLength: 75,
      formText: "DNS or IP Address for the server."
    },
    {
      label: "Server Path",
      id: "serverPath",
      maxLength: 250,
      isRequired: true
    },
    {
      label: "SSH Action",
      id: "sshAction",
      isRequired: true
    },
    {
      label: "SSH Commands",
      id: "commands",
    },
    {
      label: "Tool",
      id: "toolConfigId",
      isRequired: true
    },
  ],
  newObjectFields: {
    // accessKey: "",
    // secretKey: "",
    sshKey: {}, //file stream to value
    userName: "",
    serverIp: "",
    serverPath: "",
    commands: "",
    sshAction: "SSH Execution", // default it's ssh execution not empty anymore
    // jenkins details if SSHaction is upload
    toolConfigId: "",
    jenkinsUrl: "",
    jenkinsPort: "",
    jUserId: "",
    jAuthToken: "",
    jobName: ""
  }
};

export default sshUploadDeployPipelineStepConfigurationMetadata;
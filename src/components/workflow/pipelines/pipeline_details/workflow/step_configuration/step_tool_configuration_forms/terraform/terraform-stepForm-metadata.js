const TerraformStepFormMetadata = {
  type: "Terraform Step Configuration",
  fields: [
    {
      label: "SCM Tool Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Select SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Select Repository",
      id: "gitRepository", 
      isRequired: true
    },
    {
      label: "Select Branch",
      id: "defaultBranch", 
      isRequired: true
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
      isRequired: true
    },
    {
      label: "Runtime Argument Map",
      id: "keyValueMap",
    },
    {
      label: "Git Repository ID",
      id: "gitRepositoryID",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    }
  ],
  newModelBase: {
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    type:"",
    gitToolId : "",
    gitRepositoryID: "",
    sshUrl:"",
    gitUrl:"",
    bitbucketWorkspace : "",
    keyValueMap: {}
  }
};

export default TerraformStepFormMetadata;
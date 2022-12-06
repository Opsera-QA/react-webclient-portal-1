const azureCliStepFormMetadata = {
  type: "Azure Functions Configuration",
  fields: [    
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequired: true
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      isRequired: true
    },
    {
      label: "Script Type",
      id: "scriptType",
      isRequired: true
    },
    {
      label: "Commands",
      id: "commands",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "inline" || model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Opsera Script Library",
      id: "scriptId",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "script";
      },
    },    
    {
      label: "SCM Tool Type",
      id: "type",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },    
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },    
    {
      label: "Repository",
      id: "repositoryName",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },  
    {
      label: "Repository",
      id: "gitRepositoryID",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Branch",
      id: "defaultBranch", 
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Input Parameters",
      id: "enableInputParameters"
    },
    {
      label: "Parameters",
      id: "inputParameters",
      maxItems: 15,
      isRequiredFunction: (model) => {
        return model?.getData("enableInputParameters") === true;
      },
    },
    {
      label: "Specify Environment Variables",
      id: "saveEnvironmentVariables"
    },
    {
      label: "Environment Variables",
      id: "environmentVariables",
      isRequiredFunction: (model) => {
        return model?.getData("saveEnvironmentVariables") === true;
      },
    },            
  ],
  newObjectFields: {    
    azureToolConfigId: "",
    azureCredentialId: "",    
    scriptType: "",
    commands: "",
    scriptId: "",
    type: "",
    gitToolId: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    gitRepository: "",
    repositoryName: "",
    gitRepositoryID: "",
    defaultBranch: "",
    enableInputParameters: false,
    inputParameters: [],
    saveEnvironmentVariables: false,
    environmentVariables: [],
  }
};

export default azureCliStepFormMetadata;

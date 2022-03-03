const PackerStepFormMetadata = {
  type: "Packer Step Configuration",
  fields: [
    {
      label: "SCM Tool Type",
      id: "type",
      isRequired: true
    },    
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true
    },
    {
      label: "AWS Credentials",
      id: "awsToolConfigId",
    },    
    {
      label: "GCP Credentials",
      id: "gcpToolConfigId",
    },
    {
      label: "Branch",
      id: "defaultBranch", 
      isRequired: true
    },
    {
      label: "Git File Path",
      id: "gitFilePath",      
    },    
    {
      label: "Git Repository ID",
      id: "gitRepositoryID",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },    
    {
      label: "IAM Roles", 
      id:"iamRoleFlag"
    },
    {
      label: "IAM Role",
      id: "roleArn"
    },    
    {
      label: "Cloud Provider",
      id: "cloudProvider"
    },
    {
      label: "Packer Version",
      id: "tag",
      isRequired: true
    },    
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
    },    
    {
      label: "Azure Credential",
      id: "azureCredentialId",
    },
    {
      label: "Input Parameters",
      id: "inputParameters",
    },    
    {
      label: "Packer Execution Script",
      id: "customScript"
    },
    {
      label: "Packer Commands",
      id: "commands"
    },    
    {
      label: "Environment Variables",
      id: "environmentVariables"
    },
    {
      label: "Use Variable File",
      id: "isVariableFile"
    },
    {
      label: "Packer Variables Files",
      id: "inputFilePaths"
    },
    {
      label: "Input File Name",
      id: "inputFileName"
    },
  ],
  fieldsAlt: [
    {
      label: "SCM Tool Type",
      id: "type",
      isRequired: true
    },    
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true
    },
    {
      label: "AWS Credentials",
      id: "awsToolConfigId",
    },    
    {
      label: "GCP Credentials",
      id: "gcpToolConfigId",
    },
    {
      label: "Branch",
      id: "defaultBranch", 
      isRequired: true
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
      isRequired: true
    },
    {
      label: "Git Repository ID",
      id: "gitRepositoryID",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
    {
      label: "IAM Roles", 
      id:"iamRoleFlag"
    },
    {
      label: "IAM Role",
      id: "roleArn",
      isRequired:true
    },    
    {
      label: "Cloud Provider",
      id: "cloudProvider"
    },
    {
      label: "Packer Version",
      id: "tag",
      isRequired: true
    },    
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
    },    
    {
      label: "Azure Credential",
      id: "azureCredentialId",
    },
    {
      label: "Input Parameters",
      id: "inputParameters",
    },    
    {
      label: "Packer Execution Script",
      id: "customScript"
    },
    {
      label: "Packer Commands",
      id: "commands"
    },    
    {
      label: "Environment Variables",
      id: "environmentVariables"
    },
    {
      label: "Use Variable File",
      id: "isVariableFile"
    },
    {
      label: "Packer Variables Files",
      id: "inputFilePaths"
    },
    {
      label: "Input File Name",
      id: "inputFileName"
    },
  ],
  newObjectFields: {
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    awsToolConfigId : "",
    gcpToolConfigId: "",    
    type:"",
    gitToolId : "",
    gitRepositoryID: "",
    sshUrl:"",
    gitUrl:"",
    bitbucketWorkspace : "",
    bitbucketWorkspaceName: "",
    iamRoleFlag:false,
    roleArn:"",
    roleName:"",
    cloudProvider: "",
    tag: "",    
    azureToolConfigId : "",
    azureCredentialId: "",
    inputParameters: "",
    customScript: false,
    commands: "",    
    environmentVariables: [],
    isVariableFile: false,
    inputFilePaths: [],
    inputFileName: "",
  }
};

export default PackerStepFormMetadata;
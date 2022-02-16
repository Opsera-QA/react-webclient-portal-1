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
      label: "Access Key Script Parameter Name",
      id: "accessKeyParamName",
    },
    {
      label: "Secret Key Script Parameter Name",
      id: "secretKeyParamName",
    },
    {
      label: "Region Parameter Name",
      id: "regionParamName",
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
      label: "Runtime Arguments",
      id: "keyValueMap",
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
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
    {
      label: "Save Output Parameters",
      id: "saveParameters"
    },
    {
      label: "Define Input Parameters",
      id: "saveInputParameters"
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
      label: "Store State in S3 Bucket", 
      id:"storeStateInBucket"
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName"      
    },
    {
      label: "Bucket Region",
      id: "bucketRegion"
    },
    {
      label: "Cloud Provider",
      id: "cloudProvider",
      isRequired: true
    },
    {
      label: "Packer Version",
      id: "tag",
      isRequired: true
    },
    {
      label: "Resource Group",
      id: "resourceGroup",
    },
    {
      label: "Storage Account Name",
      id: "storageName",
    },
    {
      label: "Storage Container",
      id: "containerName",
    },
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
    },
    {
      label: "Packer Cloud Tool",
      id: "packerCloudId",
    },
    {
      label: "Organization Name",
      id: "organizationName",
    },
    {
      label: "Backend State",
      id: "backendState",
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
      label: "Maintain Remote State",
      id: "stateRemote",
    },
    {
      label: "State File Management",
      id: "stateFile",
      formText: "This tracks if the state file will be created by Opsera during runtime."
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
      label: "Specify Environment Variables",
      id: "saveEnvironmentVariables"
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
      id: "packerVariablesFiles"
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
      label: "Access Key Script Parameter Name",
      id: "accessKeyParamName",
    },
    {
      label: "Secret Key Script Parameter Name",
      id: "secretKeyParamName",
    },
    {
      label: "Region Parameter Name",
      id: "regionParamName",
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
      label: "Runtime Arguments",
      id: "keyValueMap",
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
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
    {
      label: "Save Output Parameters",
      id: "saveParameters"
    },
    {
      label: "Define Input Parameters",
      id: "saveInputParameters"
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
      label: "Store State in S3 Bucket", 
      id:"storeStateInBucket"
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName"
    },
    {
      label: "Bucket Region",
      id: "bucketRegion"
    },
    {
      label: "Cloud Provider",
      id: "cloudProvider",
      isRequired: true
    },
    {
      label: "Packer Version",
      id: "tag",
      isRequired: true
    },
    {
      label: "Backend State",
      id: "backendState",
    },
    {
      label: "Resource Group",
      id: "resourceGroup",
    },
    {
      label: "Storage Account Name",
      id: "storageName",
    },
    {
      label: "Storage Container",
      id: "containerName",
    },
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
    },
    {
      label: "Packer Cloud Tool",
      id: "packerCloudId",
    },
    {
      label: "Organization Name",
      id: "organizationName",
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
      label: "Maintain Remote State",
      id: "stateRemote",
    },
    {
      label: "State File Management",
      id: "stateFile",
      formText: "This tracks if the state file will be created by Opsera during runtime."
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
      label: "Specify Environment Variables",
      id: "saveEnvironmentVariables"
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
      id: "packerVariablesFiles"
    },
  ],
  newObjectFields: {
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    awsToolConfigId : "",
    gcpToolConfigId: "",    
    accessKeyParamName: "",
    secretKeyParamName: "",
    regionParamName: "",
    type:"",
    gitToolId : "",
    gitRepositoryID: "",
    sshUrl:"",
    gitUrl:"",
    bitbucketWorkspace : "",
    bitbucketWorkspaceName: "",
    keyValueMap: {},
    customParameters: "",
    saveParameters: false,
    iamRoleFlag:false,
    roleArn:"",
    roleName:"",
    storeStateInBucket: false,
    bucketName: "",
    bucketRegion: "",
    cloudProvider: "",
    tag: "",
    resourceGroup : "",
    storageName : "",
    containerName : "",
    azureToolConfigId : "",
    packerCloudId : "",
    organizationName : "",
    backendState: "LOCAL",
    azureCredentialId: "",
    inputParameters: "",
    saveInputParameters: false,
    stateRemote: false,
    stateFile: "",
    customScript: false,
    commands: "",
    saveEnvironmentVariables: false,
    environmentVariables: [],
    isVariableFile: false,
    packerVariablesFiles: [],
  }
};

export default PackerStepFormMetadata;
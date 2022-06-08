const TerraformStepFormMetadata = {
  type: "Terraform Step Configuration",
  fields: [
    {
      label: "Source Code Management Tool Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Job Type",
      id: "toolActionType",
      isRequired: true
    },
    {
      label: "Source Code Management Tool",
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
      id: "cloudProvider"
    },
    {
      label: "Terraform Version",
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
      label: "Terraform Tool",
      id: "terraformCloudId",
    },
    {
      label: "Organization Name",
      id: "organizationName",
    },
    {
      label: "Workspace Name",
      id: "workspaceName",
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
      label: "Terraform Execution Script",
      id: "customScript"
    },
    {
      label: "Terraform Commands",
      id: "terraformCommands"
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
      id: "inputFilePaths"
    },
    {
      label: "Cloud Provider",
      id: "cloudProvider",
      isRequired: true
    },
    {
      label: "Azure Credential",
      id: "azureCPCredentialId",
    },
    {
      label: "Azure Tool",
      id: "azureCPToolConfigId",
    },
  ],
  fieldsAlt:[
    {
      label: "Source Code Management Tool Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Job Type",
      id: "toolActionType",
      isRequired: true
    },
    {
      label: "Source Code Management Tool",
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
      id:"iamRoleFlag",
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
      id: "cloudProvider"
    },
    {
      label: "Terraform Version",
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
      label: "Terraform Tool",
      id: "terraformCloudId",
    },
    {
      label: "Organization Name",
      id: "organizationName",
    },
    {
      label: "Workspace Name",
      id: "workspaceName",
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
      label: "Terraform Execution Script",
      id: "customScript"
    },
    {
      label: "Terraform Commands",
      id: "terraformCommands"
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
      id: "inputFilePaths"
    },
    {
      label: "Azure Credential",
      id: "azureCPCredentialId",
    },
    {
      label: "Azure Tool",
      id: "azureCPToolConfigId",
    },
  ],
  newObjectFields: {
    toolActionType: "EXECUTE",
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    awsToolConfigId : "",
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
    terraformCloudId : "",
    organizationName : "",
    workspaceName: "",    
    backendState: "LOCAL",
    azureCredentialId: "",
    inputParameters: "",
    saveInputParameters: false,
    stateRemote: false,
    stateFile: "",
    customScript: false,
    terraformCommands: "",
    saveEnvironmentVariables: false,
    environmentVariables: [],
    isVariableFile: false,
    inputFilePaths: [],    
  }
};

export default TerraformStepFormMetadata;
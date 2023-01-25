import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const helmStepFormMetadata = {
  type: "Helm Step Configuration",
  fields: [
    {
      label: "Source Code Management Tool Type",
      id: "type",
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
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true
    },
    {
      label: "AWS Credentials",
      id: "awsToolConfigId",
    },
    {
      label: "Region Parameter Name",
      id: "regionParamName",
    },
    {
      label: "Branch",
      id: "defaultBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
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
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
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
      label: "S3 Bucket Name",
      id: "bucketName"
    },
    {
      label: "Bucket Region",
      id: "bucketRegion"
    },
    {
      label: "Resource Group",
      id: "resourceGroup",
      isRequired: true
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
      label: "Helm Execution Script",
      id: "customScript"
    },
    {
      label: "Helm Commands",
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
      label: "Cloud Provider",
      id: "cloudProvider",
      isRequired: true
    },
    {
      label: "Cluster Name",
      id: "clusterName",
      isRequired: true
    },
    {
      label: "Namespace",
      id: "namespace",
      isRequired: true
    },
    {
      label: "Service Name",
      id: "serviceName",
      isRequired: true
    },
    {
      label: "Input File Name",
      id: "inputFileName",
      isRequired: true
    }
  ],
  newObjectFields: {
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    awsToolConfigId : "",
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
    bucketName: "",
    bucketRegion: "",
    cloudProvider: "",
    tag: "",
    resourceGroup : "",
    storageName : "",
    containerName : "",
    azureToolConfigId : "",
    organizationName : "",
    workspaceName: "",    
    azureCredentialId: "",
    inputParameters: "",
    customScript: false,
    commands: "",
    saveEnvironmentVariables: false,
    environmentVariables: [],
    azureCPCredentialId: "",
    azureCPToolConfigId: "",
    clusterName: "",
    namespace: "",
    serviceName: ""
  }
};

export default helmStepFormMetadata;
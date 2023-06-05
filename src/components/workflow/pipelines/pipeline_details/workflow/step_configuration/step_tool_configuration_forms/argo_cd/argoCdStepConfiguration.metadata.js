import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

export const ArgoCdStepConfigurationMetadata = {
  type: "Argo CD Step Configuration",
  fields: [
    {
      label: "Source Code Management Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Source Code Management Tool",
      id: "gitToolId",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true,
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
    },
    {
      label: "Branch",
      id: "defaultBranch",
      isRequired: true,
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
    },
    {
      label: "Docker/ECR Step",
      id: "dockerStepID",
      isRequired: true,
      formText: `This step must match the corresponding ECR/Docker step being used in order to retrieve the Docker Image URL generated by that step. 
      If this is not selected properly the job may fail.`
    },
    {
      label: "Commit Type",
      id: "existingContent",
    },
    {
      label: "Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Argo URL",
      id: "toolUrl",
      isRequired: true,
    },
    {
      label: "User Name",
      id: "userName",
      isRequired: true,
    },
    {
      label: "Application",
      id: "applicationName",
      isRequired: true,
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
      // isRequired: true,
    },
    {
      label: "Git Workspace",
      id: "gitWorkspace",
    },
    {
      label: "Repository",
      id: "gitRepositoryID",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
    {
      label: "GIT URL",
      id: "gitUrl",
      // isRequired: true,
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      // isRequired: true,
    },
    {
      label: "Rollback",
      id: "rollbackEnabled",
      helpTooltipText: "Rollback option can be used to revoke the newly deployed builds and rollback to a previous version in case of failure."
      // isRequired: true,
    },
    {
      label: "Repository Tag",
      id: "repositoryTag",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true;
      },
      // isRequired: true,
    },
    {
      label: "App Variables",
      id: "dynamicVariables",
      helpTooltipText: "App varibales can be used to change the Application properties."
    },
    {
      label: "Application Cluster",
      id: "applicationCluster",
      isRequiredFunction: (model) => {
        return model?.getData("dynamicVariables") === true;
      },
    },
    {
      label: "Application YAML Path",
      id: "yamlPath",
      isRequiredFunction: (model) => {
        return model?.getData("dynamicVariables") === true;
      },
    },
    {
      label: "Blue Green Deployment",
      id: "isBlueGreenDeployment"
    },
    {
      label: "Kustomization",
      id: "kustomizeFlag",
      helpTooltipText: "ArgoCD supports Kustomize and has the ability to read a kustomization. yaml file to enable deployment with Kustomize and allow ArgoCD to manage the state of the YAML files."
    },
    {
      label: "dockerStepType",
      id: "dockerStepType"
    },
    {
      label: "Custom Parameter",
      id: "customParameterId"
    },
    {
      label: "Image Reference Key",
      id: "imageReference",
      isRequiredFunction: (model) => {
        return model?.getData("kustomizeFlag") === true;
      },
    },
    {
      label: "Use Custom Image",
      id: "customImageTag"
    },
    {
      label: "Platform",
      id: "platform",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true;
      },
    },
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "azure";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",      
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "azure";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Resource",
      id: "resource",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "azure";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Azure Registry",
      id: "azureRegistryName",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "azure";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Repository",
      id: "azureRepoName",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "azure";
      },
      regexDefinitionName: "azureLabels",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      id: "acrLoginUrl",
    },
    {
      label: "AWS Tool",
      id: "awsToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "aws";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "AWS Cluster Name",
      id: "awsClusterName",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "aws";
      },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Repository",
      id: "ecrRepoName",
      isRequiredFunction: (model) => {
        return model?.getData("customImageTag") === true && model?.getData("platform") === "aws";
      },
      regexDefinitionName: "ecrRepoField",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },    
  ],
  newObjectFields: {
    existingContent: "image",
    dockerStepID: "",
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    gitWorkspace: "",
    type: "",
    gitToolId: "",
    toolConfigId: "",
    toolUrl: "",
    gitUrl: "",
    sshUrl: "",
    userName: "",
    applicationName: "",
    gitRepositoryID: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    rollbackEnabled: false,
    repositoryTag: "",
    dynamicVariables: false,
    applicationCluster: "",
    yamlPath: "",
    kustomizeFlag: false,
    imageUrl: "",
    isBlueGreenDeployment: false,
    dockerStepType: "",
    customParameterId: "",
    imageReference: "",
    customImageTag: false,
    platform: "",
    azureToolConfigId: "",
    azureCredentialId: "",
    resource: "https://management.azure.com",
    azureRegistryName: "",
    azureRepoName: "",
    acrLoginUrl: "",
    awsToolConfigId: "",
    awsClusterName: "",
    ecrRepoName: "",
  },
};

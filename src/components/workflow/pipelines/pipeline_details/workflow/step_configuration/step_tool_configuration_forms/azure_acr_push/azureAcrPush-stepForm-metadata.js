import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const azureAcrPushStepFormMetadata = {
  type: "Azure Acr Push Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Jenkins Job",
      id: "toolJobName",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Jenkins Job",
      id: "toolJobId",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Build Step",
      id: "buildStepId",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Azure Registry",
      id: "azureRegistryName",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      // isRequiredFunction: (model) => {
      //   return model?.getData("toolType") === "azure";
      // },
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Resource",
      id: "resource",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Use Existing Repository?",
      id: "newRepo",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Repository Name",
      id: "azureRepoName",
      regexDefinitionName: "azureLabels",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Use Run Count as Repository Tag?",
      id: "useRunCount",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Azure Tool Type",
      id: "toolType",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    toolName: "",
    toolJobId: "",
    jobType: "",
    toolJobName: "",
    buildType: "",
    agentLabels: "",
    azureToolConfigId: "",
    buildStepId: "",
    azureRegistryName: "",
    newRepo: false,
    azureRepoName: "",
    useRunCount: false,
    resource: "https://management.azure.com",
    awsToolConfigId: "",
    ecrRepoName: "",
    acrLoginUrl: "",
    autoScaleEnable: true,
    toolType: "",
    azureCredentialId: ""
  }
};

export default azureAcrPushStepFormMetadata;
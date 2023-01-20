import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const kafkaConnectStepFormMetadata = {
  type: "Kafka Connect Tool Configuration",
  fields: [
    {
      label: "Kafka Connect Tool",
      id: "kafkaToolId",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Project ID",
      id: "projectId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "SCM Service Type",
      id: "service",
    },
    {
      label: "GIT URL",
      id: "gitUrl"
    },
    {
      label: "SSH URL",
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
    },
    {
      label: "Workspace",
      id: "workspace"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName"
    },
    {
      label: "Branch",
      id: "defaultBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
    },
    {
      label: "Connector File Name",
      id: "connectorFileName",
    },
    {
      label: "Connector File Path",
      id: "connectorFilePath",
    },
    {
      label: "Kafka Connect Action",
      id: "kafkaConnectAction",
      isRequired: true
    },
    {
      label: "Kafka Connector",
      id: "kafkaConnectorName"
    }
  ],
  newObjectFields: {
    kafkaToolId: "",
    gitToolId: "",
    repoId: "",
    projectId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    defaultBranch: "",
    connectorFileName : "",
    connectorFilePath : "",
    kafkaConnectAction: "",
    kafkaConnectorName: ""
  }
};

export default kafkaConnectStepFormMetadata;
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
      label: "Repository ID",
      id: "repoId",
    },
    {
      label: "Project ID",
      id: "projectId",
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
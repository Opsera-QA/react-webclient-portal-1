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
      isRequired: true
    },
    {
      label: "Repository ID",
      id: "repoId",
    },
    {
      label: "SCM Service Type",
      id: "service",
      isRequired: true
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
      isRequired: true
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
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Connector File Name",
      id: "connectorFileName",
      isRequired: true
    },
    {
      label: "Connector File Path",
      id: "connectorFilePath",
      isRequired: true
    },
    {
      label: "Kafka Connect Action",
      id: "kafkaConnectAction",
      isRequired: true
    }
  ],
  newObjectFields: {
    kafkaToolId: "",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",
    connectorFileName : "",
    connectorFilePath : "",
    kafkaConnectAction: ""
  }
};

export default kafkaConnectStepFormMetadata;
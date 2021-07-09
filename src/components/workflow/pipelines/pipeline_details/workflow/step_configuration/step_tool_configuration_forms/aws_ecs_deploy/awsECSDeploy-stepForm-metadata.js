const awsECSDeployStepFormMetadata = {
  type: "AWS ECS Deploy Tool Configuration",
  fields: [
    {
      label: "Docker Step",
      id: "ecsServiceDockerStepId",
      isRequired: true
    },
    {
      label: "Service Task",
      id: "ecsServiceTaskId",
      isRequired: true
    },
    {
      label: "Service Container Port",
      id: "ecsServiceContainerPort",
      isRequired: true
    },
    {
      label: "Service Name",
      id: "ecsServiceName",
    },
    {
      label: "Generate Dynamic Service Name?",
      id: "dynamicServiceName",
    },
    {
      label: "Delete Existing Resource Before Deployment?",
      id: "ecsDeleteResource",
    },
    {
      label: "Dynamic Name Prefix",
      id: "namePretext",
      formText: "Enter a prefix to be prepended to the uniquely generated name"
    },
  ],
  newObjectFields: {
    ecsServiceDockerStepId: "",
    ecsServiceTaskId: "",
    ecsServiceContainerPort: "",
    ecsServiceName: "",
    namePretext: "",
    dynamicServiceName: false,
    ecsDeleteResource: false
  }
};

export default awsECSDeployStepFormMetadata;
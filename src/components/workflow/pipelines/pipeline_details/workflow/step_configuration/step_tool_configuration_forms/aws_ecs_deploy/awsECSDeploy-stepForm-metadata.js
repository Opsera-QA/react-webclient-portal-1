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
      isRequired: true
    },
    {
      label: "Generate Dynamic Service Name?",
      id: "dynamicServiceName",
    },
  ],
  newObjectFields: {
    ecsServiceDockerStepId: "",
    ecsServiceTaskId: "",
    ecsServiceContainerPort: "",
    ecsServiceName: "",
    dynamicServiceName: false
  }
};

export default awsECSDeployStepFormMetadata;
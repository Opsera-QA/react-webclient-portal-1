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
    }
  ],
  newObjectFields: {
    ecsServiceDockerStepId: "",
    ecsServiceTaskId: "",
    ecsServiceContainerPort: ""
  }
};

export default awsECSDeployStepFormMetadata;
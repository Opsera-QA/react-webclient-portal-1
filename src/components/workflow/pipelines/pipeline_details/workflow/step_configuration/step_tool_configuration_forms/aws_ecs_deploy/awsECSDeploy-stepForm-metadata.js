const awsECSDeployStepFormMetadata = {
  type: "AWS ECS Deploy Tool Configuration",
  fields: [
    {
      label: "Docker Step",
      id: "dockerStepId",
      isRequired: true
    },
    {
      label: "Service Task",
      id: "serviceTaskId",
      isRequired: true
    }
  ],
  newObjectFields: {
    dockerStepId: "",
    serviceTaskId: ""
  }
};

export default awsECSDeployStepFormMetadata;
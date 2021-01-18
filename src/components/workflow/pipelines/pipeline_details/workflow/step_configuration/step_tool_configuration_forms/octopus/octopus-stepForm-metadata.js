const octopusStepFormMetadata = {
    type: "Octopus API Configuration",
    idProperty: "_id",
    fields: [
      {
        label: "Is Full Backup",
        id: "isFullBackup"
      },
      {
        label: "Octopus URL",
        id: "toolURL",
        isRequired: true
      },
      {
        label: "Octopus API Key",
        id: "octopusApiKey",
        isRequired: true
      },
      {
        label: "Space Name",
        id: "spaceName",
        isRequired: true
      },
      {
        label: "Project Name",
        id: "projectName",
        isRequired: true
      },
      {
        label: "Environment Name",
        id: "environmentName",
        isRequired: true
      },
      {
        label: "Octopus Tool ID",
        id: "octopusToolId",
        isRequired: true
      },
      {
        label: "Space Name ID",
        id: "spaceId",
        isRequired: true
      },
      {
        label: "Project ID",
        id: "projectId",
      },
      {
        label: "Project Description",
        id: "projectDescription",
        isRequired: true
      },
      {
        label: "Environment Name ID",
        id: "environmentId",
        isRequired: true
      },
      {
        label: "Namespace",
        id: "namespace",
        isRequired: true
      },
      {
        label: "ECR Step",
        id: "ecrPushStepId",
        isRequired: true
      },
      {
        label: "Deployment ID",
        id: "deploymentId"
      },
    ],
    newModelBase:
      {
        isFullBackup: false,
        toolURL: "",
        octopusApiKey: "",
        spaceName: "",
        projectName: "",
        environmentName: "",
        octopusToolId: "",
        spaceId: "",
        projectId: "",
        projectDescription : "",
        environmentId: "",
        ecrPushStepId: "",
        namespace : "",
        deploymentId : ""
      }
  };
  
  export default octopusStepFormMetadata;
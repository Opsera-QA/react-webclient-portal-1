import regexHelpers from "utils/regexHelpers";

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
      },
      {
        label: "Artifact Step",
        id: "ecrPushStepId",
        isRequired: true
      },
      {
        label: "Deployment ID",
        id: "deploymentId"
      },
      {
        label: "Deployment Target Role",
        id: "octopusTargetRoles"
      },
      {
        label: "Octopus Platform Type",
        id: "octopusPlatformType"
      },
      {
        label: "Octopus Deployment Type",
        id: "octopusDeploymentType"
      },
      {
        label: "Octopus Feed",
        id: "octopusFeedId"
      },
      {
        label: "Version",
        id: "octopusVersion"
      },
      {
        label: "Package ID",
        id: "packageId"
      },
      {
        label: "Physical Path",
        id: "octopusPhysicalPath",
        regexValidator: regexHelpers.regexTypes.pathField
      }
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
        octopusTargetRoles: "",
        octopusPlatformType: "",
        octopusDeploymentType: "",
        octopusFeedId: "",
        deploymentId : "",
        octopusVersion: "",
        packageId: "",
        octopusPhysicalPath: ""
      }
  };
  
  export default octopusStepFormMetadata;
// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const octopusStepFormMetadata = {
    type: "Octopus API Configuration",
    idProperty: "_id",
    fields: [
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
        label: "Release Version",
        id: "releaseVersion",
        isRequired: true
      },
      {
        label: "Environment Name",
        id: "environmentName",
        isRequired: true
      },
      {
        label: "Tenant Name",
        id: "tenantName"
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
        label: "Project Name ID",
        id: "projectId",
        isRequired: true
      },
      {
        label: "Release Name ID",
        id: "releaseVersionId",
        isRequired: true
      },
      {
        label: "Tenant Name ID",
        id: "tenantId",
        isRequired: true
      },
      {
        label: "Environment Name ID",
        id: "environmentId",
        isRequired: true
      }
    ],
    newModelBase:
      {
        toolURL: "",
        octopusApiKey: "",
        spaceName: "",
        projectName: "",
        releaseVersion: "",
        environmentName: "",
        tenantName: "",	
        octopusToolId: "",
        spaceId: "",
        projectId: "",
        tenantId: "",
        environmentId: "",
        releaseVersionId: ""
      }
  };
  
  export default octopusStepFormMetadata;
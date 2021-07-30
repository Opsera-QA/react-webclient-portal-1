const azureDevopsStepFormMetadata = {
  type: "Azure Devops Tool Configuration",
  fields: [
    {
      label: "Organization Name",
      id: "organizationName",
      isRequired: true
    },
    {
      label: "Pipeline ID",
      id: "azurePipelineId",
      isRequired: true
    },
    {
      label: "Project Name/ID",
      id: "projectName",
      isRequired: true
    },
    {
      label: "Azure Devops Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Access Token",
      id: "accessToken",
      isRequired: true
    },
    {
      label: "Pipeline Version",
      id: "pipelineVersion",
      regexDefinitionName: "numericalField",
    },
  ],
  newObjectFields: {
    organizationName: "",
    azurePipelineId: "",
    projectName: "",
    pipelineVersion: "",
    toolConfigId: "",
    accessToken: ""
  }
};

export default azureDevopsStepFormMetadata;
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
      label: "Pipeline Version",
      id: "pipelineVersion",
    },
  ],
  newObjectFields: {
    organizationName: "",
    azurePipelineId: "",
    projectName: "",
    pipelineVersion: "",
  }
};

export default azureDevopsStepFormMetadata;
const TerraformVcsStepFormMetadata = {
  type: "Terraform Step Configuration",
  fields: [
    {
      label: "Job Type",
      id: "toolActionType",
      isRequired: true
    },
    {
      label: "Terraform Tool",
      id: "terraformCloudId",
      isRequired: true
    },
    {
      label: "Organization Name",
      id: "organizationName",
      isRequired: true
    },
    {
      label: "Workspace Name",
      id: "workspaceName",
      isRequired: true
    },
    {      
      id: "workspaceId",
      isRequired: true
    },
    {
      label: "Terraform Variables",
      id: "inputParameters",
    },
    {
      label: "Environment Variables",
      id: "environmentVariables"
    },
    {
      label: "Save Output Parameters",
      id: "saveParameters"
    },
    {
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
  ],
  newObjectFields: {
    toolActionType: "EXECUTE",
    terraformCloudId: "",
    organizationName: "",
    workspaceId: "",
    workspaceName: "",
    inputParameters: [],
    environmentVariables: [],
    saveParameters: false,
    customParameters: []
  }
};

export default TerraformVcsStepFormMetadata;

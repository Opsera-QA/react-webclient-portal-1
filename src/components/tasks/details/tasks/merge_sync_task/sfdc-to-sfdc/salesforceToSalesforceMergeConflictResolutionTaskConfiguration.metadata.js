export const salesforceToSalesforceMergeConflictResolutionTaskConfigurationMetadata = {
  type: "Salesforce to Salesforce Merge Conflict Resolution Task Configuration",
  fields: [
    {
      label: "Source Control Management Type",
      id: "service",
      isRequired: true,
      lowercase: true,
    },
    {
      label: "Account",
      id: "toolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },        
    {
      id: "projectId",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Git Repository URL",
      id: "gitUrl",
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Source Branch",
      id: "sourceBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Source Branch cannot match Target Branch.",
    },
    {
      label: "Target Branch",
      id: "targetBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Target Branch cannot match Source Branch.",
    },    
    {
      label: "Create New Target Branch",
      id: "isNewBranch",
    },
    {
      label: "Upstream Branch",
      id: "upstreamBranch",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Target Branch cannot match Source Branch.",
      isRequiredFunction: (model) => {
        return model?.getData("isNewBranch") === true;
      },
    },
  ],
  newObjectFields: {
    toolId: "",
    gitUrl: "",
    service: "",
    workspace: "",
    repository: "",
    targetBranch: "",
    sourceBranch: "",
    upstreamBranch: "",
    isNewBranch: false,
  }
};
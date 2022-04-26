export const salesforceToGitMergeSyncTaskConfigurationMetadata = {
  type: "Branch to Branch Merge Conflict Resolution Task Configuration",
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
      label: "Repository",
      id: "repositoryName",
      maxLength: 255,
    },
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      isRequiredFunction: (model) => {
        return model?.getData("service") === "bitbucket";
      },
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
    repositoryName: "", // TODO: Remove
    targetBranch: "",
    sourceBranch: "",
    upstreamBranch: "",
    isNewBranch: false,
  }
};
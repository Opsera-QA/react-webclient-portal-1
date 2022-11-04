import { TASK_TYPES } from "components/tasks/task.types";

export const mergeSyncTaskGitConfigurationMetadata = {
  type: "Git to Git Merge Sync Task Configuration",
  fields: [
    {
      label: "Source Control Management Type",
      id: "service",
      isRequired: true,
      lowercase: true,
    },
    {
      label: "Git Account",
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
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === TASK_TYPES.GIT_TO_GIT_MERGE_SYNC;
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText: "Source Branch cannot match Target Branch.",
    },
    {
      label: "Target Branch",
      id: "targetBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "gitBranchName",
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
      regexDefinitionName: "gitBranchName",
      formText: "Upstream Branch cannot match Source Branch.",
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
    repoId: "",
    targetBranch: "",
    sourceBranch: "",
    upstreamBranch: "",
    isNewBranch: false,
    jobType: "",
  }
};
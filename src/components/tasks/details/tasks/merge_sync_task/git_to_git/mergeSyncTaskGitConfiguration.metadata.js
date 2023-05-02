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
      label: "Repository",
      id: "repoId",
      isRequired: true,
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
        return model?.getData("jobType") === TASK_TYPES.GIT_TO_GIT_MERGE_SYNC && (model?.getData("jiraIssueIds") === undefined || model?.getData("jiraIssueIds")?.length === 0);
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
    {
      label: "Jira Tool",
      id: "jiraToolId",
    },
    {
      label: "Jira Project",
      id: "jiraProjectKey",
    },
    {
      label: "Jira Ticket",
      id: "jiraIssueId",
    },
    {
      label: "Jira Tickets",
      id: "jiraIssueIds",
    },
    {
      label: "Salesforce Task",
      id: "isSalesforce",
    },
    {
      label: "Build Type",
      id: "buildType",
      isRequiredFunction: (model) => {
        return model?.getData("isSalesforce") === true;
      },
    },
    {
      label: "Enable Jira Integration",
      id: "enableJiraIntegration",
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
    jiraToolId: "",
    jiraProjectKey: "",
    jiraIssueId: "",
    jiraIssueIds: undefined,
    buildType: "",
    isSalesforce: false,
    enableJiraIntegration: false,
  }
};
const GitScraperStepFormMetadata = {
  type: "Git Custodian Step Configuration",
  fields: [
    {
      label: "Source Code Management Tool Type",
      id: "service",
      isRequired: true,
    },
    {
      label: "Source Code Management Tool",
      id: "gitToolId",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "repositoryName",
      isRequired: true,
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
      isRequired: true,
    },
    {
      label: "Runtime Arguments",
      id: "keyValueMap",
    },
    {
      label: "Repository",
      id: "repoId",
    },
    {
      label: "Git Project ID",
      id: "projectId",
    },
    {
      label: "BitBucket Workspace",
      id: "workspace",
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
    {
      label: "Scraper Module",
      id: "type",
    },
    {
      label: "Number of Commits to Scan",
      id: "commits",
    },
    {
      label: "Maximum Allows Secrets Threshold",
      id: "threshold",
    },
    {
      label: "Permitted Secret Keys",
      id: "excludeSecrets",
    },
    {
      label: "Git Files to Ignore for Scan",
      id: "excludeFiles",
    },
    {
      label: "Exclude Certain Secrets from Scan",
      id: "secretsException",
    },
    {
      label: "Exclude Certain Project Files from Scan",
      id: "filesException",
    },

  ],
  newObjectFields: {
    gitFilePath: "",
    repository: "",
    repositoryName: "",
    gitBranch: "",
    gitToolId: "",
    repoId: "",
    sshUrl: "",
    gitUrl: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    type: "git_custodian",
    commits: "",
    threshold: 0,
    excludeSecrets: [],
    excludeFiles: [],
    secretsException: false,
    filesException: false,
    service : ""
  },
};

export default GitScraperStepFormMetadata;

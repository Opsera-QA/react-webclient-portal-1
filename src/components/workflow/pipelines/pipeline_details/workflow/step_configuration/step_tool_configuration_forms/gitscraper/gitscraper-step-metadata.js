const GitScraperStepFormMetadata = {
  type: "GitScraper Step Configuration",
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
      label: "Git Repository ID",
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
      id: "secretsToIgnore",
    },
    {
      label: "Git Files to Ignore for Scan",
      id: "filesToIgnore",
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
    gitBranch: "",
    gitToolId: "",
    repoId: "",
    sshUrl: "",
    gitUrl: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    type: "",
    commits: "",
    threshold: "",
    secretsToIgnore: "",
    filesToIgnore: "",
    secretsException: false,
    filesException: false,
    service : ""
  },
};

export default GitScraperStepFormMetadata;

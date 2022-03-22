const GitScraperStepFormMetadata = {
  type: "GitScraper Step Configuration",
  fields: [
    {
      label: "Source Code Management Tool Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Source Code Management Tool",
      id: "gitToolId",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true,
    },
    {
      label: "Branch",
      id: "defaultBranch",
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
      id: "gitRepositoryID",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
    {
      label: "Scraper Module",
      id: "library",
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
    gitRepository: "",
    defaultBranch: "",
    gitToolId: "",
    gitRepositoryID: "",
    sshUrl: "",
    gitUrl: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    library: "",
    commits: "",
    threshold: "",
    secretsToIgnore: "",
    filesToIgnore: "",
    secretsException: false,
    filesException: false
  },
};

export default GitScraperStepFormMetadata;


const gitScraperReposMetadata = {
  type: "GitScraper Repositories",
  fields: [
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
      label: "Git Files to Ignore for Scan",
      id: "excludeFiles",
    },
    {
      label: "Exclude Certain Project Files from Scan",
      id: "filesException",
    },
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
  ],
  newObjectFields: {
    repository: "",
    gitBranch: "",
    repoId: "",
    sshUrl: "",
    gitUrl: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    excludeFiles: [],
    filesException: false,
    service: "",
    gitToolId: ""
  }
};

export default gitScraperReposMetadata;
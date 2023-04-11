import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const GitScraperStepFormMetadata = {
  type: "Git Custodian Step Configuration",
  fields: [
    {
      label: "Source Code Management Type",
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
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true,
    },
    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true,
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
    },
    {
      label: "Runtime Arguments",
      id: "keyValueMap",
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Git Project ID",
      id: "projectId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "BitBucket Workspace",
      id: "workspace",
    },
    {
      label: "Workspace/Project",
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

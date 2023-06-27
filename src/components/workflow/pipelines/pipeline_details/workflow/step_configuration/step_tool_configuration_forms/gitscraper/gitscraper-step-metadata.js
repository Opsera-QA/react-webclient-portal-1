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
      helpTooltipText: "Select any Parameters to be ignored during the scan from the drop-down. These will not be counted toward the threshold. To add them to the table, click the Add button. Parameters are fetched from Tool Registry Parameters."
    },
    {
      label: "Exclude Certain Project Files from Scan",
      id: "filesException",
      helpTooltipText: "Select Absolute File Path(s) to be ignored during the scan from the drop-down. These will not be counted toward the threshold. To add them to the table, click the Add button."
    },
    {
      label: "Enable Email Scan",
      id: "scanEmail",
      helpTooltipText: "Select to find emails from the code. Additionally, specify any email domains to exclude from the scan."
    },
    {
      label: "Domains to be excluded from scan",
      id: "excludeDomains",
      regexDefinitionName: "domainFieldWithExtension",
    },
    {
      label: "Set Custom Entropy",
      id: "customEntropy",
      helpTooltipText: "Plain Text passwords are identified using the entropy of the string identified. The default entropy is 3.5. Select to set a custom entropy in the range of 2.4 to 5."
    },
    {
      label: "Custom Entropy",
      id: "entropy",
    },
    {
      label: "Enable Email Scan",
      id: "scanEmail",
    },
    {
      label: "Domains to be excluded from scan",
      id: "excludeDomains",
      regexDefinitionName: "domainFieldWithExtension",
    },
    {
      label: "Set Custom Entropy",
      id: "customEntropy",
    },
    {
      label: "Custom Entropy",
      id: "entropy",
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
    service: "",
    scanEmail: false,
    excludeDomains: [],
    customEntropy: false,
    entropy: 3.5,
  },
};

export default GitScraperStepFormMetadata;

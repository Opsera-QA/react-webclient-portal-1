const gitscraperTaskConfigurationMetadata = {
  type: "Git Custodian Configuration",
  fields: [
    {
      label: "Repositories Available to Scan",
      id: "reposToScan",
    },
    {
      label: "Repositories Available to Scan",
      id: "repositories",
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
      regexDefinitionName: "numbersOnly",
    },
    {
      label: "Permitted Secret Keys",
      id: "excludeSecrets",
    },
    {
      label: "Exclude Certain Secrets from Scan",
      id: "secretsException",
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
    {
      label: "Advanced Options",
      id: "advancedOptions",
    },    
    {
      label: "Scan all Repositories",
      id: "scanAll",
    },
    {
      label: "Scan only selected branch",
      id: "scanOnlyBranch",
    },
    {
      label: "Branch to be Scanned",
      id: "gitBranch",
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
    {
      label: "BitBucket Workspace",
      id: "workspace",
      isRequiredFunction: (model) => {
        return model?.getData("service") === "bitbucket";
      },
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
      isRequiredFunction: (model) => {
        return model?.getData("service") === "bitbucket";
      },
    },
  ],
  newObjectFields:
    {
      repositories: [],
      reposToScan: [],
      type: "git_custodian",
      commits: "",
      threshold: 0,
      excludeSecrets: [],
      secretsException: false,
      scanEmail: false,
      excludeDomains: [],
      customEntropy: false,
      entropy: 3.5,
      advancedOptions: false,
      scanAll: false,
      scanOnlyBranch: false,
      gitBranch: "",
      service: "",
      gitToolId: "",
      workspace: "",
      bitbucketWorkspaceName: "",
    },
};

export default gitscraperTaskConfigurationMetadata;
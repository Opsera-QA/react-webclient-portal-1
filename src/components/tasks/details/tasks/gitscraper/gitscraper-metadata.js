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
      regexDefinitionName: "numbersOnly"
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
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
  ],
  newObjectFields:
    {
      repositories:[],
      reposToScan:[],
      type:"git_custodian",
      commits:"",
      threshold:0,
      excludeSecrets:[],
      secretsException:false,
      service: "",
      gitToolId: "",
      workspace: "",
      bitbucketWorkspace: ""
    }
};

export default gitscraperTaskConfigurationMetadata;
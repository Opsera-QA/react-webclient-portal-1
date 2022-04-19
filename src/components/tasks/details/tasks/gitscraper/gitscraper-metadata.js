const gitscraperTaskConfigurationMetadata = {
  type: "Gitscraper Configuration",
  fields: [
    {
      label: "Repositories To Scan",
      id: "reposToScan",
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
      label: "Exclude Certain Secrets from Scan",
      id: "secretsException",
    }
  ],
  newObjectFields:
    {
      reposToScan:[],
      type:"",
      commits:"",
      threshold:0,
      excludeSecrets:[],
      secretsException:false,
      gitToolId:"",
    }
};

export default gitscraperTaskConfigurationMetadata;
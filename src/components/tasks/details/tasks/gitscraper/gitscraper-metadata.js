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
  newObjectFields:
    {
      reposToScan:[],
      type:"",
      commits:"",
      threshold:0,
      excludeSecrets:[],
      secretsException:false,
      service: "",
      gitToolId: ""
    }
};

export default gitscraperTaskConfigurationMetadata;
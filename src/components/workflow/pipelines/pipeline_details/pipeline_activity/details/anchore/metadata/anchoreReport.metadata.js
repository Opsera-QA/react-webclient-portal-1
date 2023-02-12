const anchoreReportMetadata = {
  type: "Anchore Report Metadata",
  fields: [
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "Vulnerability",
      id: "vuln",
    },
    {
      label: "URL",
      id: "url",
    },    
    {
      label: "Package Name",
      id: "packageName",
    },
    {
      label: "Package Type",
      id: "packageType",
    },
    {
      label: "Package Version",
      id: "packageVersion",
    },
    {
      label: "Package",
      id: "pkg",
    },
    {
      label: "Vulnerability",
      id: "vulnLink",
    },
  ],
  newObjectFields: {
    severity: "",
    vuln: "",
    url: "",
    packageType: "",
    packageVersion: "",
    pkg: "",
    vulnLink: {}
  }
};

export default anchoreReportMetadata;

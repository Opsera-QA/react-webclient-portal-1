const anchoreSecurityReportMetadata = {
  type: "Anchore Security Report",
  fields: [
    {
      label: "Vulnerability",
      id: "vulnerability",
    },
    {
      label: "Package Name",
      id: "package_name",
    },
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "CVSS Base",
      id: "cvss_base",
    },
    {
      label: "CVSS Exploitability Score",
      id: "cvss_exploitability_score",
    },
    {
      label: "CVSS Impact Score",
      id: "cvss_impact_score",
    },
    {
      label: "Vulnerability URL",
      id: "url",
    },
  ],
  newObjectFields: {
    vulnerability: "",
    package_name: "",
    severity: "",
    url: "",
    cvss_exploitability_score: "",
    cvss_impact_score: "",
    cvss_base: "",
  }
};

export default anchoreSecurityReportMetadata;
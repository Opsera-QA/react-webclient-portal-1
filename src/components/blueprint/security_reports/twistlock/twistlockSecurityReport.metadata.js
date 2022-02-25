const twistlockSecurityReportMetadata = {
  type: "Twistlock Security Report",
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
      label: "CVSS",
      id: "cvss",
    },
    {
      label: "Risk Factors",
      id: "risk_factors",
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
    risk_factors: [],
    cvss: "",
  }
};

export default twistlockSecurityReportMetadata;
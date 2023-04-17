const snykOpenSourceSecurityReportMetadata = {
  type: "Snyk Open Source Security Report",
  fields: [
    {
      label: "Id",
      id: "id",
    },
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "Category",
      id: "category",
    },    
    {
      label: "CWE",
      id: "cwe",
    },
    {
      label: "CVE",
      id: "cve",
    },
    {
      label: "File Name",
      id: "fileName",
    },
    {
      label: "Upgradable",
      id: "upgradable",
    },
    {
      label: "Patchable",
      id: "patchable",
    },

    {
      label: "Version",
      id: "version",
    },
    {
      label: "Introduced By",
      id: "introducedBy",
    },
    {
      label: "Upgrade To",
      id: "upgradeTo",
    },
    {
      label: "Organization",
      id: "organization",
    },
    {
      label: "Snyk Product",
      id: "snykProduct",
    },
  ],
  newObjectFields: {
    id: "",
    severity: "",
    category: "",
    cwe: "",
    cve: "",
    fileName: "",
    upgradable: false,
    patchable: false,
    version: "",
    introducedBy: "",
    upgradeTo: "",
    organization: "",
    snykProduct: "",
  }
};

export default snykOpenSourceSecurityReportMetadata;

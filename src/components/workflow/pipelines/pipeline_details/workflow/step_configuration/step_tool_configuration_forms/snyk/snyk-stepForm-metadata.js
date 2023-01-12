const snykStepFormMetadata = {
  type: "Snyk Tool Configuration",
  fields: [
    {
      label: "Snyk Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Snyk Products",
      id: "snykProducts",
      isRequired: true
    },
    {
      label: "Language",
      id: "languageLevelId",
      isRequired: true
    },
    {
      label: "Language Version",
      id: "version",
      isRequired: true
    },
    {
      label: "Package Manager or Build Tool",
      id: "packagerNameOrBuildTool",
    },
    {
      label: "Multi Module Project",
      id: "multiModuleProject",
      isRequired: true,
    },
    {
      label: "Vulnerability Threshold",
      id: "thresholdVulnerability",
      isRequired: true,
    },
    {
      label: "Git Account",
      id: "gitToolId",
      isRequired: true,
    },
    {
      label: "Git Repository",
      id: "repoId",
      isRequired: true
    },
    {
      label: "Git Branch Name",
      id: "gitBranch",
      isRequired: true
    }
  ],
  newObjectFields: {
    snykProducts: [],
    languageLevelId: "",
    version: "",
    packagerNameOrBuildTool: "",
    toolConfigId: "",
    multiModuleProject: "",
    thresholdVulnerability: "",
    gitToolId: "",
    repoId: "",
    gitBranch: ""
  }
};

export default snykStepFormMetadata;
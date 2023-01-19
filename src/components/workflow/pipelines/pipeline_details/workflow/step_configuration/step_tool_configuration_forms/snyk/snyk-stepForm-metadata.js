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
    },
    {
      label: "Vulnerability Threshold",
      id: "thresholdVulnerability",
      isRequired: true,
    },
    {
      label: "Git Tool ID",
      id: "gitToolId",
      isRequired: true,
    },
    {
      label: "Git Service",
      id: "service",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      isRequired: true
    },
    {
      label: "Git URL",
      id: "gitUrl",
      isRequired: true
    },
    {
      label: "Git Branch",
      id: "gitBranch",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "projectId",
    },
    {
      label: "Repository Name",
      id: "repositoryName",
    },
    {
      label: "Workspace",
      id: "workspace",
    },
    {
      label: "Workspace Name",
      id: "workspaceName",
    }
  ],
  newObjectFields: {
    snykProducts: [],
    languageLevelId: "",
    version: "",
    packagerNameOrBuildTool: "",
    toolConfigId: "",
    multiModuleProject: false,
    thresholdVulnerability: [],
    gitToolId: "",
    repoId: "",
    gitBranch: "",
    service: "",
    sshUrl: "",
    gitUrl:"",
  }
};

export default snykStepFormMetadata;
import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const pmdScanStepFormMetadata = {
  type: "PMD Tool Configuration",
  fields: [
    {
      label: "Step Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Job Name",
      id: "jobName",
      // isRequired: true
    },
    {
      label: "Jenkins Job",
      id: "toolJobName",
      // isRequired: true
    },
    {
      label: "Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Account",
      id: "gitCredential",
      // isRequired: true
    },
    {
      label: "Workspace",
      id: "workspace",
      // isRequired: true
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      // isRequired: true
    },
    {
      label: "Repository",
      id: "repository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      // isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
      // isRequired: true
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      // isRequired: true
    },
    {
      label: "Build/Package Step",
      id: "stepIdXML",
      isRequired: true
    },
    {
      label: "Quality Gate",
      id: "qualityGate",
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    
    {
      label: "Best Practice Threshold",
      id: "bestPracticeThreshold",
      maxItems: 4
    },
    {
      label: "Code Style Threshold",
      id: "codeStyleThreshold",
      maxItems: 4
    },
    
    {
      label: "Design Threshold",
      id: "designThreshold",
      maxItems: 4
    },
    {
      label: "Error Prone Threshold",
      id: "errorProneThreshold",
      maxItems: 4
    },
    {
      label: "Security Threshold",
      id: "securityThreshold",
      maxItems: 4
    },
  ],
  newObjectFields: {
    jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
    toolConfigId: "",
    jobName: "",
    toolJobId: "",
    toolJobType: "",
    projectId: "",
    gitBranch: "",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    gitUserName: "",
    repository: "",
    branch: "",
    workspace: "",
    stepIdXML: "",
    qualityGate: [],
    bestPracticeThreshold: [],
    codeStyleThreshold: [],
    designThreshold: [],
    errorProneThreshold: [],
    securityThreshold: [],
    workspaceDeleteFlag: false
  }
};

export default pmdScanStepFormMetadata;
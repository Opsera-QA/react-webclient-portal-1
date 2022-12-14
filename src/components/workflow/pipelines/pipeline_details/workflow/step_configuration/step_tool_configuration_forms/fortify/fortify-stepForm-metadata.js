import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const FortifyStepFormMetadata = {
  type: "Fortify Step Configuration",
  fields: [
    {
      label: "Fortify Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      id: "scanToolType"
    },
    {
      label: "Application",
      id: "applicationId",
      isRequired: true,
    },
    {
      id: "applicationName",
    },
    {
      label: "Release/Version",
      id: "releaseId",
      isRequired: true,
    },
    {
      id: "releaseName",
    },
    {
      label: "Assessment Type",
      id: "assessmentType",
      isRequired: true,
    },
    {
      label: "Entitlement",
      id: "entitlementPreferenceType",
      isRequired: true,
    },
    {
      label: "Technology Stack",
      id: "technologyStackId",
      isRequired: true,
    },
    {
      label: "Language Id",
      id: "languageLevelId",
    },
    {
      label: "Audit Preference",
      id: "auditPreferenceId",
      isRequired: true,
    },
    {
      label: "Enable Client Side thresholds",
      id: "clientSideThreshold"
    },
    {
      label: "Vulnerability Threshold",
      id: "thresholdVulnerability",
      isRequired: true,
    },
    {
      label: "SCM Type",
      id: "service",
      isRequired: true
    },
    {
      label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Workspace",
      id: "workspace"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName"
    },
    {
      label: "Repository",
      id: "gitRepository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true
    },    
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true
    },
    {
      id: "sshUrl"
    },
    {
      id: "gitUrl"
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    scanToolType: "",
    applicationId: "",
    applicationName: "",    
    releaseId: "",
    releaseName: "",
    assessmentType: "",
    entitlementPreferenceType: "",
    technologyStackId: "",
    languageLevelId: "",
    auditPreferenceId: "",
    clientSideThreshold: false,
    thresholdVulnerability: "",
    service: "",
    gitToolId: "",
    workspace: "",
    workspaceName: "",
    gitRepository: "",    
    repoId: "",
    gitBranch: "",
    sshUrl: "",
    gitUrl: "",
  }
};

export default FortifyStepFormMetadata;

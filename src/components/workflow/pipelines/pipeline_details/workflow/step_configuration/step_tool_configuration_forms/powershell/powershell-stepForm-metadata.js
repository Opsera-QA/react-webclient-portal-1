import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const powershellStepFormMetadata = {
  type: "Powershell Tool Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true
    },
    {
      label: "Jenkins Job",
      id: "toolJobName",
      isRequired: true
    },
    {
      label: "Jenkins Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Jenkins Job Type",
      id: "toolJobType",
      // isRequired: true
    },
    {
      label: "Step Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Source Code Management Type",
      id: "type",
      isRequired: true
    },
    
    {
      label: "Source Code Management Tool",
      id: "gitCredential",
      isRequired: true
    },
    {
      // label: "Source Code Management Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
      isRequired: true
    },
    
    {
      // label: "Source Code Management Type",
      id: "service",
      isRequired: true
    },
    
    {
      id: "projectId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      id: "gitUrl",
      // isRequired: true
    },
    
    {
      id: "sshUrl",
      // isRequired: true
    },
    
    {
      label: "Repository",
      id: "repository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true
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
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true
    },
    
    {
      label: "Script File Path",
      id: "scriptFilePath",
    },
    {
      label: "Script File Name",
      id: "scriptFileName"
    },
    {
      label: "Output File Path",
      id: "outputPath",
      // isRequired: true
    },
    {
      label: "Output File Name",
      id: "outputFileName",
      formText: "File name with extension is expected.",
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
      // isRequired: true
    },
    {
      label: "Job Name",
      id: "jobName"
    },
    {
      label: "Auto-Scaling Enabled?",
      id: "autoScaleEnable"
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
  ],
  newObjectFields: {

    type: "",

    jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
    toolConfigId: "",
    toolName: "",
    jobName: "",

    toolJobId: "",
     
    projectId: "",
  
    buildType: "", //hardcoded now but needs to get it from a dropdown
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",

    gitCredential: "",  // name given on jenkins

    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",

    agentLabels: "",
    autoScaleEnable: false,

    scriptFilePath : "",
    scriptFileName : "",
    outputPath : "",
    outputFileName : "",
    workspaceDeleteFlag: ""
  }
};

export default powershellStepFormMetadata;
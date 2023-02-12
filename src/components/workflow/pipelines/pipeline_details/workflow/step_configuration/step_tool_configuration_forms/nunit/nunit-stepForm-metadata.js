import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const nunitStepFormMetadata = {
  type: "NUnit Tool Configuration",
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
      label: "Jenkins Job Id",
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
      label: "Select SCM Type",
      id: "type",
      isRequired: true
    },
    
    {
      label: "SCM Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "SCM Service Type",
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
      label: "Jenkins Agent",
      id: "agentLabels",
      // isRequired: true
    },
    {
      label: "Job Name",
      id: "jobName"
    },
    {
      label: "Solution File Path",
      id: "solutionFilePath"
    },
    {
      label: "Solution File Name",
      id: "solutionFileName"
    },
    {
      label: "DLL File Path",
      id: "dllFilePath"
    },
    {
      label: "DLL File Name",
      id: "dllFileName"
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
  ],
  newObjectFields: {

    type: "",

    jobType: "",
    toolConfigId: "",
    toolName: "",
    jobName: "",

    toolJobId: "",
     
    projectId: "",

    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",

    gitCredential: "",

    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",

    agentLabels: "",

    solutionFilePath :"",
    solutionFileName :"",
    dllFilePath :"",
    dllFileName :"",
    workspaceDeleteFlag: ""
  }
};

export default nunitStepFormMetadata;
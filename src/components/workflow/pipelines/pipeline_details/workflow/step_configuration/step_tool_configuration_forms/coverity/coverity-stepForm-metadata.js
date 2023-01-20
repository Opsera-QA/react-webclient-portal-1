import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const coverityStepFormMetadata = {
  type: "Coverity Tool Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Coverity Tool",
      id: "coverityToolId",
      isRequired: true
    },
    {
      label:"Coverity Project Name",
      id:"projectName",
      isRequired: true,
      regexDefinitionName: "generalTextWithSpacesSlash",
      maxLength: 95,
    },
    {
      label:"Coverity Stream Name",
      id:"streamName",
      isRequired: true,
      regexDefinitionName: "generalTextWithSpacesSlash",
      maxLength: 95,
    },
    {
      label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true,
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },

    {
      label: "Type of GIT Service",
      id: "service",
      isRequired: true
    },

    {
      label: "Project ID",
      id: "projectId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "GIT URL",
      id: "gitUrl",
    },
    {
      label: "GIT SSH URL",
      id: "sshUrl",
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
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
    },
    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true
    },
    {
      label: "Branch",
      id: "branch",
    },
    {
      label: "Coverity Credentials",
      id: "coverityCredntialId",
      isRequired: true
    },
    {
      label: "Select SCM Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    {
      label: "Jenkins Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: ".Net CLI Type",
      id: "dotnetType",      
    },
    {
      label: ".Net SDK Version",
      id: "dotnetSdkVersion",      
    },
    {
      label: "Command Line Arguments",
      id: "commandLineArguments"
    },
    {
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
    {
      label: "Enable Client Side thresholds",
      id: "clientSideThreshold",
    },
    {
      label: "Vulnerability Threshold",
      id: "displayImpactThreshold",
    },
  ],
  newObjectFields: {
    coverityToolId: "",
    toolConfigId: "",
    toolJobId: "",
    gitCredential: "",
    projectName:"",
    streamName:"",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",
    branch: "",
    jobType:"COVERITY_SCAN",
    toolJobType: ["CODE SCAN"],
    workspaceDeleteFlag:false,
    jobName:"" ,
    coverityCredntialId :"",
    dotnetType: "",
    dotnetSdkVersion : "",
    commandLineArguments: "",
    customParameters: [],
    clientSideThreshold: false,
    displayImpactThreshold: [],
  }
};

export default coverityStepFormMetadata;
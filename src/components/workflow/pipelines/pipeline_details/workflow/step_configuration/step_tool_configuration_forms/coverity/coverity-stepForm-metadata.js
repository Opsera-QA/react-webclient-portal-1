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
      label: "Repository ID",
      id: "repoId",
    },

    {
      label: "Type of GIT Service",
      id: "service",
      isRequired: true
    },

    {
      label: "Project ID",
      id: "projectId",
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
  }
};

export default coverityStepFormMetadata;
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
      isRequired: true
    },
    {
      label:"Coverity Stream Name",
      id:"streamName"
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
      id: "coverityCredntialId"
    },
    {
      label: "Select SCM Account",
      id: "gitCredential",
      isRequired: true
    },
  ],
  newObjectFields: {
    coverityToolId: "",
    toolConfigId: "",
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
    coverityCredntialId :""  
  }
};

export default coverityStepFormMetadata;
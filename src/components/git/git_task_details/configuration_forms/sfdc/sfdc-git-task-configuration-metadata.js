const sfdcGitTaskConfigurationMetadata = {
  type: "SFDC Git Task Configuration",
  //  TODO: This needs to be changed accordingly
  fields: [
    {
      label: "Select Jenkins Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true
    },    
    {
      // label: "Jenkins Job Name",
      id: "jobName",
    },
    {
      label: "Select SCM Type",
      id: "service",
      isRequired: true
    },
    
    {
      label: "Select Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      // label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },        
    {
      id: "projectId",
    },
    {
      id: "gitUrl",
      isRequired: true
    },
    
    {
      id: "sshUrl",
      isRequired: true
    },
    
    {
      label: "Repository",
      id: "repository",
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
      isRequired: true
    },
    {
      id: "sfdcToolId",
      isRequired: true
    },
    {
      label: "SFDC Account",
      id: "sfdcToolName",
      isRequired: true
    },
  ],
  newObjectFields:
    {
    type: "",

    jobType: "",
    toolConfigId: "",
    toolName: "",
    jobName: "",

    toolJobId: "",
     
    projectId: "",
  
    buildType: "ant", // or sfdx
    gitToolId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",

    gitCredential: "",  // name given on jenkins

    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",
    defaultBranch: "",
    dependencyType:"",

    // sfdc specific
    
    sfdcToolId: "",
    sfdcToolName: "",
    accountUsername: "",
    }
};

// jenkinsToolId
// jobName  // jenkins job name
// gitToolId
// service // gitlab/github/bitbucket
// workspace  // only for bitbucket
// repository
// gitBranch
// sfdcToolId
// buildType // ant/sfdx

export default sfdcGitTaskConfigurationMetadata;
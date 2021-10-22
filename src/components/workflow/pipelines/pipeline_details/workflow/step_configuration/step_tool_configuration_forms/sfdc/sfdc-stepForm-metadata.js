const sfdcStepFormMetadata = {
    type: "SFDC Tool Configuration",
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
        label: "Jenkins Job",
        id: "toolJobName",
        isRequired: true
      },
      
      {
        // label: "Jenkins Job Name",
        id: "jobName",
      },
      {
        label: "Jenkins Job",
        id: "toolJobId",
        isRequired: true
      },
      {
        // label: "Jenkins Job Type",
        id: "toolJobType",
        // isRequired: true
      },
      {
        // label: "Step Job Type",
        id: "jobType",
        isRequired: true
      },
      {
        label: "Select SCM Type",
        id: "type",
        // isRequired: true
      },
      
      {
        label: "Select Account",
        id: "gitCredential",
        // isRequired: true
      },
      {
        // label: "Select Account",
        id: "gitToolId",
        // isRequired: true
      },
      {
        id: "repoId",
      },    
      
      {
        // label: "Type of GIT Service",
        id: "service",
        // isRequired: true
      },
      
      {
        id: "projectId",
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
        // isRequired: true
      },
      
      {
        label: "Workspace",
        id: "workspace",
        // isRequired: true
      },
      {
        id: "workspaceName"
      },
  
      {
        label: "Branch",
        id: "gitBranch",
        // isRequired: true
      },
      {      
        id: "defaultBranch",
        // isRequired: true
      },
      {
        label: "Dependency",
        id: "dependencyType",
        // isRequired: true
      },
      {
        id: "dependencies",
        // isRequired: true
      },
      {
        label: "Jenkins Agent",
        id: "agentLabels",
        // isRequired: true
      },
      
      {
        id: "sfdcToolId",
        // isRequired: true
      },
      {
        label: "SFDC Account",
        id: "sfdcToolName",
        // isRequired: true
      },
      {
        id: "sfdcDestToolId",
        // isRequired: true
      },
      {
        id: "destAccountUsername"
      },
      {
        label: "Destination SFDC Account",
        id: "sfdcDestToolName",
        // isRequired: true
      },
      {
        label: "Rollback Branch Name",
        id: "rollbackBranchName",
        // isRequired: true,
        formText: "An Orphan branch will be created with only the back up specific files."
      },
      {
        label: "Build/Xml Step Info",
        id: "stepIdXML",
        // isRequired: true
      },
  
      {
        label: "Compare with destination SFDC Org?",
        id: "isOrgToOrg",
        // isRequired: true
      },
      {
        label: "Take Full Backup?",
        id: "isFullBackup",
        // isRequired: true
      },
      {
        label: "SFDC Unit Test Type",
        id: "sfdcUnitTestType",
        // isRequired: true,
        formText: "TestLevel of NoTestRun cannot be used in production organizations"
      },
      
      {
        label: "Create a new backup branch?",
        id: "isNewBranch",
        // isRequired: true,
        formText: "Creates a new branch and push the artifacts."
      },
      
      {
        label: "Use an upstream branch?",
        id: "hasUpstreamBranch",
        // isRequired: true
        formText: "Configure an upstream/source branch. The Files will be overwritten when pushing the artifacts. If no upstream branch is configured, then the new Artifact branch is created as an Orphan branch, having only the artifact files and no commit history."
      },
      {
        label: "Upstream Branch",
        id: "upstreamBranch",
        // isRequired: true
      },  
      {
        id: "buildType"
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
    newModelBase: {
  
      type: "",
  
      jobType: "",
      toolConfigId: "",
      toolName: "",
      jobName: "",
  
      toolJobId: "",
       
      projectId: "",
    
      buildType: "ant",
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
      defaultBranch: "",
      dependencyType:"",
  
      agentLabels: "",
  
      // sfdc specific
      
      sfdcToolId: "",
      sfdcToolName: "",
      accountUsername: "",
      sfdcDestToolId: "",
      sfdcDestToolName: "",
      destAccountUsername: "",
  
      rollbackBranchName: "",
      stepIdXML: "",
      
      isOrgToOrg: false,
      isFullBackup: false,
      sfdcUnitTestType: "",
      isNewBranch: false,
      hasUpstreamBranch: false,
      upstreamBranch: "",    
      autoScaleEnable: false,
      workspaceDeleteFlag: false
    }
  };
  
  export default sfdcStepFormMetadata;
  
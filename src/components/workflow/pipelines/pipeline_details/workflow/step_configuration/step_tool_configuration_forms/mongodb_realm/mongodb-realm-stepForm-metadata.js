const mongodbRealmStepFormMetadata = {
    type: "MongoDB Realm Tool Configuration",
    fields: [
      {
        label: "Jenkins Tool Selection",
        id: "toolConfigId",
        isRequired: true
      },
      {
        label: "MongoDB Realm Tool",
        id: "mongoToolId",
        isRequired: true
      },
      {
        label: "Application Name",
        id: "applicationName",
        isRequired: true,
        regexDefinitionName: "generalText",
        maxLength: 100,
        formText: "Only letters, numbers, dashes, colons, underscores, and periods are allowed"
      },
      {
        label: "Account",
        id: "gitCredential",
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
        label: "Repository",
        id: "repository",
        isRequired: true
      },
      {
        label: "Repository",
        id: "repositoryName",
        isRequired: true
      },
      {
        label: "Repository",
        id: "repoId",
        isRequired: true
      },
      {
        label: "Branch Name",
        id: "gitBranch",
        isRequired: true
      },
      {
        label: "Schema Map",
        id: "schemaGitFileList",
        isRequired: true,
        maxItems: 10,

      },
    ],
    newObjectFields: {    
      toolConfigId: "",
      mongoToolId:"",
      applicationName: "",
      gitCredential: "",
      workspace: "",
      workspaceName: "",
      repository: "",
      repositoryName: "",
      repoId: "",
      gitBranch: "",
      schemaGitFileList: [],
      jobType: "MONGODB_REALM_DEPLOY",
      toolJobType : [
        "MONGODB_REALM_DEPLOY"
      ],
      agentLabels : "generic-linux",
      workspaceDeleteFlag:false,
      jobName:""
    }
  };
  
  export default mongodbRealmStepFormMetadata;
  

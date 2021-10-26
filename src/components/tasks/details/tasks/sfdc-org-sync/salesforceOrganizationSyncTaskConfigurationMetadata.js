const salesforceOrganizationSyncTaskConfigurationMetadata = {
  type: "Salesforce Organization Sync Task Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true,
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },  
    {
      label: "Auto Scaling",
      id: "autoScaleEnable"
    },
    {
      label: "Agent Label",
      id: "agentLabels",
      regexDefinitionName: "generalTextWithoutSpacesPeriod",
      maxLength: 50
    },  
    {
      label: "Jenkins Job Name",
      id: "jobName",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
      regexDefinitionName: "alphabetic",
    },    
    {
      label: "Account",
      id: "gitCredential",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },        
    {
      id: "projectId",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      id: "gitUrl",
    },
    
    {
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },

    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "gitBranchName",
    },
    {
      label: "Salesforce Account",
      id: "sfdcToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Salesforce Account",
      id: "sfdcToolName",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Create a new branch?",
      id: "isNewBranch",
      formText: "Creates a new branch and sync the changes.",
    },
    {
      label: "Upstream Branch",
      id: "upstreamBranch",
      regexDefinitionName: "generalTextWithSpacesSlash",
      maxLength: 50
    },
    {
      label: "Include Package XML",
      id: "includePackageXml"
    },
    {
      label: "Package XML Reference Path",
      id: "packageXmlReferencePath",
      regexDefinitionName: "pathField",
      formText: `
      Specify where the Package XML needs to be copied or merged with existing Package XML. 
      In order to have the Package XML updated in current directory, give the path as '.' (dot).
      `,
      isRequiredFunction: (model) => {
        return model?.getData("includePackageXml") === true;
      },
    },
  ],
  newObjectFields: {
    type: "",
    jobType: "SFDC_GIT_SYNC",
    toolConfigId: "",
    autoScaleEnable: false,
    toolJobName: "",
    toolName: "",
    jobName: "",
    agentLabels: "",
    toolJobId: "",
    projectId: "",
    buildType: "ant",
    gitToolId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    branch: "",
    gitBranch: "",
    sourceBranch: "",
    autoApprove: false,
    defaultBranch: "",
    dependencyType: "",
    sfdcToolId: "",
    sfdcToolName: "",
    accountUsername: "",
    isNewBranch: false,
    upstreamBranch: "",
    includePackageXml: false,
    packageXmlReferencePath: "",
    reviewers: [],
    reviewerNames: [],
  }
};

export default salesforceOrganizationSyncTaskConfigurationMetadata;
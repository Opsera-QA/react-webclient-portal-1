const dockerCliStepFormMetadata = {
  type: "Docker CLI Tool Configuration",
  fields: [
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
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true,
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true
    },
    {
      id: "sshUrl"
    },
    {
      id: "gitUrl"
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
    },
    {
      label: "Enable Dependency",
      id: "enableDependency"
    },
    {
      label: "Dependency",
      id: "dependencyType",
    },
    {
      id: "dependencies",
    },
    {
      label: "Commands",
      id: "commands",
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments. Multiple commands are supported (each line indicates a new command)"
    },
    {
      label: "Dynamic Parameters",
      id: "environmentVariables",
      maxItems: 15,
    },
    {
      label: "Enable Docker Build",
      id: "enableDockerBuild"
    },
    {
      label: "Input File Name",
      id: "inputFileName"
    },
    {
      label: "Docker Name",
      id: "dockerName",
      isRequiredFunction: (model) => {
        return model?.getData("enableDockerBuild") === true;
      },
      maxLength: 256,
      // TODO: This should be the pattern but this is probably fine.
      regexValidator: RegExp("^[a-zA-Z0-9_.-]*$"),
      isLowercase: true,
      formText:"Lowercase alphanumeric characters and underscore, period, and dash are allowed"
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      regexDefinitionName: "dockerName",
      maxLength: 50,
      lowercase: true,
    },
    {
      label: "Dynamic Tag",
      id: "dynamicTag"
    },
    {
      label: "Docker Dynamic Tag Type",
      id: "dockerTagType"
    },
    {
      label: "Docker Dynamic Tag",
      id: "dockerDynamicTagName",
      formText: "date, timestamp, run_count, commit_sha text can be used to make it dynamic",
      regexDefinitionName: "dockerName",
      maxLength: 50,
      lowercase: true,
    },        
    {
      label: "Build Arguments",
      id: "buildArguments",
    },
    {
      label: "Enable Docker Push",
      id: "enableDockerPush"
    },
    {
      label: "Registry Type",
      id: "registryType",
      isRequiredFunction: (model) => {
        return model?.getData("enableDockerPush") === true;
      },
    },
    {
      label: "Repository",
      id: "repositoryName",
      isRequiredFunction: (model) => {
        return model?.getData("enableDockerPush") === true && model?.getData("type") !== "PORTPERREPO";
      },
    },
    {
      id: "repositoryGroup",
    },
    {
      label: "AWS Tool",
      id: "awsToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "ecr";
      },
    },    
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "acr";
      },
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "acr";
      },
    },
    {
      label: "Resource",
      id: "resource",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "acr";
      },
    },
    {
      label: "Azure Registry",
      id: "azureRegistryName",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "acr";
      },
    },    
    {      
      id: "acrLoginUrl"
    },
    {
      label: "JFrog Tool",
      id: "jfrogToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "jfrog";
      },
    },
    {
      label: "Repository Configuration Type",
      id: "type",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "jfrog";
      },
    },
    {
      label: "Repository Port",
      id: "port",
      regexDefinitionName: "numericalField",
      maxLength: 4,
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "jfrog" && model?.getData("type") === "PORTPERREPO";
      },
    },
    {
      label: "Nexus Tool",
      id: "nexusToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "nexus";
      },
    },
    {
      label: "Docker Port",
      id: "dockerPort",
      regexDefinitionName: "numericalField",
      maxLength: 4,
      isRequiredFunction: (model) => {
        return model?.getData("registryType") === "nexus";
      },
    },    
  ],
  newObjectFields: {
    service: "",
    gitToolId: "",
    workspace: "",
    workspaceName: "",
    gitRepository: "",
    repoId: "",
    gitBranch: "",
    sshUrl: "",
    gitUrl: "",
    gitFilePath: "",
    enableDependency: false,
    dependencyType:"",
    dependencies: {},
    commands: "",
    environmentVariables: [],
    enableDockerBuild: false,
    inputFileName: "",
    dockerName: "",
    dockerTagName: "",
    dynamicTag: false,
    dockerTagType:[],
    dockerDynamicTagName:"",
    buildArguments: [],
    enableDockerPush: false,
    registryType: "",
    repositoryName: "",
    repositoryGroup: "",
    awsToolConfigId: "",
    azureToolConfigId: "",
    azureCredentialId: "",
    resource: "https://management.azure.com",    
    azureRegistryName: "",
    acrLoginUrl: "",
    jfrogToolConfigId: "",
    type: "REPOPATHPREFIX",
    port: "",
    nexusToolConfigId: "",    
    dockerPort: "",
  }
};

export default dockerCliStepFormMetadata;

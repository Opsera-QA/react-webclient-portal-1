const InformaticaStepFormMetadata = {
  type: "Informatica Tool Configuration",
  fields: [
    {
      label: "Informatica Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    }, 
    {
      label: "Type of Execution",
      id: "type",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
    },  
    {
      label: "Informatica Export Object Step",
      id: "buildStepId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "import" && !model?.getData("deployFromGit");
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    },    
    {
      label: "SCM Type",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployFromGit");
      },
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployFromGit");
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    }, 
    {
      label: "Repository",
      id: "repository",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployFromGit");
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Repository",
      id: "repoId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployFromGit");
      },
      maxLength: 255,
      formText:" "
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployFromGit");
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Source Branch",
      id: "sourceBranch",
      isRequiredFunction: (model) => {
        return model?.getData("isNewBranch");
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Path to Zip",
      id: "gitFilePath",
      maxLength: 255,
      regexDefinitionName: "pathField",
      isRequiredFunction: (model) => {
        return model?.getData("deployFromGit");
      },
      formText:" "
    },
    {
      label: "Include Dependencies",
      id: "includeDependencies",
    },
    {
      label: "Deploy from Git",
      id: "deployFromGit",
    },
    {
      label: "Create a new branch",
      id: "isNewBranch",
    },
    {
      label: "Dynamic Branch Name",
      id: "destinationBranch",
      formText: "timestamp, run_count text can be used to make it dynamic ex:`PRETEXT_run_count`",
      regexDefinitionName: "dockerName",
      isRequiredFunction: (model) => {
        return model?.getData("isNewBranch");
      },
      maxLength: 50,
      lowercase: true,
    },
  ],
  newObjectFields: {
    toolConfigId : "",
    type: "",
    buildStepId: "",
    service: "",
    gitToolId : "",
    repository: "",
    repoId: "",
    workspace: "",
    gitBranch: "",
    gitFilePath: "",
    includeDependencies: false,
    deployFromGit: false,
    isNewBranch: false,
    sourceBranch: "",
    destinationBranch: ""
  }
};

export default InformaticaStepFormMetadata;

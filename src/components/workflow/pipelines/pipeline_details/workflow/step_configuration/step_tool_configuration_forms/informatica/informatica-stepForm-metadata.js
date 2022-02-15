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
        return model?.getData("type") === "import" && !model?.getData("deployfromGit");
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    },    
    {
      label: "SCM Type",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployfromGit");
      },
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployfromGit");
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    }, 
    {
      label: "Repository",
      id: "repository",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export" || model?.getData("deployfromGit");
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
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
        return model?.getData("type") === "export" || model?.getData("deployfromGit");
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Path to Zip",
      id: "path",
      maxLength: 255,
      regexDefinitionName: "pathField",
      formText:" "
    },
    {
      label: "Include Dependencies",
      id: "includeDependencies",
    },
    {
      label: "Deploy from Git",
      id: "deployfromGit",
    },
  ],
  newObjectFields: {
    toolConfigId : "",
    type: "",
    buildStepId: "",
    service: "",
    gitToolId : "",
    repository: "",
    workspace: "",
    gitBranch: "",
    path: "",
    includeDependencies: false,
    deployfromGit: false
  }
};

export default InformaticaStepFormMetadata;

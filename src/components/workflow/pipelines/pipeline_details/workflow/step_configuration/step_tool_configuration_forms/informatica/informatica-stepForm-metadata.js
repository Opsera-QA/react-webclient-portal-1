const InformaticaStepFormMetadata = {
  type: "Informatica Tool Configuration",
  fields: [
    {
      label: "Informatica Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
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
        return model?.getData("type") === "import";
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },    
    {
      label: "SCM Type",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export";
      },
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export";
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
    }, 
    {
      label: "Repository",
      id: "repository",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "export";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Include Dependencies",
      id: "includeDependencies",
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
    includeDependencies: false,
  }
};

export default InformaticaStepFormMetadata;

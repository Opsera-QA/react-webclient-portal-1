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
      label: "Informatica Build Step",
      id: "buildStepId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "deploy";
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },    
    {
      label: "SCM Type",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "build";
      },
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "build";
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
    }, 
    {
      label: "Repository",
      id: "repository",
      isRequiredFunction: (model) => {
        return model?.getData("type") === "build";
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
        return model?.getData("type") === "build";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
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
  }
};

export default InformaticaStepFormMetadata;

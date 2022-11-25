const InformaticaIdqStepFormMetadata = {
  type: "Informatica Tool Configuration",
  fields: [
    {
      label: "Informatica IDQ Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    }, 
    {
      label: "Type of Execution",
      id: "jobType",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
    },  
    {
      label: "Source Project",
      id: "sourceProject",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "export";
      },
      maxLength: 24,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },    
    {
      label: "SCM Type",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "export";
      },
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "export";
      },
      maxLength: 24,
      regexDefinitionName: "mongoId",
      formText:" "
    }, 
    {
      label: "Repository",
      id: "repository",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "export";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Repository",
      id: "repoId",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "export";
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
        return model?.getData("jobType") === "export";
      },
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      formText:" "
    },
    {
      label: "Application Path(s)",
      id: "sourcePaths",
      maxLength: 255,
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "export";
      },
      formText:" "
    },
    {
      label: "Export StepId",
      id: "exportStepId",
      maxLength: 255,
      regexDefinitionName: "mongoId",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "import";
      },
      formText:" "
    },
    {
      label: "Target Project",
      id: "targetProject",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "import";
      },
      formText:" "
    },
    {
      label: "Import StepId",
      id: "importStepId",
      maxLength: 255,
      regexDefinitionName: "mongoId",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "deploy";
      },
      formText:" "
    },
  ],
  newObjectFields: {
    toolConfigId : "",
    jobType: "",
    service: "",
    gitToolId : "",
    repository: "",
    repoId: "",
    workspace: "",
    gitBranch: "",
    sourceProject: "",
    sourcePaths: [],
    exportStepId: "",
    targetProject: "",
    importStepId: "",
  }
};

export default InformaticaIdqStepFormMetadata;

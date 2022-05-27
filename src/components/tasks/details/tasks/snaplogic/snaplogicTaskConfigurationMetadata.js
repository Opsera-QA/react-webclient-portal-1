const snaplogicTaskConfigurationMetadata = {
    type: "Snaplogic Task Configuration",
    fields: [
        {
          label: "Snaplogic Tool",
          id: "toolConfigId",
          isRequired: true,
          regexDefinitionName: "mongoId",
        },
        {
          label: "Select Account",
          id: "gitToolId",
          isRequired: true,
          regexDefinitionName: "mongoId",
        },
        {
          label: "SCM Service",
          id: "service",
          isRequired: true,
          maxLength: 10,
          lowercase: true,
          regexDefinitionName: "alphabetic",
        },
        {
          label: "Repository",
          id: "gitRepository",
          isRequired: true
        },    
        {
          label: "Project ID",
          id: "projectId",
        },
        {
          label: "Source Branch",
          id: "gitBranch",
          isRequired: true
        },
        {
            label: "Target Branch",
            id: "targetBranch",
            isRequired: true
        },
        {
          label: "Snaplogic Project Space",
          id: "projectSpace",
          isRequired: true
        },
        {
          label: "Snaplogic Project",
          id: "project",
          isRequired: true
        },
        {
            label: "Validate Scan",
            id: "iValidatorScan",
        },
        {
            label: "Validation URL",
            id: "validationURL",
            isRequiredFunction: (model) => {
                return model?.getData("iValidatorScan") === true;
            },
            maxLength: 2048,
            regexDefinitionName: "urlField",
        },
        {
            label: "Validation Token",
            id: "validationToken",
            isRequiredFunction: (model) => {
                return model?.getData("iValidatorScan") === true;
            },
            maxLength: 2048,
            regexDefinitionName: "generalTextWithSpacesSlash",
        },
      ],
      newObjectFields: {
        type: "",
        toolConfigId: "",
        gitToolId: "",
        service: "",
        gitRepository: "",    
        projectId: "",
        gitBranch: "",
        targetBranch: "",
        projectSpace: "",
        project: "",
        iValidatorScan: false,
        validationURL: "",
        validationToken: "",
      }
    };
  
  export default snaplogicTaskConfigurationMetadata;
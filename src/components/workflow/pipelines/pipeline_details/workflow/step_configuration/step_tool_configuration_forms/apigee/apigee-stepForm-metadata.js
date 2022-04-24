const APIGEE_TYPES = {
  EXPORT: "export",
  IMPORT: "import",
  DEPLOY: "deploy"
};

const ApigeeStepFormMetadata = {
  type: "Apigee Step Configuration",
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Include Dependant KVM?",
      id: "includeDependantKvm",      
    },
    {
      label: "Export Step Id",
      id: "exportStepId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === APIGEE_TYPES.IMPORT;
      },
    },
    {
      label: "Target Environment",
      id: "targetEnvironment",
      isRequiredFunction: (model) => {
        return model?.getData("type") === APIGEE_TYPES.DEPLOY;
      },
    },
    {
      label: "Delay Time (in secs)",
      id: "delayTime",
      regexDefinitionName: "numericalField",
      isRequiredFunction: (model) => {
        return model?.getData("type") === APIGEE_TYPES.DEPLOY;
      },
    },
    {
      label: "Override Version",
      id: "overrideVersion",      
    },    
  ],
  newObjectFields: {
    type: "export",
    includeDependantKvm: false,
    exportStepId: "",
    targetEnvironment: "",
    delayTime : 0,
    overrideVersion: false,
  }
};

export default ApigeeStepFormMetadata;
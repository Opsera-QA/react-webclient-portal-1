const APIGEE_TYPES = {
  TRANSFER: "transfer",
  DEPLOY: "deploy"
};

const ApigeeStepFormMetadata = {
  type: "Apigee Step Configuration",
  fields: [
    {
      label: "Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Include Dependant KVM",
      id: "includeDependencies",      
    },
    {
      label: "Export Org",
      id: "targetToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("type") === APIGEE_TYPES.TRANSFER;
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
    toolConfigId: "",
    type: "transfer",
    includeDependencies: false,
    targetToolConfigId: "",
    targetEnvironment: "",
    delayTime : 0,
    overrideVersion: false,
  }
};

export default ApigeeStepFormMetadata;

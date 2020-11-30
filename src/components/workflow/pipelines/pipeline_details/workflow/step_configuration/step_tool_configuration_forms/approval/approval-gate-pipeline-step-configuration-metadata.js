const approvalGatePipelineStepConfigurationMetadata = {
  type: "Approval Gate Pipeline Configuration",
  fields: [
    {
      label: "Custom Step Message",
      id: "message",
      isRequired: true
    },
    {
      label: "Point of Contact",
      id: "contact",
      isRequired: true
    },
  ],
  newModelBase: {
    message: "",
    contact: ""
  }
};

export default approvalGatePipelineStepConfigurationMetadata;
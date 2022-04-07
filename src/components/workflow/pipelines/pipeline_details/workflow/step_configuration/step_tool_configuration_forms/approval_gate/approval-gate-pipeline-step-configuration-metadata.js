const approvalGatePipelineStepConfigurationMetadata = {
  type: "Approval Gate Pipeline Configuration",
  fields: [
    {
      label: "Send Custom Message",
      id: "sendCustomMessage",
    },
    {
      label: "Custom Step Message",
      id: "message",
      isRequired: true,
      formText: "Provide the step specific message to include in the approval notification."
    },
    {
      label: "Point of Contact",
      id: "contact",
      isRequired: true,
      formText: "Point of contact if approval assignee has questions."
    },
  ],
  newObjectFields: {
    sendCustomMessage: false,
    message: "",
    contact: "",
  }
};

export default approvalGatePipelineStepConfigurationMetadata;
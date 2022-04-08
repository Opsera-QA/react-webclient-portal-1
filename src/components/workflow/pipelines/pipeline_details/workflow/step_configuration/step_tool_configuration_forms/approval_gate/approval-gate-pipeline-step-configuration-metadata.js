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
      maxLength: 500,
      formText: "Provide the step specific message to include in the approval notification.",
      isRequiredFunction: (model) => {
        return model?.getData("sendCustomMessage") === true;
      },
    },
    {
      label: "Point of Contact",
      id: "contact",
      maxLength: 50,
      formText: "Point of contact if approval assignee has questions.",
      isRequired: true,
    },
  ],
  newObjectFields: {
    sendCustomMessage: false,
    message: "",
    contact: "",
  }
};

export default approvalGatePipelineStepConfigurationMetadata;
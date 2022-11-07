export const userActionsPipelineStepMetadata = {
  type: "User Actions Pipeline Step",
  fields: [
    {
      label: "Send Custom Message",
      id: "sendCustomMessage",
    },
    {
      label: "Custom Step Message",
      id: "message",
      maxLength: 500,
      formText: "Provide the step specific message to include in the acknowledgement notification.",
      isRequiredFunction: (model) => {
        return model?.getData("sendCustomMessage") === true;
      },
    },
    {
      label: "Action Owner",
      id: "contact",
      formText: "For any questions about these actions, please contact this person.",
    },
    {
      label: "Pipeline Instructions",
      id: "pipelineInstructionsId",
      isRequired: true,
      formText: "Please note: The Instructions set selected will be visible to everyone with access to this Pipeline.",
    },
  ],
  newObjectFields: {
    sendCustomMessage: false,
    message: "",
    contact: "",
    pipelineInstructionsId: "",
  }
};
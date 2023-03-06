// TODO: If threshold ends up being the same everywhere, remove individual metadata and make a common use one somewhere else
const ServiceNowPipelineStepThresholdMetadata = {
  type: "Approval Gate Pipeline Threshold",
  fields: [
    {
      label: "User",
      id: "user",
    },
    {
      label: "Email",
      id: "email",
    },
    {
      label: "Approved?",
      id: "approved",
    },
    {
      label: "Approved On",
      id: "approved_on",
    },
  ],
  newObjectFields: {
    user: null,
    email: null,
    approved: false,
    approved_on: null,
  }
};

export default ServiceNowPipelineStepThresholdMetadata;

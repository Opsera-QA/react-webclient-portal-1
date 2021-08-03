const spinnakerStepFormMetadata = {
  type: "Spinnaker Tool Configuration",
  fields: [
    {
      label: "Spinnaker Tool",
      id: "spinnakerId",
      isRequired: true
    },
    {
      label: "Spinnaker URL",
      id: "toolURL",
      isRequired: true
    },
    {
      label: "Spinnaker Application",
      id: "applicationName",
      isRequired: true
    },
    {
      label: "Spinnaker Pipeline",
      id: "pipelineName",
      isRequired: true
    }
  ],
  newObjectFields: {
    spinnakerId: "",
    toolURL: "",
    applicationName: "",
    pipelineName: ""
  }
};

export default spinnakerStepFormMetadata;
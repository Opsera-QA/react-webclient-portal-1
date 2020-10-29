const spinnakerStepFormMetadata = {
  type: "Spinnaker Tool Configuration",
  fields: [
    {
      label: "Select Spinnaker Tool",
      id: "spinnakerId",
      isRequired: true
    },
    {
      label: "Spinnaker Tool URL",
      id: "toolURL",
      isRequired: true
    },
    {
      label: "Select Spinnaker Application",
      id: "applicationName",
      isRequired: true
    },
    {
      label: "Select Spinnaker Pipeline",
      id: "pipelineName",
      isRequired: true
    }
  ],
  newModelBase: {
    spinnakerId: "",
    toolURL: "",
    applicationName: "",
    pipelineName: ""
  }
};

export default spinnakerStepFormMetadata;
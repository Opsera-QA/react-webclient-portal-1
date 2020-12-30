const gcpPipelineStepConfigurationMetadata = {
  type: "GCP Pipeline Step Configuration",
  fields: [
    {
      label: "Build Script Content",
      id: "buildScript",
      isRequired: true,
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments"
    }
  ],
  newModelBase: {
    buildScript: ""
  }
};

export default gcpPipelineStepConfigurationMetadata
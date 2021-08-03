const awsDeployPipelineStepConfigurationMetadata = {
  type: "AWS Deploy Pipeline Configuration",
  fields: [
    {
      label: "Build Script Content",
      id: "buildScript",
      isRequired: true,
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments"
    },
  ],
  newObjectFields: {
    buildScript: "",
  }
};

export default awsDeployPipelineStepConfigurationMetadata;
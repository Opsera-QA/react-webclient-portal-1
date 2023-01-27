const AquasecStepFormMetadata = {
  type: "Aquasec Step Configuration",
  fields: [
    {
      label: "Jenkins Tool Selection",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Aquasec Tool",
      id: "aquasecToolConfigId",
      isRequired: true,
    },
    {
      label: "Build Step",
      id: "buildStepId", 
      isRequired: true
    },
    {
      label: "Docker Registry Tool Id",
      id: "dockerRegistryToolConfigId", 
      isRequired: true
    },
    {
      label: "Docker Image",
      id: "dockerImage", 
      isRequired: true
    },        
  ],
  newObjectFields: {
    toolConfigId: "",
    aquasecToolConfigId: "",
    buildStepId: "",
    dockerRegistryToolConfigId: "",
    dockerImage: "",
    agentLabels: "generic-linux",
    jobType: "AQUASEC_SCAN",
  }
};

export default AquasecStepFormMetadata;

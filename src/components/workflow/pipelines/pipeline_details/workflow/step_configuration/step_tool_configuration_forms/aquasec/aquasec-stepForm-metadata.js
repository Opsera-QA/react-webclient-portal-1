const AquasecStepFormMetadata = {
  type: "Aquasec Step Configuration",
  fields: [
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
    aquasecToolConfigId: "",
    buildStepId: "",
    dockerRegistryToolConfigId: "",
    dockerImage: "",    
  }
};

export default AquasecStepFormMetadata;

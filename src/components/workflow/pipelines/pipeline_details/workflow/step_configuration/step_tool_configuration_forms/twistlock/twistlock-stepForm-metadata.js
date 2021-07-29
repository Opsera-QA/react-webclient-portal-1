const twistlockPipelineStepFormMetadata = {
  type: "Twistlock Tool Configuration",
  fields: [
    {
      label: "Jenkins Tool Selection",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Twistlock Tool",
      id: "twistlockToolId",
      isRequired: true
    },
    {
      label: "Docker Build Step",
      id: "buildStepId",
      isRequired: true
    }
   
  ],
  newObjectFields: {    
    toolConfigId: "",
    twistlockToolId:"",
    buildStepId: "",
    jobType: "TWISTLOCK_SCAN",
    toolJobType : [
      "TWISTLOCK_SCAN"
    ],
    agentLabels : "generic-linux",
    workspaceDeleteFlag:false,
    jobName:""
   
  }
};

export default twistlockPipelineStepFormMetadata;
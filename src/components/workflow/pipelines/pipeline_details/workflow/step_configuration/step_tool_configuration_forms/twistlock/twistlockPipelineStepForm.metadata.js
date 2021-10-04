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
    },
    {
      label: "Enable Client Side thresholds",
      id: "clientSideThreshold",
    },
    {
      label: "Vulnerability Threshold",
      id: "thresholdVulnerability",
    },
    {
      label: "Compliance Threshold",
      id: "thresholdCompliance",
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    twistlockToolId: "",
    buildStepId: "",
    jobType: "TWISTLOCK_SCAN",
    toolJobType: [
      "TWISTLOCK_SCAN"
    ],
    agentLabels: "generic-linux",
    workspaceDeleteFlag: false,
    jobName: "",
    clientSideThreshold: false,
    thresholdVulnerability: [],
    thresholdCompliance: [],
  }
};

export default twistlockPipelineStepFormMetadata;
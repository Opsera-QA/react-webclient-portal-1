const JenkinsShellScriptJobMetadata = {
    type: "Jenkins Shell Script Job",
    fields: [
      {
        label: "Shell Script",
        id: "buildType",
        isRequired: true,
      },
      {
        label: "Agent Label",
        id: "agentLabels",
      },
    ],
    newObjectFields: {
      buildType: "",
      agentLabels: "",
    },
  };
  
  export default JenkinsShellScriptJobMetadata;
  
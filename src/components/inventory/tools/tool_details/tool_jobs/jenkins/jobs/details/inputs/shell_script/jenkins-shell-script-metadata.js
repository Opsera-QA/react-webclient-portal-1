const JenkinsShellScriptJobMetadata = {
    type: "Jenkins Unit Test Job",
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
      agentLabels: "generic-linux",
    },
  };
  
  export default JenkinsShellScriptJobMetadata;
  
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
        formText: "Currently, the only supported Agent Label is Ubuntu Agent",
      },
    ],
    newObjectFields: {
      buildType: "",
      agentLabels: "",
    },
  };
  
  export default JenkinsShellScriptJobMetadata;
  
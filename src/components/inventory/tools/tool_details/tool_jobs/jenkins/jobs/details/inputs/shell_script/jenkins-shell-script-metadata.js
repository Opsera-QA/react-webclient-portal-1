const JenkinsShellScriptJobMetadata = {
    type: "Jenkins Unit Test Job",
    fields: [
      {
        label: "Shell Script",
        id: "buildType",
        isRequired: true,
      },
      
    ],
    newObjectFields: {
      buildType: "",
    },
  };
  
  export default JenkinsShellScriptJobMetadata;
  
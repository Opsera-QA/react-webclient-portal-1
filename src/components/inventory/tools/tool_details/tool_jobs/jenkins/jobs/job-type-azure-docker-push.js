const JenkinsJobTypeAzureDockerPush = {
  agentLabels: {
    label: "Agent Label",
    id: "agentLabels",
    type: "select",
    options: [
      {
        "name": "Ubuntu Agent",
        "env" : "linux",
        "value": "generic-linux",
      }
    ],
    value: "",
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      isRequired: false
    }
  },
  buildType: {
    label: "Build Type",
    id: "buildType",
    type: "",
    value: "docker",
    toShow: true,
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      isRequired: false
    }
  },
};

export default JenkinsJobTypeAzureDockerPush;
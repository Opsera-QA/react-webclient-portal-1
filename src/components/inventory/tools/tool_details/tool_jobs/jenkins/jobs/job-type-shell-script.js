const JenkinsJobTypeShellScript = {
  
  agentLabels: {
    label: "Agent Label",
    id: "agentLabels",
    type: "select",
    options: [
      {
        "name": "Opsera Agent (Linux)",
        "env" : "linux",
        "agentLabel": "opsera",
      },
      {
        "name": "Node Agent (Linux)",
        "env" : "linux",
        "agentLabel": "nodejs",
      },
      {
        "name": "Maven Agent (Linux)",
        "env" : "linux",
        "agentLabel": "maven",
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
  // commands: {
  //   label: "Commands",
  //   id: "commands",
  //   type: "",
  //   value: "",
  //   toShow: true,
  //   disabled: false,
  //   touched: false,
  //   isValid: false,
  //   errorMessage: "",    
  //   rules: {
  //     isRequired: false 
  //   }
  // }
};

export default JenkinsJobTypeShellScript;
const JenkinsJobTypeShellScript = {
  buildType: {
    label: "Script Type",
    id: "buildType",
    type: "select",
    value: "",
    options: [      
      {
        name: "Python",
        value: "python"
      },
      {
        name: "Others",
        value: "others"
      }
    ],    
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
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
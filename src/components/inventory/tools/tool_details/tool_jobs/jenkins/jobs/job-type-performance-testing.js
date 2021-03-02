const JenkinsJobTypePerformanceTesting = {  
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
  // jmeterExportFileName: {
  //   label: "JMeter Export File Name",
  //   id: "jmeterExportFileName",
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
  // }, 
  // jmeterFileName: {
  //   label: "JMeter File Name",
  //   id: "jmeterFileName",
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
  // },
};

export default JenkinsJobTypePerformanceTesting;


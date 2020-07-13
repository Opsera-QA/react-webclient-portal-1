const JenkinsJobTypePerformanceTesting = {
  jmeterExportFileName: {
    label: "JMeter Export File Name",
    id: "jmeterExportFileName",
    type: "",
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
  jmeterFileName: {
    label: "JMeter File Name",
    id: "jmeterFileName",
    type: "",
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
};

export default JenkinsJobTypePerformanceTesting;


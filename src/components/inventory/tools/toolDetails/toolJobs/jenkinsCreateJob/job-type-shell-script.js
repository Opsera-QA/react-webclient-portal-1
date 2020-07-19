const JenkinsJobTypeShellScript = {
  jobName: {
    label: "Job Name",
    id: "jobName",
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
  jobDescription: {
    label: "Job Description",
    id: "jobDescription",
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
  commands: {
    label: "Commands",
    id: "commands",
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
  }
};

export default JenkinsJobTypeShellScript;
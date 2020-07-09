const JenkinsJobTypeSendS3 = {
  buildType: {
    label: "Build Type",
    id: "buildType",
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
  buildTool: {
    label: "Build Tool",
    id: "buildTool",
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

export default JenkinsJobTypeSendS3;
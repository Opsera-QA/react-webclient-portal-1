const JenkinsJobTypeUnitFunctionalTest = {
 buildType: {
    label: "Build Type",
    id: "buildType",
    type: "select",
    value: "",
    options: [
      {
        name: "Gradle",
        value: "gradle"
      },
      {
        name: "Maven",
        value: "maven"
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
  buildTool: {
    label: "Build Tool",
    id: "buildTool",
    type: "select",
    value: "",
    options: [
      {
        name: "Gradle",
        value: "gradle"
      },
      {
        name: "Maven",
        value: "maven"
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
  gradleTask: {
    label: "Gradle Task",
    id: "gradleTask",
    type: "",
    value: "",
    linkedId: "buildType",
    linkedValue: "gradle",      
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  mavenTask: {
    label: "Maven Task",
    id: "mavenTask",
    type: "",
    value: "",
    linkedId: "buildType",
    linkedValue: "maven",      
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
};

export default JenkinsJobTypeUnitFunctionalTest;


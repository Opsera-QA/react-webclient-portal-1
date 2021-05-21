const JenkinsJobTypeBuild = {
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
      },
      {
        name: "Docker",
        value: "docker"
      },
      {
        name: "MS Build",
        value: "msbuild"
      },
      {
        name: "Python",
        value: "python"
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
      },
      {
        name: "Docker",
        value: "docker"
      },
      {
        name: "MS Build",
        value: "msbuild"
      },
      {
        name: "Python",
        value: "python"
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
  // buildToolVersion: {
  //   label: "Build Tool Version",
  //   id: "buildToolVersion",
  //   type: "",
  //   value: "6.3",
  //   linkedId: "buildType",
  //   linkedValue: "gradle",      
  //   toShow: true,
  //   disabled: true,
  //   touched: false,
  //   isValid: false,
  //   errorMessage: "",    
  //   rules: {
  //     isRequired: false 
  //   }
  // },
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
  commandLineArgs: {
    label: "Command Line Arguments",
    id: "commandLineArgs",
    type: "",
    value: "",
    linkedId: "buildType",
    linkedValue: "msbuild",
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

export default JenkinsJobTypeBuild;


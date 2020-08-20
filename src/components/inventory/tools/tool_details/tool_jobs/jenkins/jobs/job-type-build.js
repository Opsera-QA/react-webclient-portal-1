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
  dockerName: {
    label: "Docker Name",
    id: "dockerName",
    type: "",
    value: "",
    linkedId: "buildType",
    linkedValue: "docker",      
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  dockerTagName: {
    label: "Docker Tag Name",
    id: "dockerTagName",
    type: "",
    value: "",
    linkedId: "buildType",
    linkedValue: "docker",      
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },
  // buildArgs: {
  //   label: "Build Args",
  //   id: "buildArgs",
  //   type: "",
  //   value: "",
  //   linkedId: "buildType",
  //   linkedValue: "docker",      
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

export default JenkinsJobTypeBuild;


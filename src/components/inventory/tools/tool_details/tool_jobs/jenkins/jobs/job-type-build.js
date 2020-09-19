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
      isRequired: true 
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
      isRequired: true 
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
      isRequired: true 
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
      isRequired: true 
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


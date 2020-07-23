const JenkinsJobTypeBuild = {
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
  buildToolVersion: {
    label: "Build Tool Version",
    id: "buildToolVersion",
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
  buildArgs: {
    label: "Build Args",
    id: "buildArgs",
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
  jobType: {
    label: "Job Type",
    id: "jobType",
    type: "select",
    value: "",
    options: [
      {
        name: "SFDC Create XML Package",
        value: "CREATE PACKAGE XML"
      },
      {
        name: "SFDC Validate XML Package",
        value: "VALIDATE PACKAGE XML"
      },
      {
        name: "SFDC Backup",
        value: "SFDC BACK UP"
      },
      {
        name: "SFDC Deploy (QA)",
        value: "SFDC DEPLOY"
      },
      {
        name: "SDFC Deploy (PROD)",
        value: "SFDC FETCH AND DEPLOY"
      },     
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
  rollbackBranchName: {
    label: "Rollback Branch Name",
    id: "rollbackBranchName",
    type: "",
    value: "",
    linkedId: "jobType",
    linkedValue: "SFDC BACK UP",    
    toShow: true,
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: true 
    }
  }
};

export default JenkinsJobTypeBuild;


const JenkinsJobTypeDockerPush = {   
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
  // jobName: {
  //   label: "Job Name",
  //   id: "jobName",
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
  // jobDescription: {
  //   label: "Job Description",
  //   id: "jobDescription",
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
  // jenkinsUrl: {
  //   label: "Jenkins Url",
  //   id: "jenkinsUrl",
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
  // jUserId: {
  //   label: "Jenkins User ID",
  //   id: "jUserId",
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
  // jAuthToken: {
  //   label: "Jenkins Auth Token",
  //   id: "jAuthToken",
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
  // accessKey: {
  //   label: "Jenkins Access Key",
  //   id: "accessKey",
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
  // secretKey: {
  //   label: "Secret Key",
  //   id: "secretKey",
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
  // regions: {
  //   label: "Region",
  //   id: "regions",
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
  // awsAccountId: {
  //   label: "AWS Account Id",
  //   id: "awsAccountId",
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
  // dockerName: {
  //   label: "Docker Name",
  //   id: "dockerName",
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
  // dockerTagName: {
  //   label: "Docker Tag Name",
  //   id: "dockerTagName",
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
  buildType: {
    label: "Build Type",
    id: "buildType",
    type: "",
    value: "docker",
    toShow: true,
    disabled: true,
    touched: false,
    isValid: false,
    errorMessage: "",    
    rules: {
      isRequired: false 
    }
  },            
};

export default JenkinsJobTypeDockerPush;
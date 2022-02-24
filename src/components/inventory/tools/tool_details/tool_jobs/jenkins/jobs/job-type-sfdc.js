const JobTypeSFDC = {
  jobType: {
    label: "Build Step",
    id: "jobType",
    type: "select",
    value: "",
    options: [      
      {
        name: "SFDC Create XML Package",
        value: "SFDC CREATE PACKAGE XML"
      },
      {
        name: "Salesforce Migration",
        value: "SFDC PROFILE DEPLOY"
      },
      {
        name: "SFDC Validate XML Package",
        value: "SFDC VALIDATE PACKAGE XML"
      },
      {
        name: "SFDC Backup",
        value: "SFDC BACK UP"
      },
      {
        name: "SFDC Deploy",
        value: "SFDC DEPLOY"
      },
      {
        name: "SDFC Unit Test",
        value: "SFDC UNIT TESTING"
      },
      {
        name: "SDFC Push Artifacts",
        value: "SFDC PUSH ARTIFACTS"
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
  // rollbackBranchName: {
  //   label: "Rollback Branch Name",
  //   id: "rollbackBranchName",
  //   type: "",
  //   value: "",
  //   linkedId: "jobType",
  //   linkedValue: "SFDC BACK UP",    
  //   toShow: true,
  //   disabled: false,
  //   touched: false,
  //   isValid: false,
  //   errorMessage: "",    
  //   rules: {
  //     isRequired: true 
  //   }
  // }
};

export default JobTypeSFDC;


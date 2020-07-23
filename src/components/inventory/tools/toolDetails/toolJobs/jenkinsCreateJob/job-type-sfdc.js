const JobTypeSFDC = {
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
        name: "SDFC Unit Test",
        value: "SFDC UNIT TESTING"
      },
      {
        name: "SDFC Deploy (PROD)",
        value: "SFDC FETCH AND DEPLOY"
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

export default JobTypeSFDC;


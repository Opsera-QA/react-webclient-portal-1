const JobTypeSFDC = {
  jobType: {
    label: "Build Step",
    id: "jobType",
    type: "select",
    value: "",
    options: [
      // {
      //   name: "SFDC Create XML Package",
      //   value: "SFDC CREATE PACKAGE XML"
      // },
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
      // {
      //   name: "SDFC Push Artifacts",
      //   value: "SFDC PUSH ARTIFACTS"
      // }
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


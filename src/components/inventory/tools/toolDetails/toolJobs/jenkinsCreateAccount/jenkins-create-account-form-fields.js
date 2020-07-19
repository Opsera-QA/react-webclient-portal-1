const jenkinsCreateAccountFormFields = {
  credentialsId: {
    label: "Name of the credentials given",
    id: "credentialsId",
    type: "",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      isRequired: false 
    }
  },
  credentialsDescription: {
    label: "Description of the credentials",
    id: "credentialsDescription",
    type: "",
    toShow: true,
    value: "",
    disabled: false,
    touched: false,
    isValid: false,
    errorMessage: "",
    rules: {
      isRequired: false 
    }
  }
};

export default jenkinsCreateAccountFormFields;
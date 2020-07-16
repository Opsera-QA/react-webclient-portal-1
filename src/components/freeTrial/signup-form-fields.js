const defaultSignupFormFields = {
  firstName: {
    label: "First Name",
    id: "firstName",
    type: "",
    value: "",
    error: "First name is required",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true 
    }
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    type: "",
    value: "",
    error: "Lase name is required",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true 
    }
  },
  email: {
    label: "Email",
    id: "email",
    type: "",
    value: "",
    error: "Email is not valid",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true,
      isEmail: true
    }
  },
  password: {
    label: "Password",
    id: "password",
    type: "password",
    value: "",
    error: "A minimum of 8 characters is required",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true,
      minLength: 8
    }
  },
  confirmPassword: {
    label: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    value: "",
    error: "A minimum of 8 characters is required",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true,        
      minLength: 8
    }
  }
};

export default defaultSignupFormFields;

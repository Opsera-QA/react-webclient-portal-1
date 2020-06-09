const defaultSignupFormFields = {
  firstName: {
    label: "First Name",
    id: "firstName",
    type: "",
    value: "",
    error: "",
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
    error: "",
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
  organizationName: {
    label: "Company",
    id: "organizationName",
    type: "",
    value: "",
    error: "",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true 
    }
  },
  password: {
    label: "Password",
    id: "password",
    type: "password",
    value: "",
    error: "min 8 chars required",
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
    error: "min 8 chars required",
    touched: false,
    width:  48,
    valid: false, 
    rules: {
      isRequired: true,        
      minLength: 8
    }
  },
  street: {
    label: "Street",
    id: "street",
    type: "",
    value: "",
    error: null,
    touched: true,
    width:  98,
    valid: true, 
    rules: {}
  },
  city: {
    label: "City",
    id: "city",
    type: "",
    value: "",
    error: null,
    touched: true,
    width: 32,
    valid: true, 
    rules: {
      isRequired: true
    }
  },
  state: {
    label: "State",
    id: "state",
    type: "select",
    value: "",
    error: null,
    touched: true,
    width: 32,
    valid: true, 
    rules: {
      isRequired: true
    }
  },
  zip: {
    label: "Zip",
    id: "zip",
    type: "",
    value: "",
    error: null,
    touched: true,
    width: 32,
    valid: true, 
    rules: {
      isRequired: true
    }
  },
  domain: {
    label: "New Resource Subdomain Name",
    id: "domain",
    type: "",
    value: "",
    error: "maximum of 10 chars and no special chars are allowed",
    touched: false,
    width:  98,
    valid: true, 
    rules: {
      isRequired: true,
      isAlphaNumeric: true,
      maxLength: 10,
      minLength: 1,
    }
  },
};

export default defaultSignupFormFields;

// TODO: Pull directly from node server --
//  also write way to pull text from a properties file for easier language localization
const defaultSignupFormFields = {
  firstName: {
    label: "First Name",
    id: "firstName",
    rules: {
      isRequired: true
    }
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    rules: {
      isRequired: true
    }
  },
  email: {
    label: "Email",
    id: "email",
    rules: {
      isRequired: true,
      isEmail: true
    }
  },
  organizationName: {
    label: "Company",
    id: "organizationName",
    rules: {
      isRequired: true 
    }
  },
  password: {
    label: "Password",
    id: "password",
    type: "password",
    rules: {
      isRequired: true,
      minLength: 8
    }
  },
  confirmPassword: {
    label: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    rules: {
      isRequired: true,        
      minLength: 8
    }
  },
  street: {
    label: "Street",
    id: "street",
    rules: {}
  },
  city: {
    label: "City",
    id: "city",
    rules: {
      isRequired: true
    }
  },
  state: {
    label: "State",
    id: "state",
    rules: {
      isRequired: true
    }
  },
  zip: {
    label: "Zip",
    id: "zip",
    rules: {
      isRequired: true
    }
  },
  domain: {
    label: "Resource Subdomain Name",
    id: "domain",
    fieldText: "When new resources are created for this account, this will be the default sub-domain name used when building DNS records.",
    rules: {
      isRequired: false,
      isAlphaNumeric: true,
      maxLength: 10,
    }
  },
  title: {
    label: "Title",
    id: "title",
    rules: {}
  },
  company: {
    label: "Company",
    id: "company",
    rules: {}
  },
  cloudProvider: {
    label: "Cloud Provider",
    id: "cloudProvider",
    rules: {
      isRequired: true
    }
  },
  cloudProviderRegion: {
    label: "Region",
    id: "cloudProviderRegion",
    rules: {
      isRequired: true
    }
  },
};

export default defaultSignupFormFields;

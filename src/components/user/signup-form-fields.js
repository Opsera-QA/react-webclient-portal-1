// TODO: Pull directly from node server --
//  also write way to pull text from a properties file for easier language localization
const defaultSignupFormFields = {
  fields: [
    {
    label: "First Name",
    id: "firstName",
    isRequired: true
  },
    {
    label: "Last Name",
    id: "lastName",
    isRequired: true
  },
    {
    label: "Email",
    id: "email",
    isRequired: true,
    isEmail: true
  },
    {
    label: "Company",
    id: "organizationName",
    isRequired: true
  },
    {
    label: "Password",
    id: "password",
    type: "password",
    isRequired: true,
    minLength: 8
  },
    {
    label: "Confirm Password",
    id: "confirmPassword",
    type: "password",
    isRequired: true,
    minLength: 8
  },
    {
    label: "Street",
    id: "street",
  },
    {
    label: "City",
    id: "city",
    isRequired: true
  },
    {
    label: "State",
    id: "state",
    isRequired: true
  },
    {
    label: "Zip",
    id: "zip",
    isRequired: true
  },
    {
    label: "Resource Subdomain Name",
    id: "domain",
    fieldText: "When new resources are created for this account, this will be the default sub-domain name used when building DNS records.",
    format: /^[A-Za-z0-9][A-Za-z0-9-]*$/,
    isDomain: true,
    isRequired: true,
    maxLength: 10,
  },
    {
    label: "Title",
    id: "title",
  },
    {
    label: "Company",
    id: "company",
  },
    {
    label: "Cloud Provider",
    id: "cloudProvider",
    isRequired: true
  },
    {
    label: "Region",
    id: "cloudProviderRegion",
    isRequired: true
  },
    ],
  newObjectFields: {
    domain: "",
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cloudProvider: "EKS",
    cloudProviderRegion: "us-east-2"
  }
};

// TODO: Make attribute and configuration inner objects and fields once I figure out the best way to deal with inner-fields

export default defaultSignupFormFields;

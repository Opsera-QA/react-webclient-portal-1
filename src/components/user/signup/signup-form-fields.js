import regexHelpers from "utils/regexHelpers";

const defaultSignupFormFields = {
  fields: [
    {
      label: "First Name",
      id: "firstName",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Last Name",
      id: "lastName",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Email",
      id: "email",
      isRequired: true,
      isEmail: true,
      lowercase: true
    },
    {
      label: "Company",
      id: "organizationName",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Street",
      id: "street",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 150
    },
    {
      label: "City",
      id: "city",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
    },
    {
      label: "State",
      id: "state",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Zip",
      id: "zip",
      isRequired: true,
      regexValidator: regexHelpers.regexTypes.limitedTextWithSpaces,
      maxLength: 12
    },
    {
      label: "Resource Subdomain Name",
      id: "domain",
      fieldText: "When new resources are created for this account, this will be the default sub-domain name used when building DNS records.",
      inputMaskRegex: /^[A-Za-z0-9][A-Za-z0-9-]*$/,
      isDomain: true,
      isRequired: true,
      maxLength: 50,
      lowercase: true
    },
    {
      label: "Title",
      id: "title",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Company",
      id: "company",
      regexValidator: regexHelpers.regexTypes.nameField,
      isRequired: true,
      maxLength: 50
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
    company: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cloudProvider: "EKS",
    cloudProviderRegion: "us-east-2"
  }
};

export default defaultSignupFormFields;

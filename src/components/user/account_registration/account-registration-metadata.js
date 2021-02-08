const accountRegistrationMetadata = {
  idProperty: "name",
  type: "Account Registration",
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
      isEmail: true,
      lowercase: true,
      matchField: "confirmEmail"
    },
    {
      label: "Confirm Email",
      id: "confirmEmail",
      isRequired: true,
      isEmail: true,
      lowercase: true,
      matchField: "email"
    },
    {
      label: "Password",
      id: "password",
      type: "password",
      isRequired: true,
      isOpseraPassword: true,
      matchField: "confirmPassword"
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      type: "password",
      isRequired: true,
      matchField: "password"
    },
    {
      label: "Company",
      id: "company",
    },
    {
      label: "Organization Account",
      id: "orgAccount",
      isRequired: true
    },
    {
      label: "LDAP Organization Account",
      id: "ldapOrgAccount",
      isRequired: true
    },
    {
      label: "LDAP Organization Domain",
      id: "ldapOrgDomain",
      isRequired: true
    },
  ],
  newObjectFields: {
    domain: "",
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    orgAccount: "",
    ldapOrgAccount: "",
    ldapOrgDomain: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cloudProvider: "EKS",
    cloudProviderRegion: "us-east-2"
  }
};

export default accountRegistrationMetadata;

const accountRegistrationMetadata = {
  idProperty: "name",
  type: "Account Registration",
  fields: [
    {
      label: "First Name",
      id: "firstName",
      isRequired: true,
      regexDefinitionName: "humanNameField",
      maxLength: 50
    },
    {
      label: "Last Name",
      id: "lastName",
      isRequired: true,
      regexDefinitionName: "humanNameField",
      maxLength: 50
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

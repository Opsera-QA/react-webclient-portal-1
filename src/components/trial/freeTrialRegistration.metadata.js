export const freeTrialRegistrationMetadata = {
  idProperty: "_id",
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
      lowercase: true
    },
    {
      label: "Company",
      id: "company",
      isRequired: true
    },
    {
      label: "Domain",
      id: "domain",
      isRequired: true,
      inputMaskRegex: /^[A-Za-z0-9][A-Za-z0-9-]*$/,
      isDomain: true,
      lowercase: true
    },
    {
      label: "Password",
      id: "password",
      isRequired: true,
      isOpseraPassword: true,
      matchField: "confirmPassword"
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
      isRequired: true,
      matchField: "password"
    },
    {
      label: "Street",
      id: "street",
    },
    {
      label: "City",
      id: "city",
    },
    {
      label: "State",
      id: "state",
    },
    {
      label: "Zip",
      id: "zip",
    },
    {
      label: "Title",
      id: "title",
    },
  ],
  newObjectFields:
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      domain: "free-trial",
      street: "",
      city: "",
      state: "",
      zip: "",
      // TODO: Figure out better way to deal with inner objects, but for now deconstruct and construct before sending
      // attributes: { title: "", company: "" },
      title: "",
      company: "",
    }
};
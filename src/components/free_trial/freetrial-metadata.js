// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const registrationMetadata = {
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
      isEmail: true
    },
    {
      label: "Company",
      id: "company",
      isRequired: true
    },
    {
      label: "Password",
      id: "password",
      isRequired: true,
      minLength: 8
    },
    {
      label: "Confirm Password",
      id: "confirmPassword",
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
  ]
};

export default registrationMetadata;
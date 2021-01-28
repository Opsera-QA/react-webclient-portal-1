export const ldapUsersMetaData = {
  idProperty: "name",
  type: "User",
  fields: [
    {
      label: "Full User Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Preferred Name",
      id: "preferredName",
    },
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
      label: "Email Address",
      id: "emailAddress",
      isRequired: true,
      isEmail: true,
      lowercase: true,
    },
    {
      label: "Division",
      id: "division",
    },
    {
      label: "Teams",
      id: "teams",
    },
    {
      label: "Department Name",
      id: "departmentName",
    },
    {
      label: "Title",
      id: "title",
    },
    {
      label: "Site",
      id: "site",
    },
    {
      label: "LDAP Users",
      id: "users",
    },
    {
      label: "Region",
      id: "region",
    },
  ],
  newObjectFields: {
    name: "",
    title: "",
    firstName: "",
    lastName: "",
    preferredName: "",
    emailAddress: "",
    departmentName: "",
    teams: [],
    division: "",
    site: "",
  }
};
export const ssoUserMetadata = {
  idProperty: "name",
  type: "User",
  detailViewTitle: function (record) {
    return `${record?.getOriginalValue("firstName")} ${record?.getOriginalValue("lastName")} Pending User Details`;
  },
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
      label: "Email Address",
      id: "email",
      isRequired: true,
      isEmail: true,
      lowercase: true,
    },
    {
      label: "Organization",
      id: "organizationName",
    },
    {
      label: "Domain",
      id: "domain",
    },
  ],
  newObjectFields: {
    firstName: "",
    lastName: "",
    email: "",
    organizationName: "",
    domain: "",
  }
};
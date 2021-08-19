export const userReportsMetadata = {
    idProperty: "_id",
    type: "User",
    fields: [
      {
        label: "ID",
        id: "_id",
      },
      {
        label: "Full User Name",
        id: "name",
      },
      {
        label: "User",
        id: "user",
      },
      {
        label: "First Name",
        id: "firstName",
      },
      {
        label: "Distinguished Name",
        id: "dn",
      },
      {
        label: "Last Name",
        id: "lastName",
        isRequired: true
      },
      {
        label: "Email Address",
        id: "emailAddress",
        isEmail: true,
        lowercase: true,
      },
    ],
    newObjectFields: {
      name: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      dn: "",
      user: {}
    }
  };

  export default userReportsMetadata;
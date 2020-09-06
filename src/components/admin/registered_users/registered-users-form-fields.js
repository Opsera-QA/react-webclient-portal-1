const registeredUsersMetadata = {
  idProperty: "_id",
  type: "Template",
  fields: [
  {
    label: "Name",
    id: "firstName",
      minLength: 3,
      isRequired: true 
  },
    {
      label: "User ID",
      id: "_id",
    },
  {
    label: "Email",
    id: "email",
      minLength: 3,
      isRequired: true 
  },
  {
    label: "Organization",
    id: "organizationName",
    // value: [],
  },
    {
      label: "Domain",
      id: "domain",
      // value: [],
    },
  {
    label: "Created",
    id: "createdAt",
    // value: ["opsera", "everyone"],
  },
]
};

export default registeredUsersMetadata;
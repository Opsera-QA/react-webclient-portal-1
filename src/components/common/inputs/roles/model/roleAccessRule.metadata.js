// TODO: Move to know your roles
export const roleAccessRuleMetadata = {
  type: "Access Rule Metadata",
  fields: [
    {
      label: "Access Control Type",
      id: "type",
    },
    {
      label: "Role",
      id: "role",
      isRequired: true,
    },
    {
      label: "Group",
      id: "group",
      maxLength: 25,
      inputMaskRegex: /^[A-Za-z][A-Za-z0-9-_]*$/,
    },
    {
      label: "User",
      id: "user",
      isEmail: true,
    },
    {
      label: "Site Role",
      id: "site_role",
      inputMaskRegex: /^[A-Z][A-Za-z]*$/,
    },
  ],
  newObjectFields: {
    type: "user",
    role: "guest",
    group: "",
    user: "",
    site_role: "",
  },
};

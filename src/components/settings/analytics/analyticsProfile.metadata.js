const AnalyticsProfileMetadata = {
  type: "Analytics Profile",
  fields: [
    {
      label: "Analytics Status",
      id: "active",
      isRequired: true,
    },
    {
      label: "Enabled On",
      id: "enabledToolsOn",
      isRequired: true,
    },
    {
      label: "Default Persona",
      id: "defaultPersona",
      isRequired: true,
    },
    {
      label: "Enabled Indexes",
      id: "enabledIndexes",
    },
    {
      label: "ES Instance URL",
      id: "esInstanceURL",
    },
    {
      label: "User ID",
      id: "userId",
    },
    {
      label: "LDAP Account",
      id: "ldapAccount",
    },
    {
      label: "LDAP Owner",
      id: "ldapOwner",
    },
    {
      label: "LDAP Owner Email",
      id: "ldapOwnerEmail",
    },
  ],
  newObjectFields: {
    active: false,
    enabledToolsOn: "",
    defaultPersona: "",
    enabledIndexes: "",
    esInstanceURL: "",
    userId: "",
    ldapOwner: "",
    ldapAccount: "",
    ldapOwnerEmail: "",
  },
};

export default AnalyticsProfileMetadata;

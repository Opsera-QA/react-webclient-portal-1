const registeredUsersMetadata = {
  idProperty: "_id",
  type: "Registered User",
  fields: [
    {
      label: "User ID",
      id: "_id",
    },
    {
      label: "First Name",
      id: "firstName",
      minLength: 3,
      isRequired: true
    },
    {
      label: "Last Name",
      id: "lastName",
    },
    {
      label: "Email",
      id: "email",
      minLength: 3,
      isRequired: true,
      isEmail: true
    },
    {
      label: "Organization",
      id: "organizationName",
    },
    {
      label: "SSO System",
      id: "ssoSystem",
    },
    {
      label: "SSO Client ID",
      id: "ssoClientId",
    },
    {
      label: "Database Connection String",
      id: "dbConnectionString",
    },
    {
      label: "Domain",
      id: "domain",
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Last LDAP Sync",
      id: "ldapSyncAt",
    },
  ]
};

export default registeredUsersMetadata;
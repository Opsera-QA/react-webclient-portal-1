const registeredUsersMetadata = {
  idProperty: "_id",
  type: "Registered User",
  detailView: function(record) {
    return `/admin/registered-users/${record.getData("email")}`;
  },
  detailViewTitle: function(record) {
    return `${record.getOriginalValue("email")}`;
  },
  fields: [
    {
      label: "Opsera User ID",
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
      label: "Platform SubDomain",
      id: "domain",
    },
    {
      label: "Job Title",
      id: "title",
    },
    {
      label: "Group Membership",
      id: "groups",
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    },
    {
      label: "Last LDAP Sync",
      id: "ldapSyncAt",
    },
  ]
};

export default registeredUsersMetadata;
const paths = {};

// Admin Paths
paths.admin = "admin";
paths.templateManagement = paths.admin+ "/templates";
paths.templateDetailView = paths.templateManagement + "/details/";
paths.toolManagement = paths.admin + "/tools";
paths.toolTypeDetailView = paths.toolManagement + "types/details/";
paths.toolIdentifierDetailView = paths.toolManagement + "identifiers/details/";

// TODO: Update after moving tag screen
paths.tagManagement = paths.admin + "/tags";
paths.tagDetailView = paths.tagManagement + "/details/";

// Ldap paths
paths.ldapDashboard = "accounts";
paths.accountSettings = "settings";
paths.ldapUserManagement = paths.ldapDashboard + "/users";
paths.ldapUserDetailView = paths.ldapUserManagement;
paths.ldapGroupManagement = paths.ldapDashboard + "/groups";
paths.ldapGroupDetailView = paths.ldapUserManagement;
paths.ldapOrganizationManagement = paths.ldapDashboard + "/organizations";
paths.ldapOrganizationDetailView = paths.ldapUserManagement;

//Inventory (Tool Registry) paths
paths.toolRegistry = "inventory/tools";
paths.toolDetailView = paths.toolRegistry + "/details";

export default paths;
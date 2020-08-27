const paths = {};

// Admin Paths
paths.admin = "admin";

paths.templateManagement = paths.admin+ "/templates";
paths.templateDetailView = paths.templateManagement + "/details/";

paths.toolManagement = paths.admin + "/tools";
paths.toolTypeDetailView = paths.toolManagement + "types/details/";
paths.toolIdentifierDetailView = paths.toolManagement + "identifiers/details/";

paths.ldapOrganizationManagement = paths.admin + "/accounts/organizations";
paths.ldapOrganizationDetailView = paths.ldapUserManagement;



// Settings Paths
paths.accountSettings = "settings";
paths.ldapUserManagement = paths.accountSettings + "/users";
paths.ldapUserDetailView = paths.ldapUserManagement;
paths.ldapGroupManagement = paths.accountSettings + "/groups";
paths.ldapGroupDetailView = paths.ldapUserManagement;
paths.tagManagement = paths.accountSettings + "/tags";
paths.tagDetailView = paths.tagManagement + "/details/";

//Inventory (Tool Registry) paths
paths.toolRegistry = "inventory/tools";
paths.toolDetailView = paths.toolRegistry + "/details";

export default paths;
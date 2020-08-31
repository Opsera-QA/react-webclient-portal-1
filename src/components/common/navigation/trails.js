import paths from "./paths";

const trails = {
  // Inventory
  toolRegistry: {parent: undefined, destination: {name: "toolRegistry", path: paths.toolRegistry, label: "Tool Registry"}},
  toolDetailView: {parent: "toolRegistry", destination: {name: "toolDetailView", path: paths.toolDetailView, label: "Tool Details"}},

  // Administration
  admin: {parent: undefined, destination: {name: "admin", path: paths.admin, label: "Administration"}},
  templateManagement: {parent: "admin", destination: {name: "templateManagement", path: paths.templateManagement, label: "Template Management"}},
  templateDetailView: {parent: "templateManagement", destination: {name: "templateDetailView", path: paths.templateDetailView, label: "Template Details"}},
  toolManagement: {parent: "admin", destination: {name: "toolManagement", path: paths.toolManagement, label: "Tool Management"}},
  toolTypeDetailView: {parent: "toolManagement", destination: {name: "toolTypeDetailView", path: paths.toolTypeDetailView, label: "Tool Type Details"}},
  toolIdentifierDetailView: {parent: "toolManagement", destination: {name: "toolIdentifierDetailView", path: paths.toolIdentifierDetailView, label: "Tool Identifier Details"}},

  // Account settings
  accountSettings: {parent: undefined, destination: {name: "accountSettings", path: paths.accountSettings, label: "Account Settings"}},

  // LDAP Users Administration
  ldapUserManagement: {parent: "accountSettings", destination: {name: "ldapUserManagement", path: paths.ldapUserManagement, label: "Users"}},
  ldapUserDetailView: {parent: "ldapUserManagement", destination: {name: "ldapUserDetailView", path: paths.ldapUserDetailView, label: "User Details"}},

  // LDAP Groups Administration
  ldapGroupManagement: {parent: "accountSettings", destination: {name: "ldapGroupManagement", path: paths.ldapGroupManagement, label: "Groups"}},
  ldapGroupDetailView: {parent: "ldapGroupManagement", destination: {name: "ldapGroupDetailView", path: paths.ldapGroupDetailView, label: "Group Details"}},

  // Tag Management
  tagManagement: {parent: "accountSettings", destination: {name: "tagManagement", path: paths.tagManagement, label: "Tag Management"}},
  tagDetailView: {parent: "tagManagement", destination: {name: "tagDetailView", path: paths.tagDetailView, label: "Tag Details"}},

  // Ldap Organizations Administration
  ldapOrganizationManagement: {parent: "admin", destination: {name: "ldapOrganizationManagement", path: paths.ldapOrganizationManagement, label: "Organizations"}},
  ldapOrganizationDetailView: {parent: "ldapOrganizationManagement", destination: {name: "ldapOrganizationDetailView", path: paths.ldapOrganizationDetailView, label: "Accounts"}},

  //Pipelines
  pipelines: {parent: undefined, destination: {name: "pipelines", path: paths.pipelines, label: "Pipelines"}},
  pipelineDetailView: {parent: "pipelines", destination: {name: "pipelineDetailView", path: paths.pipelineDetailView, label: "Pipeline Details"}},
};

export const getTrail = (destination) => {
  let trail = trails[destination];
  let breadcrumbPath = [];
  let endPath = trail.destination;

  while (trail.parent != null) {
    trail = trails[trail.parent]
    breadcrumbPath.unshift(trail.destination);
  }

  return {trail: breadcrumbPath, destination: endPath};
};
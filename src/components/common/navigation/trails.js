// TODO: Find better way to make paths
import {Link} from "react-router-dom";
import React from "react";

// Admin Paths
const admin = "admin";
const ldapDashboard = "accounts"
const accountSettings = "settings"
const ldapUserManagement = ldapDashboard + "/users"
const ldapUserDetailView = ldapUserManagement;
const ldapGroupManagement = ldapDashboard + "/groups"
const ldapGroupDetailView = ldapUserManagement;
const ldapOrganizationManagement = ldapDashboard + "/organizations"
const ldapOrganizationDetailView = ldapUserManagement;

//Inventory (Tool Registry) paths
const toolRegistry = "inventory/tools";
const toolDetailView = toolRegistry + "/details";

const trails = {
  // Inventory
  toolRegistry: {parent: undefined, destination: {name: "toolRegistry", path: toolRegistry, label: "Tool Registry"}},
  toolDetailView: {parent: "toolRegistry", destination: {name: "toolDetailView", path: toolDetailView, label: "Tool Details"}},

  // Administration
  admin: {parent: undefined, destination: {name: "admin", path: admin, label: "Administration"}},

  // LDAP Administration
  ldapDashboard: {parent: "admin", destination: {name: "ldapDashboard", path: ldapDashboard, label: "User and Account Management"}},
  accountSettings: {parent: undefined, destination: {name: "accountSettings", path: accountSettings, label: "Account Settings"}},

  // LDAP Users Administration
  ldapUserManagement: {parent: "accountSettings", destination: {name: "ldapUserManagement", path: ldapUserManagement, label: "Users"}},
  ldapUserDetailView: {parent: "ldapUserManagement", destination: {name: "ldapUserDetailView", path: ldapUserDetailView, label: "User Details"}},

  // LDAP Groups Administration
  ldapGroupManagement: {parent: "accountSettings", destination: {name: "ldapGroupManagement", path: ldapGroupManagement, label: "Groups"}},
  ldapGroupDetailView: {parent: "ldapGroupManagement", destination: {name: "ldapGroupDetailView", path: ldapGroupDetailView, label: "Group Details"}},

  // Ldap Organizations Administration
  ldapOrganizationManagement: {parent: "ldapDashboard", destination: {name: "ldapOrganizationManagement", path: ldapOrganizationManagement, label: "Organizations"}},
  ldapOrganizationDetailView: {parent: "ldapOrganizationManagement", destination: {name: "ldapOrganizationDetailView", path: ldapOrganizationDetailView, label: "Accounts"}},
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
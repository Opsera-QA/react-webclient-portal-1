export const ROLE_LEVELS = {
  OPSERA_ADMINISTRATORS: "OPSERA_ADMINISTRATORS",
  ADMINISTRATORS: "ADMINISTRATORS",
  ADMINISTRATORS_AND_SASS: "ADMINISTRATORS_AND_SASS",
  POWER_USERS: "POWER_USERS",
  POWER_USERS_AND_SASS: "POWER_USERS_AND_SASS",
  USERS: "USERS",
  USERS_AND_SASS: "USERS_AND_SASS"
};

export const SITE_ROLES = {
  OPSERA_ADMINISTRATOR: "opsera_administrator",
  ADMINISTRATOR: "site_administrator",
  POWER_USER: "site_power_user",
  USER: "site_user",
  FREE_TRIAL_USER: "free_trial_user",
  SAAS_USER: "saas_user",
};

export const ACCESS_ROLES = {
  ORGANIZATION_OWNER: "organization_owner",
  ORGANIZATION_ACCOUNT_OWNER: "organization_account_owner",
  ADMINISTRATOR: "administrator",
  OWNER: "owner",
  SECOPS: "secops",
  MANAGER: "manager",
  USER: "user",
  GUEST: "guest",
  UNAUTHORIZED: "unauthorized",
  READ_ONLY: "read_only",
  NO_ACCESS_RULES: "no_access_rules",
  NO_ROLES_ASSIGNED: "no_roles_assigned",
};

export const ACCESS_ROLES_FORMATTED_LABELS = {
  opsera_administrator: "Opsera Administrator",
  organization_owner: "Organization Owner",
  organization_account_owner: "Organization Account Owner",
  administrator: "Administrator",
  saas_user: "User",
  power_user: "Power User",
  owner: "Owner",
  secops: "Secops",
  manager: "Manager",
  user: "User",
  guest: "Guest",
  unauthorized: "UNAUTHORIZED",
  no_access_rules: "No Access Rules On Item",
  no_roles_assigned: "No Role Assigned to User",
  free_trial_user: "User",
  read_only: "Read Only Access",
};

export const meetsRequirements = (requirement, accessRoleData) => {
  if (accessRoleData == null) {
    return false;
  }

  switch (requirement) {
    case ROLE_LEVELS.OPSERA_ADMINISTRATORS:
      return isOpseraAdministrator(accessRoleData);
    case ROLE_LEVELS.ADMINISTRATORS:
      return isAdministrator(accessRoleData);
    case ROLE_LEVELS.ADMINISTRATORS_AND_SASS:
      return isAdministratorOrSass(accessRoleData);
    case ROLE_LEVELS.POWER_USERS:
      return isPowerUser(accessRoleData);
    case ROLE_LEVELS.POWER_USERS_AND_SASS:
      return isPowerUserOrSass(accessRoleData);
    case ROLE_LEVELS.USERS:
      return isUser(accessRoleData);
    case ROLE_LEVELS.USERS_AND_SASS:
      return isUserOrSassUser(accessRoleData);
  }
};

export const isOpseraAdministrator = (accessRoleData) => {
  return accessRoleData?.OpseraAdministrator;
};

export const isAdministrator = (accessRoleData) => {
  return accessRoleData?.OpseraAdministrator || accessRoleData?.Administrator;
};

export const isAdministratorOrSass = (accessRoleData) => {
  return accessRoleData?.OpseraAdministrator || accessRoleData?.Administrator || accessRoleData?.SassPowerUser;
};

export const isPowerUser = (accessRoleData) => {
  return accessRoleData?.PowerUser || accessRoleData?.Administrator || accessRoleData?.OpseraAdministrator;
};

export const isPowerUserOrSass = (accessRoleData) => {
  return accessRoleData?.PowerUser || accessRoleData?.Administrator || accessRoleData?.OpseraAdministrator || accessRoleData?.SassPowerUser;
};

export const isUser = (accessRoleData) => {
  return accessRoleData?.PowerUser || accessRoleData?.Administrator || accessRoleData?.OpseraAdministrator || accessRoleData?.User;
};

export const isUserOrSassUser = (accessRoleData) => {
  return accessRoleData !== undefined;
};

export const ACCESS_ROLE_PERMISSION_MESSAGES = {
  ADMINISTRATOR: "Administrator User Role: Your account has full access to the Opsera platform and its settings.",
  POWER_USER: "Power User Role: Your account has elevated privileges to the Opsera platform.",
  USER: "Standard User Role: Your account has standard user access to the Opsera platform and inherits access based on individual item access roles.",
  READ_ONLY: "Read Only Role: Your account does not have any privileges associated with the Opsera platform and can only view some data.",
};

export const getAccessRolePermissionMessage = (accessRole) => {
  switch (accessRole?.Role) {
    case "administrator":
      return ACCESS_ROLE_PERMISSION_MESSAGES.ADMINISTRATOR;
    case "power_user":
      return ACCESS_ROLE_PERMISSION_MESSAGES.POWER_USER;
    case "user":
      return ACCESS_ROLE_PERMISSION_MESSAGES.USER;
    case "readonly":
      return ACCESS_ROLE_PERMISSION_MESSAGES.READ_ONLY;
    default:
      return "";
  }
};

export const getAccessRoleRequirementMessage = (requirement) => {
  switch (requirement) {
    case ROLE_LEVELS.OPSERA_ADMINISTRATORS:
      return "Only Opsera Administrators can access this screen.";
    case ROLE_LEVELS.ADMINISTRATORS:
      return "You must have a Site Administrator role to access this screen.";
    case ROLE_LEVELS.POWER_USERS:
      return "You must have a Power User role to access this screen.";
    case ROLE_LEVELS.POWER_USERS_AND_SASS:
      return "You must have a Power User role to access this screen.";
    case ROLE_LEVELS.USERS:
      return "Any level User can access this screen.";
    case ROLE_LEVELS.USERS_AND_SASS:
      return "Any level User can access this screen.";
    default:
      return "UNKNOWN ROLE REQUIREMENTS";
  }
};

export const getUserRoleLevel = (accessRoleData, objectRoles, dataObject) => {
  const roleLevel = calculateRoleLevel(accessRoleData, objectRoles, dataObject);
  const prefix = "Your access role for this page is: ";

  switch (roleLevel) {
    case SITE_ROLES.OPSERA_ADMINISTRATOR:
      return prefix + "Opsera Administrator";
    case SITE_ROLES.ADMINISTRATOR:
      return prefix + "Site Administrator";
    case SITE_ROLES.POWER_USER:
      return prefix + "Site Power User";
    case ACCESS_ROLES.ADMINISTRATOR:
      return prefix + "Administrator";
    case ACCESS_ROLES.OWNER:
      return prefix + "Owner";
    case ACCESS_ROLES.SECOPS:
      return prefix + "SecOps";
    case ACCESS_ROLES.MANAGER:
      return prefix + "Manager";
    case ACCESS_ROLES.USER:
      return prefix + "User";
    case ACCESS_ROLES.GUEST:
      return prefix + "Guest";
    case ACCESS_ROLES.READ_ONLY:
      return prefix + "Guest";
    case ACCESS_ROLES.UNAUTHORIZED:
      return "You are unauthorized to view this page.";
    case ACCESS_ROLES.NO_ACCESS_RULES:
      return "No Access Rules are currently applied.";
    default:
      return "UNKNOWN ROLE LEVEL";
  }
};

export const roleAllowed = (accessRoles, roleLevel) => {
  if (!Array.isArray(accessRoles) || accessRoles.length === 0) {
    return false;
  }

  return accessRoles.includes(roleLevel) || accessRoles.includes(ACCESS_ROLES.NO_ACCESS_RULES);
};

export const parseRoleDefinitionsIntoRbacTableRows =  (roleDefinitions) => {
  let accessRoleRows = [];

  if (roleDefinitions == null) {
    return [];
  }

  try {
    const roleDefinitionKeys = Object.keys(roleDefinitions);

    if (Array.isArray(roleDefinitionKeys) && roleDefinitionKeys.length > 0) {
      roleDefinitionKeys.forEach((roleDefinitionKey) => {
        const roleDefinition = roleDefinitions[roleDefinitionKey];
        const accessRoles = roleDefinition.allowedRoles;

        const tableRow = {
          id: roleDefinition.id,
          description: roleDefinition.description,
          administrator: roleAllowed(accessRoles, ACCESS_ROLES.ADMINISTRATOR),
          owner: roleAllowed(accessRoles, ACCESS_ROLES.OWNER),
          manager: roleAllowed(accessRoles, ACCESS_ROLES.MANAGER),
          user: roleAllowed(accessRoles, ACCESS_ROLES.USER),
          guest: roleAllowed(accessRoles, ACCESS_ROLES.GUEST),
          no_access_rules: roleAllowed(accessRoles, ACCESS_ROLES.NO_ACCESS_RULES),
        };

        accessRoleRows.push(tableRow);
      });
    }
  }
  catch (error) {
    console.error(`Could not parse Role Definitions: ${error}`);
  }

  return accessRoleRows;
};

export const parseRoleDefinitionsIntoSiteRoleTableRows =  (roleDefinitions) => {
  let accessRoleRows = [];

  if (roleDefinitions == null) {
    return [];
  }

  try {
    const roleDefinitionKeys = Object.keys(roleDefinitions);

    if (Array.isArray(roleDefinitionKeys) && roleDefinitionKeys.length > 0) {
      roleDefinitionKeys.forEach((roleDefinitionKey) => {
        const roleDefinition = roleDefinitions[roleDefinitionKey];
        const accessRoles = roleDefinition.allowedRoles;

        const tableRow = {
          id: roleDefinition.id,
          description: roleDefinition.description,
          administrator: roleAllowed(accessRoles, SITE_ROLES.ADMINISTRATOR),
          power_user: roleAllowed(accessRoles, SITE_ROLES.POWER_USER),
          user: roleAllowed(accessRoles, SITE_ROLES.USER),
          no_access_rules: roleAllowed(accessRoles, ACCESS_ROLES.NO_ACCESS_RULES),
        };

        accessRoleRows.push(tableRow);
      });
    }
  }
  catch (error) {
    console.error(`Could not parse Role Definitions: ${error}`);
  }

  return accessRoleRows;
};

export const getAllowedRoles = (actionName, roleDefinitions) => {
  const roleDefinition = roleDefinitions[actionName];
  return roleDefinition?.allowedRoles;
};

export const isAnLdapUser = (user, accessRole) => {
  return accessRole?.Type !== "sass-user" && user?.ldap?.domain != null;
};

/**
 * Handles all authorization of actions.  It factors in the overall user roles and the individual object
 * access roles. It will be customized based on roleDefinitions passed in.
 *
 * @param customerAccessRules
 * @param action
 * @param roleDefinitions
 * @param owner
 * @param objectRoles
 * @param allowAllIfNoRolesAssigned
 * @returns {boolean}
 *
 *
 */
export const isActionAllowed = (customerAccessRules, action, owner, objectRoles, roleDefinitions, allowAllIfNoRolesAssigned) => {
  if (customerAccessRules == null || roleDefinitions == null) {
    return false;
  }

  const allowedRoles = getAllowedRoles(action, roleDefinitions);

  if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    return false;
  }

  if (allowedRoles.includes(ACCESS_ROLES.NO_ACCESS_RULES)) {
    return true;
  }

  // TODO: These are the defaults for compatibility, but we should probably just use the defined Access Roles sent from Node:
  if (customerAccessRules?.OpseraAdministrator) {
    return true; //all actions are authorized to Opsera Administrator
  }

  if (customerAccessRules?.Administrator) {
    return true; //all actions are authorized to administrator
  }

  if (customerAccessRules?.SassPowerUser) {
    return true; //all  are authorized to Saas User
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return false; //all actions disabled for user?
  }

  if (owner && customerAccessRules?.UserId === owner) {
    return true; //owner can do all actions
  }

  // TODO: Should we remove this altogether and force role requirements?
  // if allowAllIfNoRolesAssigned is true and no objectRole data passed, then allow ALL actions
  if (allowAllIfNoRolesAssigned === true && (!Array.isArray(objectRoles) || objectRoles.length === 0)) {
    return true;
  }
  // END TODOs

  if (customerAccessRules?.OpseraAdministrator === true && allowedRoles.includes(SITE_ROLES.OPSERA_ADMINISTRATOR)) {
    return true;
  }

  if (customerAccessRules?.OrganizationOwner === true && allowedRoles.includes(ACCESS_ROLES.ORGANIZATION_OWNER)) {
    return true;
  }

  if (customerAccessRules?.OrganizationAccountOwner === true && allowedRoles.includes(ACCESS_ROLES.ORGANIZATION_ACCOUNT_OWNER)) {
    return true;
  }

  if (customerAccessRules?.Administrator === true && allowedRoles.includes(SITE_ROLES.ADMINISTRATOR)) {
    return true;
  }

  if (customerAccessRules?.SassPowerUser === true && allowedRoles.includes(SITE_ROLES.SAAS_USER)) {
    return true;
  }

  if (customerAccessRules?.PowerUser === true && allowedRoles.includes(SITE_ROLES.POWER_USER)) {
    return true;
  }

  if (process.env.REACT_APP_STACK === "free-trial" && allowedRoles.includes(SITE_ROLES.FREE_TRIAL_USER)) {
    return true;
  }

  if (owner && customerAccessRules?.UserId === owner && allowedRoles.includes(ACCESS_ROLES.OWNER)) {
    return true;
  }

  const userObjectRole = calculateUserObjectRole(customerAccessRules?.Email, customerAccessRules?.Groups, objectRoles);
  // TODO: By default Admins can do everything, if we want to stop allowing that, do it here:
  return userObjectRole === "administrator" || allowedRoles.includes(userObjectRole);
};

//compares the user email to the objectRoles data to see if the user has a specific role
// (either directly or through group membership)
export const calculateUserObjectRole = (userEmail, userGroups, objectRoles) => {
  if (!objectRoles || objectRoles.length === 0 || !userEmail) {
    return false;
  }

  //filter out only user records (groups null)
  const userRoles = objectRoles.filter(function(item) {
    if (!item.user || typeof item.user !== "string") {
      return false;
    }
    return item.user.toLowerCase() === userEmail.toLowerCase();
  });

  if (userRoles.length > 0) {
    return userRoles[0].role;
  }

  //filter out only user records (groups null)
  const groupRoles = objectRoles.filter(function(item) {
    return item.group;
  });

  let userGroupsRole = [];
  groupRoles.forEach(function(item) {
    if (userGroups && userGroups.includes(item.group)) {
      userGroupsRole.push(item.role);
    }
  });

  if (userGroupsRole.length === 1) {
    return userGroupsRole[0];
  }

  if (userGroupsRole.length >= 1) {
    if (userGroupsRole.includes("administrator")) {
      return "administrator";
    }
    if (userGroupsRole.includes("secops")) {
      return "secops";
    }
    if (userGroupsRole.includes("manager")) {
      return "manager";
    }
    if (userGroupsRole.includes("user")) {
      return "user";
    }
    return userGroupsRole[0];
  }

  return false;
};

export const calculateRoleLevel = (customerAccessRules, objectRoles, dataModel) => {
  const userEmail = customerAccessRules.Email;
  const userGroups = customerAccessRules.Groups;

  if (!userEmail) {
    return ACCESS_ROLES.UNAUTHORIZED;
  }

  if (!objectRoles || objectRoles.length === 0) {
    return ACCESS_ROLES.NO_ACCESS_RULES;
  }

  if (dataModel?.getData("owner") === customerAccessRules.UserId) {
    return ACCESS_ROLES.OWNER;
  }

  if (customerAccessRules.OpseraAdministrator) {
    return SITE_ROLES.OPSERA_ADMINISTRATOR;
  }

  if (customerAccessRules.Administrator) {
    return SITE_ROLES.ADMINISTRATOR;
  }

  if (customerAccessRules.SassPowerUser) {
    return SITE_ROLES.SAAS_USER;
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return SITE_ROLES.FREE_TRIAL_USER;
  }

  //filter out only user records (groups null)
  const userRoles = objectRoles.filter(function(item) {
    if (!item.user || typeof item.user !== "string") {
      return false;
    }
    return item.user.toLowerCase() === userEmail.toLowerCase();
  });

  if (userRoles.length > 0) {
    return userRoles[0].role;
  }

  //filter out only user records (groups null)
  const groupRoles = objectRoles.filter(function(item) {
    return item.group;
  });

  let userGroupsRole = [];
  groupRoles.forEach(function(item) {
    if (userGroups && userGroups.includes(item.group)) {
      userGroupsRole.push(item.role);
    }
  });

  if (userGroupsRole.length === 1) {
    return userGroupsRole[0];
  }

  if (userGroupsRole.length >= 1) {
    if (userGroupsRole.includes("administrator")) {
      return ACCESS_ROLES.ADMINISTRATOR;
    }
    if (userGroupsRole.includes("secops")) {
      return ACCESS_ROLES.SECOPS;
    }
    if (userGroupsRole.includes("manager")) {
      return ACCESS_ROLES.MANAGER;
    }
    if (userGroupsRole.includes("user")) {
      return ACCESS_ROLES.USER;
    }

    return userGroupsRole[0];
  }

  return ACCESS_ROLES.READ_ONLY;
};

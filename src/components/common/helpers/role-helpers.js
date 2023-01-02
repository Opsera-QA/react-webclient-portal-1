// TODO: This needs to be decommissioned and we need to use the library helpers so node and react will have the same source of truth.
//  Note to self-- make sure everything we need from here is ported to there.

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
  return accessRoleData?.PowerUser || accessRoleData?.Administrator || accessRoleData?.OpseraAdministrator || accessRoleData?.User || accessRoleData?.SecurityManager || accessRoleData?.Auditor;
};

export const isUserOrSassUser = (accessRoleData) => {
  return accessRoleData !== undefined;
};

export const ACCESS_ROLE_PERMISSION_MESSAGES = {
  ADMINISTRATOR: "Site Administrator User Role: Your account has full access to the Opsera platform and its settings.",
  POWER_USER: "Power User Role: Your account has elevated privileges to the Opsera platform.",
  USER: "Standard User Role: Your account has standard user access to the Opsera platform and inherits access based on individual item access roles.",
  SECURITY_MANAGER: "Security Manager User Role: Your account has read access to Tools, Tasks, and Pipelines in the Opsera platform and write access to security-owned items.",
  AUDITOR: "Auditor User Role: Your account has full read access to Tools, Tasks, and Pipelines im the Opsera platform.",
  GUEST: "Guest User Role: Your account does not have any privileges associated with the Opsera platform and can only view and edit some data.",
};

export const ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE = {
  ADMINISTRATOR: "Your account has full access to the Opsera platform and its settings.",
  POWER_USER: "Your account has elevated privileges to the Opsera platform.",
  USER: "Your account has standard user access to the Opsera platform and inherits access based on individual item access roles.",
  SECURITY_MANAGER: "Your account has full read access to the Opsera platform and write access to security-owned items.",
  AUDITOR: "Your account has full read access to the Opsera platform.",
  GUEST: "Your account does not have any privileges associated with the Opsera platform and can only view and edit some data.",
};

export const getAccessRolePermissionMessage = (accessRole) => {
  switch (accessRole?.Role) {
    case "administrator":
      return ACCESS_ROLE_PERMISSION_MESSAGES.ADMINISTRATOR;
    case "power_user":
      return ACCESS_ROLE_PERMISSION_MESSAGES.POWER_USER;
    case "user":
      return ACCESS_ROLE_PERMISSION_MESSAGES.USER;
    case "security_manager":
      return ACCESS_ROLE_PERMISSION_MESSAGES.SECURITY_MANAGER;
    case "auditor":
      return ACCESS_ROLE_PERMISSION_MESSAGES.AUDITOR;
    case "guest":
    default:
      return ACCESS_ROLE_PERMISSION_MESSAGES.GUEST;
  }
};

export const getAccessRolePermissionMessageWithoutRole = (accessRole) => {
  switch (accessRole?.Role) {
    case "administrator":
      return ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE.ADMINISTRATOR;
    case "power_user":
      return ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE.POWER_USER;
    case "user":
      return ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE.USER;
    case "security_manager":
      return ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE.SECURITY_MANAGER;
    case "auditor":
      return ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE.AUDITOR;
    case "guest":
    default:
      return ACCESS_ROLE_PERMISSION_MESSAGES_WITHOUT_ROLE.GUEST;
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

  if (roleDefinitions == null || typeof roleDefinitions !== "object") {
    return [];
  }

  try {
    const roleDefinitionKeys = Object.keys(roleDefinitions);

    if (Array.isArray(roleDefinitionKeys) && roleDefinitionKeys.length > 0) {
      roleDefinitionKeys.forEach((roleDefinitionKey) => {
        const roleDefinition = roleDefinitions[roleDefinitionKey];

        if (roleDefinition == null || roleDefinition?.hideRoleDefinition === true) {
          return;
        }

        const accessRoles = roleDefinition?.allowedRoles;
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

  if (roleDefinitions == null || typeof roleDefinitions !== "object") {
    return [];
  }

  try {
    const roleDefinitionKeys = Object.keys(roleDefinitions);

    if (Array.isArray(roleDefinitionKeys) && roleDefinitionKeys.length > 0) {
      roleDefinitionKeys.forEach((roleDefinitionKey) => {
        const roleDefinition = roleDefinitions[roleDefinitionKey];

        if (roleDefinition == null || roleDefinition?.hideRoleDefinition === true) {
          return;
        }

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

  return ACCESS_ROLES.GUEST;
};

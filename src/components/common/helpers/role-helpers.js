import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

export const ROLE_LEVELS = {
  OPSERA_ADMINISTRATORS: "OPSERA_ADMINISTRATORS",
  ADMINISTRATORS: "ADMINISTRATORS",
  ADMINISTRATORS_AND_SASS: "ADMINISTRATORS_AND_SASS",
  POWER_USERS: "POWER_USERS",
  POWER_USERS_AND_SASS: "POWER_USERS_AND_SASS",
  USERS: "USERS",
  USERS_AND_SASS: "USERS_AND_SASS"
};

export const ACCESS_ROLES = {
  ADMINISTRATOR: "administrator",
  OWNER: "owner",
  SECOPS: "secops",
  MANAGER: "manager",
  USER: "user",
  UNAUTHORIZED: "unauthorized",
  NO_ACCESS_RULES: "no_access_rules",
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

export const getAccessRolePermissionMessage = (accessRole) => {
  switch (accessRole?.Role) {
    case "administrator":
      return "Administrator User Role: Your account has full access to the Opsera platform and its settings.";
    case "power_user":
      return "Power User Role: Your account has elevated privileges to to the Opsera platform.";
    case "user":
      return "Standard User Role: Your account has standard user access to the Opsera platform and inherits access based on individual item access roles.";
    case "readonly":
      return "Read Only Role: Your account does not have any privileges associated with the Opsera platform and can only view some data.";
  }
};

export const getAccessRoleRequirementMessage = (requirement) => {
  switch (requirement) {
    case ROLE_LEVELS.OPSERA_ADMINISTRATORS:
      return "Only Opsera Administrators can access this.";
    case ROLE_LEVELS.ADMINISTRATORS:
      return "You must have a Site Administrator role to access this.";
    case ROLE_LEVELS.POWER_USERS:
      return "You must have a Power User role to access this.";
    case ROLE_LEVELS.POWER_USERS_AND_SASS:
      return "You must have a Power User role to access this.";
    case ROLE_LEVELS.USERS:
      return "Any level User can access this.";
    case ROLE_LEVELS.USERS_AND_SASS:
      return "Any level User can access this.";
    default:
      return "UNKNOWN ROLE REQUIREMENTS";
  }
};

export const getUserRoleLevel = (accessRoleData, objectRoles, dataObject) => {
  const roleLevel = workflowAuthorizedActions.calculateRoleLevel(accessRoleData, objectRoles, dataObject);
  const prefix = "Your access role for this page is: ";

  switch (roleLevel) {
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
    case ACCESS_ROLES.UNAUTHORIZED:
      return "You are unauthorized to view this page.";
    case ACCESS_ROLES.NO_ACCESS_RULES:
      return "No Access Rules are currently applied.";
    default:
      return "UNKNOWN ROLE LEVEL";
  }
};

export const isAnLdapUser = (user, accessRole) => {
  return accessRole?.Type !== "sass-user" && user?.ldap?.domain != null;
};
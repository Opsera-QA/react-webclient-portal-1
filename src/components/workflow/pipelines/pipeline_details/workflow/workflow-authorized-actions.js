const workflowAuthorizedActions = {};

/***
 * Example syntax to use in component:
 *
 * const authorizedAction = (action, owner) => {
 *   return WorkflowAuthorizedActions.workflowItems(customerAccessRules, action, owner);
 * };
 *
 * authorizedAction("edit_workflow_btn", pipeline.owner)
 *
 *
 * const roleTypes = [
 {text: "Administrator", value: "administrator"},
 {text: "Manager", value: "manager"},
 {text: "User", value: "user"},
 {text: "Guest", value: "guest"},
 {text: "SecOps", value: "secops"}
 ];
 */

/**
 * Handles all authorization of actions in the pipeline.  It factors in the overall user roles and the individual object (pipeline)
 * access roles.
 * @param customerAccessRules
 * @param action
 * @param owner
 * @param objectRoles
 * @returns {boolean}
 *
 *
 * Administrator & Owner Only Roles:
 * duplicate_pipeline_btn, delete_pipeline_btn,
 *
 */
workflowAuthorizedActions.workflowItems = (customerAccessRules, action, owner, objectRoles) => {
  if (customerAccessRules == null) {
    return false;
  }

  if (customerAccessRules.OpseraAdministrator) {
    return true; //all actions are authorized to Opsera Administrator
  }

  if (customerAccessRules.Administrator) {
    return true; //all actions are authorized to administrator
  }

  if (customerAccessRules.SassPowerUser) {
    return true; //all  are authorized to Saas User
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return false; //all actions disabled for user?
  }

  if (owner && customerAccessRules.UserId === owner) {
    return true; //owner can do all actions
  }

  const userObjectRole = calculateUserObjectRole(customerAccessRules.Email, customerAccessRules.Groups, objectRoles);
  //console.log("userObjectRole: ", userObjectRole);
  if (userObjectRole === "administrator") {
    return true; //all actions are authorized to administrator
  }

  if (userObjectRole === "secops") {
    switch (action) {
    case "view_step_configuration":
    case "view_pipeline_configuration":
    case "edit_step_details":
    case "duplicate_pipeline_btn":
    case "view_template_pipeline_btn":
    case "publish_pipeline_btn":
    case "stop_pipeline_btn":
    case "approve_step_btn":
    case "edit_access_roles":
    case "edit_tags":
    case "edit_workflow_structure":
    case "transfer_pipeline_btn":
    case "start_pipeline_btn":
    case "reset_pipeline_btn":
    case "edit_step_notification":
      return true;
    default:
      return false; //all other options are disabled
    }
  }

  if (customerAccessRules.PowerUser || userObjectRole === "manager") {
    switch (action) {
    case "view_step_configuration":
    case "edit_step_details":
    case "publish_pipeline_btn":
    case "duplicate_pipeline_btn":
    case "stop_pipeline_btn":
    case "edit_access_roles":
    case "approve_step_btn":
    case "start_pipeline_btn":
    case "reset_pipeline_btn":
    case "edit_step_notification":
      return true;
    default:
      return false; //all other options are disabled
    }
  }


  if (userObjectRole === "user") { //customerAccessRules.User no longer applies here
    switch (action) {
    case "stop_pipeline_btn":
    case "start_pipeline_btn":
    case "reset_pipeline_btn":
      return true;
    default:
      return false;
    }
  }

  //return for ReadOnly / Guest access
  return false;
};


/**
 * Handles all authorization of actions in tool registry.  It factors in the overall user roles and the individual object (pipeline)
 * access roles.
 * @param customerAccessRules
 * @param action
 * @param owner
 * @param objectRoles
 * @returns {boolean}
 *
 *
 * Administrator & Owner Only Roles:
 * duplicate_pipeline_btn, delete_pipeline_btn,
 *
 */
workflowAuthorizedActions.toolRegistryItems = (customerAccessRules, action, owner, objectRoles) => {
  if (customerAccessRules == null) {
    return false;
  }
  
  if (customerAccessRules.OpseraAdministrator) {
    return true; //all actions are authorized to Opsera Administrator
  }

  if (customerAccessRules.Administrator) {
    return true; //all actions are authorized to administrator
  }

  if (customerAccessRules.SassPowerUser) {
    return true; //all  are authorized to Saas User
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return false; //all actions disabled for user?
  }

  if (owner && customerAccessRules.UserId === owner) {
    return true; //owner can do all actions
  }

  //if no objectRole data passed, then allow actions
  if (objectRoles && objectRoles.length === 0) {
    return true;
  }

  const userObjectRole = calculateUserObjectRole(customerAccessRules.Email, customerAccessRules.Groups, objectRoles);
  //console.log("userObjectRole: ", objectRoles);
  if (userObjectRole === "administrator") {
    return true; //all actions are authorized to administrator
  }

  if (userObjectRole === "secops") {
    switch (action) {
    case "edit_tool_settings":
    case "use_tool_in_pipeline":
    case "edit_tool_connection":
    case "edit_tool_job_tabs":
    case "edit_tool_account_tabs":
    case "edit_tool_application_tabs":
    case "edit_tool_projects_tabs":
    case "edit_access_roles":
    case "create_tool":
      return true;
    default:
      return false; //all other options are disabled
    }
  }

  if (customerAccessRules.PowerUser || userObjectRole === "manager") {
    switch (action) {
    case "edit_tool_settings":
    case "use_tool_in_pipeline":
    case "edit_tool_connection":
    case "edit_tool_job_tabs":
    case "edit_tool_account_tabs":
    case "edit_tool_application_tabs":
    case "edit_tool_projects_tabs":
    case "edit_access_roles":
    case "create_tool":
      return true;
    default:
      return false; //all other options are disabled
    }
  }


  if (userObjectRole === "user") {
    switch (action) {
    case "use_tool_in_pipeline": //not implemented yet
    case "create_tool":
      return true;
    default:
      return false;
    }
  }

  //return for ReadOnly / Guest access which for now will allow tool creation
  switch (action) {
  case "create_tool":
    return true;
  default:
    return false;
  }
};

/**
 * Handles all authorization of actions in tool registry.  It factors in the overall user roles and the individual object (pipeline)
 * access roles.
 * @param customerAccessRules
 * @param action
 * @param owner
 * @param objectRoles
 * @returns {boolean}
 *
 *
 * Administrator & Owner Only Roles:
 * duplicate_pipeline_btn, delete_pipeline_btn,
 *
 */
workflowAuthorizedActions.gitItems = (customerAccessRules, action, owner, objectRoles) => {
  if (customerAccessRules == null) {
    return false;
  }

  if (customerAccessRules.OpseraAdministrator) {
    return true; //all actions are authorized to Opsera Administrator
  }

  if (customerAccessRules.Administrator) {
    return true; //all actions are authorized to administrator
  }

  if (customerAccessRules.SassPowerUser) {
    return true; //all  are authorized to Saas User
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return false; //all actions disabled for user?
  }

  if (owner && customerAccessRules.UserId === owner) {
    return true; //owner can do all actions
  }

  //if no objectRole data passed, then allow actions
  if (objectRoles && objectRoles.length === 0) {
    return true;
  }

  const userObjectRole = calculateUserObjectRole(customerAccessRules.Email, customerAccessRules.Groups, objectRoles);
  //console.log("userObjectRole: ", objectRoles);
  if (userObjectRole === "administrator") {
    return true; //all actions are authorized to administrator
  }

  if (userObjectRole === "secops") {
    switch (action) {
      case "edit_settings":
      case "edit_access_roles":
      case "create_task":
      case "run_task":
      case "delete_task":
        return true;
      default:
        return false; //all other options are disabled
    }
  }

  if (customerAccessRules.PowerUser || userObjectRole === "manager") {
    switch (action) {
      case "edit_settings":
      case "edit_access_roles":
      case "create_task":
      case "run_task":
        return true;
      default:
        return false; //all other options are disabled
    }
  }


  if (userObjectRole === "user") {
    switch (action) {
      case "create_task":
      case "run_task":
        return true;
      default:
        return false;
    }
  }

  //return for ReadOnly / Guest access which for now will allow task creation
  switch (action) {
    case "create_task":
      return true;
    default:
      return false;
  }
};



//compares the user email to the objectRoles data to see if the user has a specific role
// (either directly or through group membership)
const calculateUserObjectRole = (userEmail, userGroups, objectRoles) => {
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

export default workflowAuthorizedActions;
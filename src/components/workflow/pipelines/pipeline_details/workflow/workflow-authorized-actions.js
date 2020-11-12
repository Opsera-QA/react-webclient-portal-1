const workflowAuthorizedActions = {};

/***
 * Example syntax to use in component:
 *
 * const authorizedAction = (action, owner) => {
 *   return WorkflowAuthorizedActions.workflowItems(customerAccessRules, action, owner);
 * };
 *
 * authorizedAction("edit_workflow_btn", pipeline.owner)
 */

workflowAuthorizedActions.workflowItems = (customerAccessRules, action, owner) => {
  if (customerAccessRules.Administrator) {
    return true; //all actions are authorized to administrrator
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return false; //all actions disabled for user?
  }

  if (owner && customerAccessRules.UserId === owner) {
    return true; //owner can do all actions
  }

  if (customerAccessRules.PowerUser) {
    switch (action) {
    case "view_step_configuration":
    case "view_pipeline_configuration":
    case "edit_step_details":
    case "edit_workflow_structure":
      return true;
    default:
      return false; //all other options are disabled
    }
  }

  if (customerAccessRules.User) {
    return false;
  }

  return false;
};

workflowAuthorizedActions.pipelineSummaryPanel = (customerAccessRules, action, owner) => {
  if (customerAccessRules.Administrator) {
    return true; //all actions are authorized to administrator
  }

  if (process.env.REACT_APP_STACK === "free-trial") {
    return false; //all actions disabled for user?
  }

  if (owner && customerAccessRules.UserId === owner) {
    return true; //owner can do all actions
  }

  if (customerAccessRules.PowerUser) {
    switch (action) {
    case "edit_pipeline_attribute":
    case "duplicate_pipeline_btn":
    case "view_template_pipeline_btn":
      return true;
    default:
      return false; //all other options are disabled
    }
  }

  if (customerAccessRules.User) {
    return false; //all other options are disabled
  }
  return false;
};

export default workflowAuthorizedActions;
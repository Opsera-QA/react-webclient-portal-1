import { constantsHelper } from "temp-library-components/helpers/constants.helper";

export const workspaceConstants = {};

workspaceConstants.WORKSPACE_ITEM_TYPES = {
  ALL: "all",
  PIPELINE: "pipeline",
  TASK: "task",
  TOOL: "tool",
};

workspaceConstants.isWorkspaceTypeValid = (potentialValue) => {
  return constantsHelper.isValueValid(workspaceConstants.WORKSPACE_ITEM_TYPES, potentialValue);
};
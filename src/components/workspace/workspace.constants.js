import { constantsHelper } from "temp-library-components/helpers/constants.helper";

export const workspaceConstants = {};

workspaceConstants.WORKSPACE_ITEM_TYPES = {
  ALL: "all",
  PIPELINE: "pipeline",
  TASK: "task",
  TOOL: "tool",
};

workspaceConstants.WORKSPACE_ITEM_TYPE_LABELS = {
  ALL: "All",
  PIPELINE: "Pipeline",
  TASK: "Tasks",
  TOOL: "Tools",
};

workspaceConstants.isWorkspaceTypeValid = (potentialValue) => {
  return constantsHelper.isValueValid(workspaceConstants.WORKSPACE_ITEM_TYPES, potentialValue);
};

workspaceConstants.getLabelForWorkspaceType = (workspaceType) => {
  return constantsHelper.getLabelForValue(
    workspaceConstants.WORKSPACE_ITEM_TYPES,
    workspaceConstants.WORKSPACE_ITEM_TYPE_LABELS,
    workspaceType,
  );
};

workspaceConstants.getSelectOptionForWorkspaceType = (type) => {
  if (workspaceConstants.isWorkspaceTypeValid(type) !== true) {
    return null;
  }

  return ({
    text: workspaceConstants.getLabelForWorkspaceType(type),
    value: type,
  });
};

workspaceConstants.WORKSPACE_TYPE_SELECT_OPTIONS = [
  workspaceConstants.getSelectOptionForWorkspaceType(workspaceConstants.WORKSPACE_ITEM_TYPES.ALL),
  workspaceConstants.getSelectOptionForWorkspaceType(workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE),
  workspaceConstants.getSelectOptionForWorkspaceType(workspaceConstants.WORKSPACE_ITEM_TYPES.TASK),
  workspaceConstants.getSelectOptionForWorkspaceType(workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL),
];
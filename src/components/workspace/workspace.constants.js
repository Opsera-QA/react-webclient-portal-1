import { constantsHelper } from "@opsera/definitions/constants/constants.helper";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";

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

workspaceConstants.getIdentifierLabelForWorkspaceItem = (workspaceItem) => {
  return workspaceConstants.getIdentifierLabelForWorkspaceType(workspaceItem?.workspaceType, workspaceItem?.templateIdentifier);
};


workspaceConstants.getIdentifierLabelForWorkspaceType = (type, workspaceIdentifier) => {
  if (workspaceConstants.isWorkspaceTypeValid(type) !== true) {
    return "";
  }

  switch (type) {
    case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
      return taskTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier(workspaceIdentifier);
    case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
      return pipelineTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier(workspaceIdentifier);
    default:
      return "";
  }
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
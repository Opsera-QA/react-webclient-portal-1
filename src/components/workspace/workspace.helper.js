import { hasStringValue } from "components/common/helpers/string-helpers";
import { workspaceConstants } from "components/workspace/workspace.constants";

export const workspaceHelper = {};

workspaceHelper.getWorkspaceItemDetailLink = (workspaceItem) => {
  return workspaceHelper.getWorkspaceItemDetailLink(workspaceItem?.type, workspaceItem?._id);
};

workspaceHelper.getWorkspaceItemDetailLink = (type, mongoId) => {
  if (hasStringValue(type) !== true || hasStringValue(mongoId) !== true) {
    return null;
  }

  switch (type) {
    case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
    case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
    case workspaceConstants.WORKSPACE_ITEM_TYPES.REGISTRY:
  }
};
import { hasStringValue } from "components/common/helpers/string-helpers";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { getDaysUntilDate } from "components/common/helpers/date/date.helpers";

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

workspaceHelper.getExpirationRowStyling = (row) => {
  const daysUntilDate = getDaysUntilDate(new Date(row?.original?.expiration));

  if (daysUntilDate == null || daysUntilDate >= 7) {
    return "";
  }

  if (daysUntilDate <= -1 || daysUntilDate === 0) {
    return " expiring-within-a-day";
  }

  if (daysUntilDate <= 6) {
    return " expiring-within-a-week";
  }

  return "";
};

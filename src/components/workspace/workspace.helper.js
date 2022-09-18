import { hasStringValue } from "components/common/helpers/string-helpers";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { getDaysUntilDate } from "components/common/helpers/date/date.helpers";
import { pipelineHelper } from "components/workflow/pipeline.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { taskHelper } from "components/tasks/task.helper";
import { toolHelper } from "components/inventory/tools/tool.helper";

export const workspaceHelper = {};

workspaceHelper.getWorkspaceItemDetailLink = (workspaceItem) => {
  return workspaceHelper.getWorkspaceItemDetailLinkBase(workspaceItem?.workspaceType, workspaceItem?._id);
};

workspaceHelper.getWorkspaceItemDetailLinkBase = (type, mongoId) => {
  if (hasStringValue(type) !== true || isMongoDbId(mongoId) !== true) {
    return null;
  }

  switch (type) {
    case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
      return pipelineHelper.getDetailViewLink(mongoId);
    case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
      return taskHelper.getDetailViewLink(mongoId);
    case workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL:
      return toolHelper.getDetailViewLink(mongoId);
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

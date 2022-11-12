import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspacePipelineCard from "components/workspace/cards/WorkspacePipelineCard";
import WorkspaceTaskCard from "components/workspace/cards/WorkspaceTaskCard";
import WorkspaceToolCard from "components/workspace/cards/WorkspaceToolCard";

export default function FreeTrialWorkspaceItemCardView(
  {
    workspaceItems,
    workspaceFilterModel,
    loadData,
    isLoading,
    toolMetadata,
    taskMetadata,
  }) {
  const getWorkspaceItemCard = (workspaceItem) => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <WorkspacePipelineCard
            pipeline={workspaceItem}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return (
          <WorkspaceTaskCard
            task={workspaceItem}
            taskMetadata={taskMetadata}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL:
        return (
          <WorkspaceToolCard
            tool={workspaceItem}
            toolMetadata={toolMetadata}
          />
        );
    }
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={workspaceFilterModel}
      cards={
        <VerticalCardViewBase
          getCardFunction={getWorkspaceItemCard}
          data={workspaceItems}
        />
      }
    />
  );
}

FreeTrialWorkspaceItemCardView.propTypes = {
  workspaceItems: PropTypes.array,
  workspaceFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskMetadata: PropTypes.object,
  toolMetadata: PropTypes.object,
};
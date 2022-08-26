import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import FreeTrialWorkspacePipelineCardView from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelineCardView";
import FreeTrialWorkspaceRegistryCardView from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryCardView";
import FreeTrialWorkspaceTaskCardView from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskCardView";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkspacePipelineCard from "components/workspace/cards/WorkspacePipelineCard";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { useHistory } from "react-router-dom";
import TaskCardBase from "temp-library-components/cards/TaskCardBase";
import ToolModel from "components/inventory/tools/tool.model";
import RegistryToolCard from "components/common/fields/inventory/RegistryToolCard";
import WorkspaceTaskCard from "components/workspace/cards/WorkspaceTaskCard";
import WorkspaceToolCard from "components/workspace/cards/WorkspaceToolCard";

export default function FreeTrialWorkspaceItemCardView(
  {
    workspaceItems,
    pipelineFilterModel,
    loadData,
    isLoading,
    toolMetadata,
    taskMetadata,
  }) {
  const history = useHistory();

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
      paginationModel={pipelineFilterModel}
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
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskMetadata: PropTypes.object,
  toolMetadata: PropTypes.object,
};
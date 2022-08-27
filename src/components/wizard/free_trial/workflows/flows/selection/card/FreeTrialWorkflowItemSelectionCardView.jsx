import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkflowPipelineCard from "components/wizard/free_trial/workflows/flows/selection/card/WorkflowPipelineCard";
import WorkflowTaskCard from "components/wizard/free_trial/workflows/flows/selection/card/WorkflowTaskCard";

export default function FreeTrialWorkflowItemSelectionCardView(
  {
    workflowFilterModel,
    workspaceItems,
    loadData,
    isLoading,
    taskMetadata,
    selectedWorkflowItem,
    setSelectedWorkflowItem,
  }) {
  const getWorkspaceItemCard = (workspaceItem) => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <WorkflowPipelineCard
            pipeline={workspaceItem}
            selectedFlow={selectedWorkflowItem}
            setSelectedFlow={setSelectedWorkflowItem}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return (
          <WorkflowTaskCard
            selectedFlow={selectedWorkflowItem}
            setSelectedFlow={setSelectedWorkflowItem}
            task={workspaceItem}
            taskMetadata={taskMetadata}
          />
        );
    }
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={workflowFilterModel}
      cards={
        <VerticalCardViewBase
          getCardFunction={getWorkspaceItemCard}
          data={workspaceItems}
        />
      }
    />
  );
}

FreeTrialWorkflowItemSelectionCardView.propTypes = {
  workspaceItems: PropTypes.array,
  workflowFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskMetadata: PropTypes.object,
  selectedWorkflowItem: PropTypes.string,
  setSelectedWorkflowItem: PropTypes.func,
};
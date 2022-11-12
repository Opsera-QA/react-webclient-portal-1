import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkflowPipelineCard from "components/wizard/free_trial/workflows/flows/selection/card/WorkflowPipelineCard";
import WorkflowTaskCard from "components/wizard/free_trial/workflows/flows/selection/card/WorkflowTaskCard";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { widgetHelper } from "temp-library-components/helpers/widgets/widget.helper";
import { heightHelper } from "temp-library-components/helpers/height/height.helper";

export default function FreeTrialWorkflowItemSelectionCardView(
  {
    workflowFilterModel,
    workspaceItems,
    loadData,
    isLoading,
    taskMetadata,
    selectedWorkflowItem,
    setSelectedWorkflowItem,
    heightSize,
    hasTitleBar,
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

  const getMinimumHeight = () => {
    if (numberHelpers.isNumberGreaterThan(0, heightSize)) {
      const widgetPixelSize = widgetHelper.getWidgetPixelSize(heightSize);

      if (hasTitleBar !== false) {
        return heightHelper.subtractTitleBarHeightForCssHeight(widgetPixelSize);
      }

      return widgetPixelSize;
    }
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={workflowFilterModel}
      minHeight={getMinimumHeight()}
      cards={
        <VerticalCardViewBase
          getCardFunction={getWorkspaceItemCard}
          data={workspaceItems}
          isLoading={isLoading}
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
  selectedWorkflowItem: PropTypes.object,
  setSelectedWorkflowItem: PropTypes.func,
  heightSize: PropTypes.number,
  hasTitleBar: PropTypes.bool,
};
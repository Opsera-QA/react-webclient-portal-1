import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkflowPipelineCard from "components/landing/v2/widgets/workspace/card/WorkflowPipelineCard";
import WorkflowTaskCard from "components/landing/v2/widgets/workspace/card/WorkflowTaskCard";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { widgetHelper } from "temp-library-components/helpers/widgets/widget.helper";
import { heightHelper } from "temp-library-components/helpers/height/height.helper";
import NoRegisteredWorkflowsCard from "components/wizard/free_trial/workflows/NoRegisteredWorkflowsCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {WORKFLOW_WIDGET_VIEWS} from "components/landing/v2/widgets/workspace/WorkflowWidgetNavigationBar";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";
import modelHelpers from "components/common/model/modelHelpers";
import pipelineMetadata from "@opsera/definitions/constants/pipelines/pipeline.metadata";
import TaskModel from "components/tasks/task.model";

export default function WorkspaceWorkflowSelectionCardView(
  {
    workflowFilterModel,
    workspaceItems,
    loadData,
    isLoading,
    selectedWorkflowItem,
    setSelectedWorkflowItem,
    heightSize,
    hasTitleBar,
    hasMoreItems,
    loadMoreWorkflows,
    currentView,
  }) {
  const onPipelineSelectFunction = (workspaceItem) => {
    setSelectedWorkflowItem(modelHelpers.parseObjectIntoModel(workspaceItem, pipelineMetadata));
  };

  const onTaskSelectFunction = (workspaceItem) => {
    setSelectedWorkflowItem(new TaskModel(workspaceItem, false));
  };
  const getWorkspaceItemCard = (workspaceItem) => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <WorkflowPipelineCard
            pipeline={workspaceItem}
            selectedFlow={selectedWorkflowItem}
            setSelectedFlow={onPipelineSelectFunction}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return (
          <WorkflowTaskCard
            selectedFlow={selectedWorkflowItem}
            setSelectedFlow={onTaskSelectFunction}
            task={workspaceItem}
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

  const getBody = () => {
    const searchKeyword = DataParsingHelper.parseString(workflowFilterModel?.getData('search'));

    if (
      isLoading !== true
      && (!Array.isArray(workspaceItems) || workspaceItems.length === 0)
    ) {
      if (searchKeyword) {
        return (
          <CenteredContentWrapper minHeight={"250px"}>
            <InfoMessageFieldBase
              message={"No results found for the given search keyword"}
              showInformationLabel={false}
            />
          </CenteredContentWrapper>
        );
      }

      switch (currentView){
        case WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS:
          return (
            <NoRegisteredWorkflowsCard
              loadDataFunction={loadData}
              className={"m-3"}
            />
          );
        case WORKFLOW_WIDGET_VIEWS.FOLLOWING:
          return (
            <CenteredContentWrapper minHeight={"250px"}>
              <InfoMessageFieldBase
                message={"You have not subscribed to any Workflows"}
                showInformationLabel={false}
              />
            </CenteredContentWrapper>
          );
        case WORKFLOW_WIDGET_VIEWS.RECENT_ACTIVITY:
          return (
            <CenteredContentWrapper minHeight={"250px"}>
              <InfoMessageFieldBase
                message={"There are no recent Workflow runs"}
                showInformationLabel={false}
              />
            </CenteredContentWrapper>
          );
      }
    }

    return (
      <VerticalCardViewBase
        getCardFunction={getWorkspaceItemCard}
        data={workspaceItems}
        isLoading={isLoading}
        hasMoreItems={hasMoreItems}
        loadMoreItems={loadMoreWorkflows}
        minHeight={"250px"}
      />
    );
  };


  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={workflowFilterModel}
      minHeight={getMinimumHeight()}
      cards={getBody()}
    />
  );
}

WorkspaceWorkflowSelectionCardView.propTypes = {
  workspaceItems: PropTypes.array,
  workflowFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedWorkflowItem: PropTypes.object,
  setSelectedWorkflowItem: PropTypes.func,
  heightSize: PropTypes.number,
  hasTitleBar: PropTypes.bool,
  hasMoreItems: PropTypes.bool,
  loadMoreWorkflows: PropTypes.func,
  currentView: PropTypes.string,
};
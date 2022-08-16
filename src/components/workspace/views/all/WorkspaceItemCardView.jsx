import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import WorkspacePipelineCardView from "components/workspace/views/pipeline/WorkspacePipelineCardView";
import WorkspaceRegistryCardView from "components/workspace/views/tool/WorkspaceRegistryCardView";
import WorkspaceTaskCardView from "components/workspace/views/task/WorkspaceTaskCardView";

export default function WorkspaceItemCardView(
  {
    workspaceItems,
    pipelineFilterModel,
    loadData,
    isLoading,
    toolMetadata,
    taskMetadata,
  }) {
  const getCards = () => {
    if (!Array.isArray(workspaceItems) || workspaceItems.length === 0) {
      return null;
    }

    const pipelines = workspaceItems.filter((item) => item.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE);
    const tools = workspaceItems.filter((item) => item.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL);
    const tasks = workspaceItems.filter((item) => item.workspaceType === workspaceConstants.WORKSPACE_ITEM_TYPES.TASK);

    return (
     <>
       <WorkspacePipelineCardView
         loadData={loadData}
         pipelineFilterModel={pipelineFilterModel}
         pipelines={pipelines}
         isLoading={isLoading}
       />
       <WorkspaceRegistryCardView
         loadData={loadData}
         pipelineFilterModel={pipelineFilterModel}
         tools={tools}
         isLoading={isLoading}
         toolMetadata={toolMetadata}
       />
       <WorkspaceTaskCardView
         loadData={loadData}
         taskFilterModel={pipelineFilterModel}
         tasks={tasks}
         isLoading={isLoading}
         taskMetadata={taskMetadata}
       />
     </>
    );
  };

  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={pipelineFilterModel}
      cards={getCards()}
    />
  );
}

WorkspaceItemCardView.propTypes = {
  workspaceItems: PropTypes.array,
  pipelineFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  taskMetadata: PropTypes.object,
  toolMetadata: PropTypes.object,
};
import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import WorkspacePipelineCardView from "components/workspace/views/pipeline/WorkspacePipelineCardView";
import WorkspacePipelinesTable from "components/workspace/views/pipeline/WorkspacePipelinesTable";

export default function WorkspacePipelineViews(
  {
    pipelines,
    isLoading,
    workspaceFilterModel,
    loadData,
  }) {
  const getCardView = () => {
    return (
      <WorkspacePipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelines={pipelines}
        pipelineFilterModel={workspaceFilterModel}
      />
    );
  };

  const getTableView = () => {
    return (
      <WorkspacePipelinesTable
        isLoading={isLoading}
        pipelines={pipelines}
        loadData={loadData}
      />
    );
  };

  return (
    <TableCardView
      data={pipelines}
      isLoading={isLoading}
      cardView={getCardView()}
      tableView={getTableView()}
      filterModel={workspaceFilterModel}
      tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
    />
  );
}

WorkspacePipelineViews.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};

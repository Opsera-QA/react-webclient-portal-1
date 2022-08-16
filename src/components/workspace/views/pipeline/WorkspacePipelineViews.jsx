import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import WorkspacePipelinesTable from "components/workspace/views/pipeline/WorkspacePipelinesTable";
import WorkspacePipelineCardView from "components/workspace/views/pipeline/WorkspacePipelineCardView";

export default function WorkspacePipelineViews(
  {
    pipelines,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
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
        paginationModel={workspaceFilterModel}
        setPaginationModel={setWorkspaceFilterModel}
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

import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import WorkspacePipelinesTableBase from "components/workspace/views/pipeline/WorkspacePipelinesTableBase";
import WorkspacePipelineCardView from "components/workspace/views/pipeline/WorkspacePipelineCardView";

export default function WorkspacePipelineViews(
  {
    pipelines,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    loadData,
    subscribedPipelineIds,
  }) {
  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const getCardView = () => {
    return (
      <WorkspacePipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelines={pipelines}
        pipelineFilterModel={workspaceFilterModel}
        subscribedPipelineIds={subscribedPipelineIds}
      />
    );
  };

  const getTableView = () => {
    return (
      <WorkspacePipelinesTableBase
        isLoading={isLoading}
        paginationModel={workspaceFilterModel}
        setPaginationModel={setWorkspaceFilterModel}
        pipelines={pipelines}
        loadData={loadData}
        onRowClickFunction={onRowSelect}
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
  subscribedPipelineIds: PropTypes.array,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};

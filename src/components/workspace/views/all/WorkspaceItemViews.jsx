import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import WorkspaceItemTable from "components/workspace/views/all/WorkspaceItemTable";
import WorkspaceItemCardView from "components/workspace/views/all/WorkspaceItemCardView";

export default function WorkspaceItemViews(
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
      <WorkspaceItemCardView
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
      <WorkspaceItemTable
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

WorkspaceItemViews.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  subscribedPipelineIds: PropTypes.array,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};

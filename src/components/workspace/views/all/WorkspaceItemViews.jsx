import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import WorkspaceItemTable from "components/workspace/views/all/WorkspaceItemTable";
import WorkspaceItemCardView from "components/workspace/views/all/WorkspaceItemCardView";

export default function WorkspaceItemViews(
  {
    workspaceItems,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    loadData,
    taskMetadata,
    toolMetadata,
  }) {
  const getCardView = () => {
    return (
      <WorkspaceItemCardView
        isLoading={isLoading}
        loadData={loadData}
        workspaceItems={workspaceItems}
        workspaceFilterModel={workspaceFilterModel}
        taskMetadata={taskMetadata}
        toolMetadata={toolMetadata}
      />
    );
  };

  const getTableView = () => {
    return (
      <WorkspaceItemTable
        isLoading={isLoading}
        paginationModel={workspaceFilterModel}
        setPaginationModel={setWorkspaceFilterModel}
        workspaceItems={workspaceItems}
        loadData={loadData}
      />
    );
  };

  return (
    <TableCardView
      data={workspaceItems}
      isLoading={isLoading}
      cardView={getCardView()}
      tableView={getTableView()}
      filterModel={workspaceFilterModel}
    />
  );
}

WorkspaceItemViews.propTypes = {
  workspaceItems: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
  taskMetadata: PropTypes.object,
  toolMetadata: PropTypes.object,
};

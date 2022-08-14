import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import WorkspaceTaskCardView from "components/workspace/views/task/WorkspaceTaskCardView";
import WorkspaceTaskTable from "components/workspace/views/task/WorkspaceTaskTable";

export default function WorkspaceTaskViews(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
    isLoading,
    loadData,
    tasks,
    taskMetadata,
  }) {
  const getCardView = () => {
    return (
      <WorkspaceTaskCardView
        taskMetadata={taskMetadata}
        isLoading={isLoading}
        loadData={loadData}
        tasks={tasks}
      />
    );
  };

  const getTableView = () => {
    return (
      <WorkspaceTaskTable
        isLoading={isLoading}
        loadData={loadData}
        tasks={tasks}
        taskMetadata={taskMetadata}
      />
    );
  };

  return (
    <TableCardView
      data={tasks}
      isLoading={isLoading}
      cardView={getCardView()}
      tableView={getTableView()}
      filterModel={workspaceFilterModel}
    />
  );
}

WorkspaceTaskViews.propTypes = {
  tasks: PropTypes.array,
  isLoading: PropTypes.bool,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  taskMetadata: PropTypes.object,
};
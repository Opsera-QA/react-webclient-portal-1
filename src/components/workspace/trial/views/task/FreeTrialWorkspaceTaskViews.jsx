import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FreeTrialWorkspaceTaskCardView from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskCardView";
import FreeTrialWorkspaceTaskTable from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskTable";

export default function FreeTrialWorkspaceTaskViews(
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
      <FreeTrialWorkspaceTaskCardView
        taskMetadata={taskMetadata}
        isLoading={isLoading}
        loadData={loadData}
        tasks={tasks}
      />
    );
  };

  const getTableView = () => {
    return (
      <FreeTrialWorkspaceTaskTable
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

FreeTrialWorkspaceTaskViews.propTypes = {
  tasks: PropTypes.array,
  isLoading: PropTypes.bool,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  taskMetadata: PropTypes.object,
};
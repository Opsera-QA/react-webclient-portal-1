import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FreeTrialWorkspaceTaskCardView from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskCardView";
import FreeTrialWorkspaceTaskTable from "components/workspace/trial/views/task/FreeTrialWorkspaceTaskTable";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";

export default function WorkspaceTaskViews(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
    isLoading,
    loadData,
    tasks,
  }) {
  const getCardView = () => {
    return (
      <FreeTrialWorkspaceTaskCardView
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
      tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
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
import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import FreeTrialWorkspaceItemTable from "components/workspace/trial/views/all/FreeTrialWorkspaceItemTable";
import FreeTrialWorkspaceItemCardView from "components/workspace/trial/views/all/FreeTrialWorkspaceItemCardView";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";

export default function FreeTrialWorkspaceItemViews(
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
      <FreeTrialWorkspaceItemCardView
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
      <FreeTrialWorkspaceItemTable
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
      tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      filterModel={workspaceFilterModel}
    />
  );
}

FreeTrialWorkspaceItemViews.propTypes = {
  workspaceItems: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
  taskMetadata: PropTypes.object,
  toolMetadata: PropTypes.object,
};

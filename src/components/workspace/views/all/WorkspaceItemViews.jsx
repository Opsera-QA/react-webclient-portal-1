import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import WorkspaceItemCardView from "components/workspace/views/all/WorkspaceItemCardView";
import WorkspaceItemTable from "components/workspace/views/all/WorkspaceItemTable";

export default function WorkspaceItemViews(
  {
    workspaceItems,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    loadData,
  }) {
  const getCardView = () => {
    return (
      <WorkspaceItemCardView
        isLoading={isLoading}
        loadData={loadData}
        workspaceItems={workspaceItems}
        workspaceFilterModel={workspaceFilterModel}
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
      tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
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
};

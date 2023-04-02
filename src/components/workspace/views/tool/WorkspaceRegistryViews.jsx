import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import WorkspaceRegistryCardView from "components/workspace/views/tool/WorkspaceRegistryCardView";
import WorkspaceRegistryTable from "components/workspace/views/tool/WorkspaceRegistryTable";

export default function WorkspaceRegistryViews(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
    isLoading,
    loadData,
    tools,
  }) {
  const getCardView = () => {
    return (
      <WorkspaceRegistryCardView
        isLoading={isLoading}
        loadData={loadData}
        tools={tools}
      />
    );
  };

  const getTableView = () => {
    return (
      <WorkspaceRegistryTable
        isLoading={isLoading}
        loadData={loadData}
        tools={tools}
      />
    );
  };

  return (
    <TableCardView
      data={tools}
      isLoading={isLoading}
      cardView={getCardView()}
      tableView={getTableView()}
      filterModel={workspaceFilterModel}
      tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
    />
  );
}

WorkspaceRegistryViews.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};
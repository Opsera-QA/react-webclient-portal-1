import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import WorkspaceRegistryTable from "components/workspace/views/tool/WorkspaceRegistryTable";
import WorkspaceRegistryCardView from "components/workspace/views/tool/WorkspaceRegistryCardView";

export default function WorkspaceRegistryViews(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
    toolMetadata,
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
        toolMetadata={toolMetadata}
      />
    );
  };

  const getTableView = () => {
    return (
      <WorkspaceRegistryTable
        isLoading={isLoading}
        loadData={loadData}
        tools={tools}
        toolMetadata={toolMetadata}
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
    />
  );
}

WorkspaceRegistryViews.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  toolMetadata: PropTypes.object,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};
import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FreeTrialWorkspaceRegistryTable from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryTable";
import FreeTrialWorkspaceRegistryCardView from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryCardView";

export default function FreeTrialWorkspaceRegistryViews(
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
      <FreeTrialWorkspaceRegistryCardView
        isLoading={isLoading}
        loadData={loadData}
        tools={tools}
        toolMetadata={toolMetadata}
      />
    );
  };

  const getTableView = () => {
    return (
      <FreeTrialWorkspaceRegistryTable
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

FreeTrialWorkspaceRegistryViews.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  toolMetadata: PropTypes.object,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};
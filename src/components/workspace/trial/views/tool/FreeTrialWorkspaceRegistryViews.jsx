import React from "react";
import TableCardView from "components/common/table/TableCardView";
import PropTypes from "prop-types";
import FreeTrialWorkspaceRegistryTable from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryTable";
import FreeTrialWorkspaceRegistryCardView from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryCardView";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";

export default function FreeTrialWorkspaceRegistryViews(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
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
      />
    );
  };

  const getTableView = () => {
    return (
      <FreeTrialWorkspaceRegistryTable
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

FreeTrialWorkspaceRegistryViews.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};
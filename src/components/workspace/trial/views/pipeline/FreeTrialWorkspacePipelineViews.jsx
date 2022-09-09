import React from "react";
import PropTypes from "prop-types";
import TableCardView from "components/common/table/TableCardView";
import FreeTrialWorkspacePipelinesTable from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelinesTable";
import FreeTrialWorkspacePipelineCardView from "components/workspace/trial/views/pipeline/FreeTrialWorkspacePipelineCardView";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";

export default function FreeTrialWorkspacePipelineViews(
  {
    pipelines,
    isLoading,
    workspaceFilterModel,
    setWorkspaceFilterModel,
    loadData,
  }) {
  const getCardView = () => {
    return (
      <FreeTrialWorkspacePipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        pipelines={pipelines}
        pipelineFilterModel={workspaceFilterModel}
      />
    );
  };

  const getTableView = () => {
    return (
      <FreeTrialWorkspacePipelinesTable
        isLoading={isLoading}
        paginationModel={workspaceFilterModel}
        setPaginationModel={setWorkspaceFilterModel}
        pipelines={pipelines}
        loadData={loadData}
      />
    );
  };

  return (
    <TableCardView
      data={pipelines}
      isLoading={isLoading}
      cardView={getCardView()}
      tableView={getTableView()}
      filterModel={workspaceFilterModel}
      tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
    />
  );
}

FreeTrialWorkspacePipelineViews.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};

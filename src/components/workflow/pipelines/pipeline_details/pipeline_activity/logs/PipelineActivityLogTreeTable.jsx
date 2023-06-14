import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PipelineActivityLogTree
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTree";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import InlinePipelineStatusFilter from "components/common/filters/pipelines/status/InlinePipelineStatusFilter";
import PipelineActivityLogTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTable";
import CustomTable from "components/common/table/CustomTable";
import PaginationHelper from "@opsera/persephone/helpers/array/pagination.helper";
import useGetPipelineActivityLogs from "hooks/workflow/pipelines/logs/useGetPipelineActivityLogs";

function PipelineActivityLogTreeTable(
  {
    pipeline,
    pipelineId,
    pipelineRunCount,
    className,
    showFilterContainerIcon,
    loadPipelineFunction,
  }) {
  const [currentRunNumber, setCurrentRunNumber] = useState(pipelineRunCount);
  const [currentStepId, setCurrentStepId] = useState(undefined);
  const {
    pipelineActivityLogs,
    pipelineActivityFilterModel,
    setPipelineActivityFilterModel,
    error,
    loadData,
    isLoading,
    pipelineLogsTree,
  } = useGetPipelineActivityLogs(
    pipelineId,
    currentRunNumber,
    pipelineRunCount,
  );

  const getNoDataMessage = () => {
    if (pipelineActivityFilterModel?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    if (currentRunNumber === "secondary") {
      return ("There are no secondary logs.");
    }

    if (currentRunNumber === "latest") {
      return ("Pipeline activity data has not been generated yet.\n Once this pipeline begins running, it will publish details here.");
    }

    if (currentRunNumber === 0) {
      return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
    }

    if (currentRunNumber == null) {
      return ("Please select a run to view its logs");
    }

    return (`There are no log associated with run ${currentRunNumber}`);
  };

  const getTable = () => {
    return (
      <PipelineActivityLogTable
        isLoading={isLoading || isLoading}
        pipeline={pipeline}
        pipelineLogData={pipelineActivityLogs}
        latestPipelineLogId={PaginationHelper.getLatestCreatedItemInDataArray(pipelineActivityLogs)?._id}
        pipelineActivityFilterDto={pipelineActivityFilterModel}
        currentRunNumber={currentRunNumber}
        currentStepId={currentStepId}
        loadPipelineFunction={loadPipelineFunction}
      />
    );
  };

  const getTree = () => {
    return (
      <PipelineActivityLogTree
        pipelineLogTree={pipelineLogsTree}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentStepId={setCurrentStepId}
        pipelineRunCount={pipelineRunCount}
      />
    );
  };

  const getPipelineActivityTable = () => {
    if (pipelineRunCount === 0) {
      return (
        <CustomTable
          isLoading={isLoading || isLoading}
          data={[]}
          noDataMessage={getNoDataMessage()}
        />
      );
    }

    return (
      <TreeAndTableBase
        data={pipelineActivityLogs}
        isLoading={isLoading || isLoading}
        noDataMessage={getNoDataMessage()}
        tableComponent={getTable()}
        loadData={loadData}
        treeComponent={getTree()}
        treeColumnSize={3}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineStatusFilter
        loadData={loadData}
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
        className={"mr-2"}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <PipelineStatusFilter
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
      />
    );
  };

  return (
    <div className={className}>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineActivityFilterModel}
        setFilterDto={setPipelineActivityFilterModel}
        isLoading={isLoading}
        title={"Pipeline Logs"}
        inlineFilters={getInlineFilters()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={showFilterContainerIcon !== false ? faClipboardList : undefined}
        body={getPipelineActivityTable()}
        supportSearch={true}
        anchor={"logs"}
        exportButton={
          <ExportPipelineActivityLogButton
            className={"ml-2"}
            isLoading={isLoading}
            activityLogData={pipelineActivityLogs}
          />
        }
      />
    </div>
  );
}

PipelineActivityLogTreeTable.propTypes = {
  pipeline: PropTypes.object,
  pipelineId: PropTypes.string,
  pipelineRunCount: PropTypes.number,
  className: PropTypes.string,
  showFilterContainerIcon: PropTypes.bool,
  loadPipelineFunction: PropTypes.func,
};

export default PipelineActivityLogTreeTable;
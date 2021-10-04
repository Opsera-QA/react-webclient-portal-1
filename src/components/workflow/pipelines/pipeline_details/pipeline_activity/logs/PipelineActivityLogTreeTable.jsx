import React, {useState} from "react";
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

function PipelineActivityLogTreeTable(
  {
    pipelineLogData,
    pipelineActivityMetadata,
    loadData,
    isLoading,
    pipeline,
    pipelineActivityFilterDto,
    setPipelineActivityFilterDto,
    pipelineActivityTreeData,
    setCurrentLogTreePage,
    currentLogTreePage,
    secondaryActivityLogs,
    latestActivityLogs,
  }) {

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  const getTable = () => {
    return (
      <PipelineActivityLogTable
        isLoading={isLoading}
        pipeline={pipeline}
        pipelineActivityMetadata={pipelineActivityMetadata}
        pipelineLogData={pipelineLogData}
        pipelineActivityFilterDto={pipelineActivityFilterDto}
        latestActivityLogs={latestActivityLogs}
        secondaryActivityLogs={secondaryActivityLogs}
      />
    );
  };

  const getTree = () => {
    return (
      <PipelineActivityLogTree
        pipelineLogTree={pipelineActivityTreeData}
        currentLogTreePage={currentLogTreePage}
        setCurrentLogTreePage={setCurrentLogTreePage}
        pipelineActivityFilterDto={pipelineActivityFilterDto}
        setPipelineActivityFilterDto={setPipelineActivityFilterDto}
      />
    );
  };

  const getPipelineActivityTable = () => {
    return (
      <TreeAndTableBase
        data={pipelineLogData}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
        tableComponent={getTable()}
        loadData={loadData}
        treeComponent={getTree()}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <>
        <InlinePipelineStatusFilter
          loadData={loadData}
          filterModel={pipelineActivityFilterDto}
          setFilterModel={setPipelineActivityFilterDto}
          className={"mr-2"}
        />
      </>
    );
  };

  const getDropdownFilters = () => {
    return (
      <>
        <PipelineStatusFilter filterModel={pipelineActivityFilterDto} setFilterModel={setPipelineActivityFilterDto} />
      </>
    );
  };

  return (
    <div className={"mr-2"}>
      <FilterContainer
        showBorder={false}
        loadData={loadData}
        filterDto={pipelineActivityFilterDto}
        setFilterDto={setPipelineActivityFilterDto}
        isLoading={isLoading}
        title={"Pipeline Logs"}
        inlineFilters={getInlineFilters()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faClipboardList}
        body={getPipelineActivityTable()}
        supportSearch={true}
        exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={pipelineLogData} />}
      />
    </div>
  );
}

PipelineActivityLogTreeTable.propTypes = {
  pipelineLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineActivityFilterDto: PropTypes.object,
  setPipelineActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object,
  pipelineActivityMetadata: PropTypes.object,
  pipelineActivityTreeData: PropTypes.array,
  setCurrentLogTreePage: PropTypes.func,
  currentLogTreePage: PropTypes.number,
  secondaryActivityLogs: PropTypes.array,
  latestActivityLogs: PropTypes.array,
};

export default PipelineActivityLogTreeTable;
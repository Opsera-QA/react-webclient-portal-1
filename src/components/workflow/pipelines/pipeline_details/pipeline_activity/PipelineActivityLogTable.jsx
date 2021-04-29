import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import simpleNumberLocalizer from "react-widgets-simple-number";
import pipelineActivityMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-activity-metadata";
import {
  FILTER_TYPES,
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineRunFilter from "components/common/filters/pipelines/activity_logs/pipeline_run/PipelineRunFilter";
import FilterContainer from "components/common/table/FilterContainer";
import PipelineTaskDetailViewer from "components/common/modal/PipelineTaskDetailViewer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeTableBase from "components/common/table/TreeTableBase";
import BooleanFilter from "components/common/filters/boolean/BooleanFilter";

function PipelineActivityLogTable({ formattedActivityData, unformattedData, loadData, isLoading, pipeline, pipelineActivityFilterDto, setPipelineActivityFilterDto }) {
  const fields = pipelineActivityMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  simpleNumberLocalizer();

  const columns = useMemo(
    () => [
      {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), undefined, 100, FILTER_TYPES.SELECT_FILTER)},
        // , class: "cell-center no-wrap-inline"},
      getTableTextColumn(fields.find(field => { return field.id === "step_name";}), undefined, 200, FILTER_TYPES.SELECT_FILTER),
      getTableTextColumn(fields.find(field => { return field.id === "action";}), undefined, 200, FILTER_TYPES.SELECT_FILTER),
      // getTableTextColumn(fields.find(field => { return field.id === "tool_identifier";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
      getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
    ],
    [],
  );

  const onRowSelect = (treeGrid, row, column, e) => {
    if (column.id === "run_count") {
      return;
    }

    if (row._id == null) {
      const isExpanded = row.$opened;

      if (isExpanded === true) {
        treeGrid.collapse(row.id);
      }
      else {
        treeGrid.expand(row.id);
      }

      return;
    }

    setModalData(row);
    setShowModal(true);
  };

  const handleExpansion = (treeGrid) => {
    const lastRun = formattedActivityData[0]?.run_count;

    if (lastRun) {
      treeGrid.collapseAll();
      treeGrid.expand(lastRun);
    }
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getData("search") !== "") {
      return ("Could not find any results with the given keywords.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  const getPipelineActivityTable = () => {
    return (
      <TreeTableBase
        columns={columns}
        data={formattedActivityData}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
        onRowSelect={onRowSelect}
        loadData={loadData}
        paginationDto={pipelineActivityFilterDto}
        setPaginationDto={setPipelineActivityFilterDto}
        handleExpansion={handleExpansion}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <div className="pb-2 w-100">
        <PipelineRunFilter filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} maximumRunCount={pipeline?.workflow?.run_count} className={"pb-2"}/>
        <BooleanFilter filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} fieldName={"hide_status"} />
      </div>
      // {/*TODO: Make specific pipeline activity version when pulling specific tool identifiers is known*/}
      // {/*<ToolIdentifierFilter filterDto={pipelineActivityFilterDto}  setFilterDto={setPipelineActivityFilterDto} />*/}
    );
  };

  return (
    <div>
      <FilterContainer
        showBorder={false}
        loadData={loadData}
        filterDto={pipelineActivityFilterDto}
        setFilterDto={setPipelineActivityFilterDto}
        isLoading={isLoading}
        title={"Pipeline Logs"}
        titleIcon={faClipboardList}
        body={getPipelineActivityTable()}
        dropdownFilters={getDropdownFilters()}
        supportSearch={true}
        exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={unformattedData} />}
      />
      <PipelineTaskDetailViewer
        pipelineData={pipeline}
        pipelineTaskData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

PipelineActivityLogTable.propTypes = {
  formattedActivityData: PropTypes.array,
  unformattedData: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineActivityFilterDto: PropTypes.object,
  setPipelineActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineActivityLogTable;
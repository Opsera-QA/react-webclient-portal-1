import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import simpleNumberLocalizer from "react-widgets-simple-number";
import PipelineTaskDetailViewer from "../../../../common/modal/PipelineTaskDetailViewer";
import SearchFilter from "../../../../common/filters/search/SearchFilter";
import PipelineRunFilter from "../../../../common/filters/pipelines/activity_logs/PipelineRunFilter";
import FilterContainer from "components/common/table/FilterContainer";
import BooleanFilter from "../../../../common/filters/input/BooleanFilter";
import {
  getPipelineActivityStatusColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../../../common/table/table-column-helpers";
import pipelineActivityMetadata from "./pipeline-activity-metadata";

function PipelineActivityLogTable({ data, loadData, isLoading, pipeline, pipelineActivityFilterDto, setPipelineActivityFilterDto }) {
  const fields = pipelineActivityMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "createdAt",
        desc: true,
      },
    ],
  };
  const noDataMessage = "Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.";

  simpleNumberLocalizer();

  const getRowInfo = (row) => {
    setModalData(row);
    setShowModal(true);
  };

  const rowStyling = (row) => {
    return "";
  };

  const selectRow = (row) => {
    // return row.action !== "automation task" ? getRowInfo(row) : null;
    return getRowInfo(row);
  };

  const columns = useMemo(
    () => [
      {...getTableTextColumn(fields.find(field => { return field.id === "run_count"})), class: "cell-center no-wrap-inline"},
      getTableTextColumn(fields.find(field => { return field.id === "action"})),
      getTableTextColumn(fields.find(field => { return field.id === "step_name"})),
      getTableTextColumn(fields.find(field => { return field.id === "tool_identifier"})),
      getTableTextColumn(fields.find(field => { return field.id === "message"})),
      getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"}))
    ],
    [],
  );

  const onRowSelect = (rowData, type) => {
    selectRow(rowData.original, rowData.original, rowData.original["index"]);
  };

  const getPipelineActivityTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        isLoading={isLoading}
        noDataMessage={noDataMessage}
        initialState={initialState}
        onRowSelect={onRowSelect}
        loadData={loadData}
        paginationDto={pipelineActivityFilterDto}
        setPaginationDto={setPipelineActivityFilterDto}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <div className="pb-2">
        <PipelineRunFilter filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} maximumRunCount={pipeline?.workflow?.run_count}/>
      </div>
      // {/*TODO: Make specific pipeline activity version when pulling specific tool identifiers is known*/}
      // {/*<ToolIdentifierFilter filterDto={pipelineActivityFilterDto}  setFilterDto={setPipelineActivityFilterDto} />*/}
    );
  };

  return (
    <div>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineActivityFilterDto}
        setFilterDto={setPipelineActivityFilterDto}
        isLoading={isLoading}
        tableTitle={"Pipeline Activity Logs"}
        titleIcon={faClipboardList}
        filters={["hide_status", "tool", "search", "run"]}
        body={getPipelineActivityTable()}
        dropdownFilters={getDropdownFilters()}
        supportSearch={true}
      >
        <div className="px-2 d-flex">
          <div><BooleanFilter loadData={loadData} filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} fieldName={"hide_status"} /></div>
          <div className="px-2"><BooleanFilter loadData={loadData} filterDto={pipelineActivityFilterDto} setFilterDto={setPipelineActivityFilterDto} fieldName={"latest"} /></div>
        </div>
      </FilterContainer>
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
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineActivityFilterDto: PropTypes.object,
  setPipelineActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineActivityLogTable;
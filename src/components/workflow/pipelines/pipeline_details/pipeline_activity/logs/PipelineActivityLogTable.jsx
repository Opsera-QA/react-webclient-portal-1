import React, {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import pipelineActivityMetadata from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-metadata";
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
import BooleanFilter from "components/common/filters/boolean/BooleanFilter";
import TableBase from "components/common/table/TableBase";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PipelineActivityLogTree
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTree";

// TODO: Separate this further into PipelineActivityLogTreeTable
function PipelineActivityLogTable({ pipelineLogData, loadData, isLoading, pipeline, pipelineActivityFilterDto, setPipelineActivityFilterDto }) {
  const fields = pipelineActivityMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const isMounted = useRef(false);
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentStepName, setCurrentStepName] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [pipelineLogData]);

  const columns = useMemo(
    () => [
      {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), undefined, 75,)},
      // , class: "cell-center no-wrap-inline"},
      getTableTextColumn(fields.find(field => { return field.id === "step_name";})),
      getTableTextColumn(fields.find(field => { return field.id === "action";})),
      // getTableTextColumn(fields.find(field => { return field.id === "tool_identifier";})),
      getTableTextColumn(fields.find(field => { return field.id === "message";})),
      getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
    ],
    [],
  );

  const getFilterColumns = useMemo(
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
    setModalData(row);
    setShowModal(true);
  };

  const getFilteredData = () => {
    if (currentRunNumber == null) {
      return pipelineLogData;
    }

    return pipelineLogData.filter((item) => {
      return item.run_count === currentRunNumber && (currentStepName == null || item.step_name === currentStepName);
    });
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getData("search") !== "") {
      return ("Could not find any results with the given keywords.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  const handlePagination = (newModel) => {
    setCurrentRunNumber(undefined);
    setCurrentStepName(undefined);
    loadData(newModel);
  };

  const getTable = () => {
    return (
      <div className={"tree-table"}>
        <TableBase
          columns={columns}
          data={getFilteredData()}
          isLoading={isLoading}
          noDataMessage={getNoDataMessage()}
          onRowSelect={onRowSelect}
        />
      </div>
    );
  };

  const getTree = () => {
    return (
      <PipelineActivityLogTree
        pipelineLogData={pipelineLogData}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentStepName={setCurrentStepName}
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
        loadData={handlePagination}
        paginationModel={pipelineActivityFilterDto}
        setPaginationModel={setPipelineActivityFilterDto}
        treeComponent={getTree()}
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
    <div className={"mr-2"}>
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
        exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={pipelineLogData} />}
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
  pipelineLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  pipelineActivityFilterDto: PropTypes.object,
  setPipelineActivityFilterDto: PropTypes.func,
  loadData: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineActivityLogTable;
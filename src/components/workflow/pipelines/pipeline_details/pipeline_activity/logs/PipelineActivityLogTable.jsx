import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import FilterContainer from "components/common/table/FilterContainer";
import PipelineTaskDetailViewer from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TableBase from "components/common/table/TableBase";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PipelineActivityLogTree
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTree";
import {DialogToastContext} from "contexts/DialogToastContext";

// TODO: Separate this further into PipelineActivityLogTreeTable
function PipelineActivityLogTable({ pipelineLogData, pipelineActivityMetadata, loadData, isLoading, pipeline, pipelineActivityFilterDto, setPipelineActivityFilterDto, pipelineActivityTreeData, setCurrentLogTreePage, currentLogTreePage }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [currentRunNumber, setCurrentRunNumber] = useState(undefined);
  const [currentStepName, setCurrentStepName] = useState(undefined);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(pipelineActivityMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineActivityMetadata)]);

  const onRowSelect = (treeGrid, row, column, e) => {
    toastContext.showOverlayPanel(<PipelineTaskDetailViewer pipelineName={pipeline?.name} pipelineActivityLogId={row._id} />);
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getTableTextColumn(fields.find(field => { return field.id === "step_name";})),
          getTableTextColumn(fields.find(field => { return field.id === "action";})),
          getTableTextColumn(fields.find(field => { return field.id === "message";})),
          getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
          getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
        ]
      );
    }
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

  const onPageChange = (newPage) => {
    if (currentLogTreePage !== newPage) {
      setCurrentLogTreePage(newPage);

      // TODO: Do we want to select the top item when changing pages?
      //  This will require allowing selection to be passed into tree
      // const newTopIndex = newPage * 20;
      // const topItem = pipelineActivityTreeData[newTopIndex];
      setCurrentRunNumber(undefined);
      setCurrentStepName(undefined);
    }
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
        pipelineLogTree={pipelineActivityTreeData}
        setCurrentRunNumber={setCurrentRunNumber}
        setCurrentStepName={setCurrentStepName}
        currentLogTreePage={currentLogTreePage}
        onPageChange={onPageChange}
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
        supportSearch={true}
        exportButton={<ExportPipelineActivityLogButton className={"ml-2"} isLoading={isLoading} activityLogData={pipelineLogData} />}
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
  pipeline: PropTypes.object,
  pipelineActivityMetadata: PropTypes.object,
  pipelineActivityTreeData: PropTypes.array,
  setCurrentLogTreePage: PropTypes.func,
  currentLogTreePage: PropTypes.number
};

export default PipelineActivityLogTable;
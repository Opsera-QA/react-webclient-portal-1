import React, {useMemo} from "react";
import PropTypes from "prop-types";
import pipelineSchedulerMetadata from "components/workflow/pipelines/scheduler/pipeline-scheduler-metadata";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import VanityTable from "components/common/table/VanityTable";

function PipelineScheduledTaskTable({ data, isLoading, paginationModel, setPaginationModel, pipeline, loadData, isMounted, setScheduledTaskData }) {
  const fields = pipelineSchedulerMetadata.fields;

  const onRowSelect = (grid, row) => {
    if (isMounted?.current === true) {
      let newModel = new Model({...row}, pipelineSchedulerMetadata, false);
      setScheduledTaskData({...newModel});
    }
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "description";})),
      // getTableTextColumn(fields.find(field => { return field.id === "notes";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active";})),
    ],
    [],
  );

  const getPipelineScheduledTasksTable = () => {
    return (
      <VanityTable
        columns={columns}
        onRowSelect={onRowSelect}
        loadData={loadData}
        data={data}
        isLoading={isLoading}
        noDataMessage={"No Pipeline Tasks Have Been Scheduled"}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
      />
    );
  };

  const createScheduledTask = () => {
    if (isMounted?.current === true) {
      let newModel = new Model({...pipelineSchedulerMetadata.newObjectFields}, pipelineSchedulerMetadata, true);
      newModel.setData("task", { taskType: "RUN", pipelineId: pipeline?._id});
      setScheduledTaskData({...newModel});
    }
  };

  if (isMounted?.current === false) {
    return null;
  }

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      isLoading={isLoading}
      titleIcon={faCalendarAlt}
      type={"Pipeline Scheduled Task"}
      title={"Pipeline Scheduled Tasks"}
      metadata={pipelineSchedulerMetadata}
      addRecordFunction={createScheduledTask}
      body={getPipelineScheduledTasksTable()}
      className={"mt-3 mx-3"}
    />
  );
}

PipelineScheduledTaskTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  setScheduledTaskData: PropTypes.func,
  pipeline: PropTypes.object,
};

export default PipelineScheduledTaskTable;
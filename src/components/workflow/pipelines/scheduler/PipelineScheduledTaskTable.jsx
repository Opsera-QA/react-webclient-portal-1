import React, {useMemo} from "react";
import PropTypes from "prop-types";
import pipelineSchedulerMetadata from "components/workflow/pipelines/scheduler/pipeline-scheduler-metadata";
import {getTableActiveBooleanIconColumn, getTableTextColumn, getTableDateTimeColumn} from "components/common/table/table-column-helpers-v2";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";

// TODO: This is sloppy and needs to be reworked
function PipelineScheduledTaskTable(
  {
    data,
    isLoading,
    paginationModel,
    setPaginationModel,
    pipelineId,
    loadData,
    isMounted,
    setScheduledTaskData,
  }) {
  const fields = [...pipelineSchedulerMetadata.fields, {label: "Next Run", id: "executionDate"}, {label: "Interval", id: "interval"} ];

  const frequencyLookup ={
    "NONE": "once",
    "DAY": "daily",
    "WEEK": "weekly",
    "MONTH": "monthly"
};

  let newData = data;
  newData.forEach(item => {
    item["executionDate"] = item.schedule.executionDate;
    item["interval"] = frequencyLookup[item.schedule.recurring];
  });

  const onRowSelect = (grid, row) => {
    if (isMounted?.current === true) {
      let newModel = new Model({...row}, pipelineSchedulerMetadata, false);
      setScheduledTaskData({...newModel});
    }
  };

  const getTooltipTemplate = () => {
    return "Click row to view/edit details";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline", undefined, undefined, getTooltipTemplate),
      getTableDateTimeColumn(getField(fields, "executionDate"), "no-wrap-inline", 175, undefined, getTooltipTemplate),
      getTableTextColumn(getField(fields, "interval"), "no-wrap-inline", undefined, undefined, getTooltipTemplate),
      getTableDateTimeColumn(getField(fields, "lastRun"), "no-wrap-inline", 175, undefined, getTooltipTemplate),
      getTableActiveBooleanIconColumn(getField(fields, "active"), "no-wrap-inline", 60, getTooltipTemplate)
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
      newModel.setData("task", { taskType: "pipeline-run", pipelineId: pipelineId});
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
  pipelineId: PropTypes.string,
};

export default PipelineScheduledTaskTable;
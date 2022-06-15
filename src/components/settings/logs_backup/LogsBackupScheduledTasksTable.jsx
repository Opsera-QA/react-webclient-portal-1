import React, {useMemo} from "react";
import PropTypes from "prop-types";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";
import {
  getTableActiveBooleanIconColumn,
  getTableTextColumn,
  getFormattedLabelWithFunctionColumnDefinition,
  getTableDateTimeColumnWithTimeZone
} from "components/common/table/table-column-helpers-v2";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";
import {
  getSchedulerFrequencyLabel
} from "components/common/fields/scheduler/frequencies/schedulerFrequency.constants";
import modelHelpers from "components/common/model/modelHelpers";

function LogsBackupScheduledTasksTable(
  {
    scheduledTasks,
    isLoading,
    paginationModel,
    setPaginationModel,
    loadDataFunction,
    isMounted,
    setScheduledTaskModel,
    createScheduledTaskFunction,
  }) {
  const fields = scheduledTaskMetadata.fields;

  const onRowSelect = (grid, row) => {
    if (isMounted?.current === true) {
      setScheduledTaskModel({...modelHelpers.parseObjectIntoModel(row, scheduledTaskMetadata)});
    }
  };

  const getTooltipTemplate = () => {
    return "Click row to view/edit details";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(
        getField(fields, "name"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getTableDateTimeColumnWithTimeZone(
        getField(fields, "schedule.executionDate"),
        "no-wrap-inline",
        220,
        undefined,
        getTooltipTemplate,
        true,
      ),
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "task.pushToS3Interval"),
        getSchedulerFrequencyLabel,
        "no-wrap-inline",
        getTooltipTemplate,
      ),
      getTableDateTimeColumnWithTimeZone(
        getField(fields, "lastRun"),
        "no-wrap-inline",
        220,
        undefined,
        getTooltipTemplate,
      ),
      getTableActiveBooleanIconColumn(
        getField(fields, "active"),
        "no-wrap-inline",
        60,
        getTooltipTemplate,
      ),
    ],
    [],
  );

  const getScheduledTaskTable = () => {
    return (
      <VanityTable
        columns={columns}
        onRowSelect={onRowSelect}
        loadData={loadDataFunction}
        data={scheduledTasks}
        isLoading={isLoading}
        noDataMessage={"No Tasks Have Been Scheduled"}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
      />
    );
  };

  if (isMounted?.current === false) {
    return null;
  }

  return (
    <FilterContainer
      loadData={loadDataFunction}
      isLoading={isLoading}
      titleIcon={faCalendarAlt}
      type={"Scheduled Task"}
      title={"Scheduled Tasks"}
      metadata={scheduledTaskMetadata}
      addRecordFunction={createScheduledTaskFunction}
      body={getScheduledTaskTable()}
      className={"mt-3 mx-3"}
    />
  );
}

LogsBackupScheduledTasksTable.propTypes = {
  scheduledTasks: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  isMounted: PropTypes.object,
  setScheduledTaskModel: PropTypes.func,
  createScheduledTaskFunction: PropTypes.func,
};

export default LogsBackupScheduledTasksTable;
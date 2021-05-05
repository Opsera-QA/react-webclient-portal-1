import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import pipelineSchedulerMetadata from "components/workflow/pipelines/scheduler/pipeline-scheduler-metadata";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import TableBase from "components/common/table/TableBase";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import {faCalendarAlt} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

function PipelineScheduledTaskTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = pipelineSchedulerMetadata.fields;

  // TODO: Add mechanism to switch to editor panel
  const onRowSelect = (rowData) => {
    console.log("row click works!");
    // history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "description";})),
      getTableTextColumn(fields.find(field => { return field.id === "notes";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active";})),
    ],
    [],
  );

  const getPipelineScheduledTasksTable = () => {
    return (
      <PaginationContainer
        isLoading={isLoading}
        loadData={loadData}
        setFilterDto={setPaginationModel}
        filterDto={paginationModel}
      >
        <TableBase
          columns={columns}
          onRowSelect={onRowSelect}
          loadData={loadData}
          data={data}
          isLoading={isLoading}
          noDataMessage={"No Pipeline Tasks Have Been Scheduled"}
        />
      </PaginationContainer>
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      titleIcon={faCalendarAlt}
      type={"Pipeline Scheduled Task"}
      title={"Pipeline Scheduled Tasks"}
      metadata={pipelineSchedulerMetadata}
      body={getPipelineScheduledTasksTable()}
    />
  );
}

PipelineScheduledTaskTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func
};

export default PipelineScheduledTaskTable;
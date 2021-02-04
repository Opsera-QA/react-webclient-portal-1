import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getPipelineTypeColumn,
  getTableDateColumn,
  getTablePipelineStatusColumn,
  getTableTextColumn
} from "../../../common/table/table-column-helpers";
import pipelineMetadata from "./pipeline-metadata";
import {useHistory} from "react-router-dom";

function PipelinesTable({ data, isLoading, paginationModel, setPaginationModel }) {
  let history = useHistory();
  const fields = pipelineMetadata.fields;

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const initialState = {
    pageIndex: 0,
  }

  const columns = useMemo(
    () => [
      getPipelineTypeColumn(fields.find(field => { return field.id === "type"})),
      getTableTextColumn(fields.find(field => { return field.id === "_id"})),
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "owner_name"})),
      getTablePipelineStatusColumn(fields.find(field => { return field.id === "workflow"})),
      getTableTextColumn(fields.find(field => { return field.id === "workflow.run_count"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableDateColumn(fields.find(field => { return field.id === "updatedAt"})),
    ],
    [],
  );

  return (
    <CustomTable
      columns={columns}
      onRowSelect={onRowSelect}
      paginationDto={paginationModel}
      setPaginationDto={setPaginationModel}
      initialState={initialState}
      data={data}
      isLoading={isLoading}
    />
  );
}

PipelinesTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object
};

export default PipelinesTable;
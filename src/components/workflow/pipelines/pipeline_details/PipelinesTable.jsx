import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn,
  getTablePipelineStatusColumn,
  getTableTextColumn
} from "../../../common/table/table-column-helpers";
import pipelineMetadata from "./pipeline-metadata";
import {useHistory} from "react-router-dom";

function PipelinesTable({ data, isLoading }) {
  let history = useHistory();
  const fields = pipelineMetadata.fields;

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "owner_name"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTablePipelineStatusColumn(fields.find(field => { return field.id === "workflow"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableDateColumn(fields.find(field => { return field.id === "updatedAt"})),
    ],
    [],
  );

  return (
    <CustomTable
      columns={columns}
      onRowSelect={onRowSelect}
      data={data}
      isLoading={isLoading}
    />
  );
}

PipelinesTable.propTypes = {
  data: PropTypes.array,
  paginationOptions: PropTypes.object,
  isLoading: PropTypes.bool,
  selectRunCountFilter: PropTypes.func,
  currentRunCountFilter: PropTypes.number,
  maxRunCount: PropTypes.number,
};

export default PipelinesTable;
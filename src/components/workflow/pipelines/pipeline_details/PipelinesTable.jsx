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

function PipelinesTable({ data, isLoading }) {
  let history = useHistory();
  const fields = pipelineMetadata.fields;

  const onRowSelect = (rowData) => {
    history.push(`/workflow/details/${rowData.original._id}/summary`);
  };

    // Please add Run Count (item.workflow.run_count) as a column (after status)

  // Please try to use the “type” value to create a new column (make it the first column) that shows the icons that currently map to type in the card view.
  // Please make the icons small, and just be the first column.
  // I really don’t even need a header for that column if it’s possible to not render one,
  // but this is just a nice to have feature in the list.  This last item is not a requirement if it’s a pain.

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
    <>
      {console.log('data: ' + JSON.stringify(data[0]))}
    <CustomTable
      columns={columns}
      onRowSelect={onRowSelect}
      data={data}
      isLoading={isLoading}
    />
    </>
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
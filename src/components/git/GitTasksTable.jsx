import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getTableButtonColumn
} from "components/common/table/table-column-helpers";
import gitTasksMetadata from "./git-tasks-metadata";
import {useHistory} from "react-router-dom";

function GitTasksTable({ data, gitTasksFilterDto, setGitTasksFilterDto, loadData, isLoading }) {
  let history = useHistory();
  const fields = gitTasksMetadata.fields;
  
  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const handleRunGitTask = (rowData) => {
    history.push({pathname: `/git/details/${rowData._id}`, state: { runTask : true }});
  }

  const viewDetails = (rowData) => {
    history.push({pathname: `/git/details/${rowData._id}`, state: { runTask : false }});
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "type"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
      getTableButtonColumn("_id", "", "outline-primary", "View Details", viewDetails),
      getTableButtonColumn("row", "", "primary", "Run Task", handleRunGitTask),
    ],
    []
  );

  return (
    <CustomTable
      className={"no-table-border"}
      columns={columns}
      data={data}
      isLoading={isLoading}
      // onRowSelect={onRowSelect}
      paginationDto={gitTasksFilterDto}
      setPaginationDto={setGitTasksFilterDto}
      rowStyling={rowStyling}
      loadData={loadData}
    />
  );
}

GitTasksTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  gitTasksFilterDto: PropTypes.object,
  setGitTasksFilterDto: PropTypes.func,
};

export default GitTasksTable;
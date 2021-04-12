import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getPipelineActivityStatusColumn, getTagColumn
} from "components/common/table/table-column-helpers";
import gitTasksMetadata from "./git-tasks-metadata";
import {useHistory} from "react-router-dom";

function GitTasksTable({ data, gitTasksFilterDto, setGitTasksFilterDto, loadData, isLoading }) {
  let history = useHistory();
  const fields = gitTasksMetadata.fields;
  
  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const onRowSelect = (rowData) => {
    const id = rowData?.original?._id;

    if (id) {
      history.push({pathname: `/git/details/${id}`});
    }
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";}), "force-text-wrap"),
      getTableTextColumn(fields.find(field => { return field.id === "description";}), "force-text-wrap"),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTagColumn(fields.find(field => { return field.id === "tags";})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active";})),
      getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
    ],
    []
  );

  return (
    <CustomTable
      className={"no-table-border"}
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
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
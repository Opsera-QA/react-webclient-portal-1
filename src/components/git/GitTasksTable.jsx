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
import {getField} from "components/common/metadata/metadata-helpers";

function GitTasksTable({ data, gitTasksFilterDto, setGitTasksFilterDto, loadData, isLoading }) {
  let history = useHistory();
  const fields = gitTasksMetadata.fields;
  
  const onRowSelect = (rowData) => {
    history.push({pathname: `/task/details/${rowData?.original?._id}`});
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "force-text-wrap"),
      getTableTextColumn(getField(fields, "description"), "force-text-wrap"),
      getTableTextColumn(getField(fields, "type")),
      getTagColumn(getField(fields, "tags")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getPipelineActivityStatusColumn(getField(fields, "status")),
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
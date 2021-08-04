import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn,
  getStaticInfoColumn, getRoleAccessLevelColumn
} from "components/common/table/table-column-helpers-v2";
import {useHistory} from "react-router-dom";
import gitTasksMetadata from "components/git/git-tasks-metadata";
import VanityTable from "components/common/table/VanityTable";

function ConsolidatedUserReportTaskAccessTable({ data, isLoading, paginationModel, setPaginationModel, loadData }) {
  let history = useHistory();
  const fields = gitTasksMetadata.fields;

  const onRowSelect = (grid, row) => {
    history.push(`/task/details/${row?._id}`);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getRoleAccessLevelColumn(fields.find(field => { return field.id === "role_access_level";})),
      // getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getStaticInfoColumn()
    ],
    [],
  );

  const getNoDataMessage = () => {
    const activeFilters = paginationModel?.getActiveFilters();
    if (activeFilters && activeFilters.length > 0) {
      return "No tasks meeting the filter requirements were found.";
    }

    return "No tasks found for this user account.";
  };

  return (
    <VanityTable
      columns={columns}
      onRowSelect={onRowSelect}
      paginationModel={paginationModel}
      noDataMessage={getNoDataMessage()}
      loadData={loadData}
      setPaginationModel={setPaginationModel}
      tableHeight={"250px"}
      data={data}
      isLoading={isLoading}
    />
  );
}

ConsolidatedUserReportTaskAccessTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default ConsolidatedUserReportTaskAccessTable;
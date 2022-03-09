import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faTasks} from "@fortawesome/pro-light-svg-icons";
import taskMetadata from "components/tasks/git-tasks-metadata";
import {getTableBooleanIconColumn, getTableDateColumn, getTableTextColumn, getPipelineActivityStatusColumn} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import { useHistory } from "react-router-dom";
import VanityTable from "components/common/table/VanityTable";

function UserTaskOwnershipReportTable({ paginationModel, setPaginationModel, loadData, taskList, isLoading }) {
  const fields = taskMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "description"),"force-text-wrap"),
      getTableTextColumn(getField(fields, "type")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getPipelineActivityStatusColumn(getField(fields, "status")),
    ],
    []
  );

  const onRowSelect = (grid, row) => {
    history.push(`/task/details/${row?._id}`);
  };

  const getTasksTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        noDataMessage={getNoDataMessage()}
        data={taskList}
        loadData={loadData}
        columns={columns}
        onRowSelect={onRowSelect}
      />
    );
  };

  const getNoDataMessage = () => {
    const activeFilters = paginationModel?.getActiveFilters();

    if (!paginationModel?.getFilterValue("owner")) {
      return "Please select a user to get started";
    }

    if (activeFilters && activeFilters.length > 1) {
      return "No tasks meeting the filter requirements were found.";
    }

    return "No tasks are owned by this user account.";
  };


  return (
    <FilterContainer
      className={"px-2 pb-2"}
      loadData={loadData}
      filterDto={paginationModel}
      setFilterDto={setPaginationModel}
      supportSearch={true}
      isLoading={isLoading}
      metadata={taskMetadata}
      body={getTasksTable()}
      titleIcon={faTasks}
      title={"Tasks"}
    />
  );
}

UserTaskOwnershipReportTable.propTypes = {
  taskList: PropTypes.array,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default UserTaskOwnershipReportTable;

import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import tagMetadata from "components/settings/tags/tag.metadata";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faComputerClassic } from "@fortawesome/pro-light-svg-icons";
import userActivityAuditLogMetadata from "components/common/audit_log/userActivityAuditLog.metadata";

function UserActivityAuditLogTable(
  {
    taskAuditLogs,
    loadData,
    isLoading,
    filterModel,
    setFilterModel,
    className,
  }) {
  const fields = userActivityAuditLogMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "user_id")),
      getTableTextColumn(getField(fields, "action")),
    ],
    []
  );

  // TODO: Do we want to show overlay with further details after selecting row?
  // const onRowSelect = (rowData, type) => {
  //   history.push("/settings/tags/" + rowData.original._id);
  // };

  const getUserActivityAuditLogTable = () => {
    return (
      <CustomTable
        data={taskAuditLogs}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
      isLoading={isLoading}
      body={getUserActivityAuditLogTable()}
      metadata={tagMetadata}
      titleIcon={faComputerClassic}
      title={"Audit Log"}
      className={className}
    />
  );
}

UserActivityAuditLogTable.propTypes = {
  taskAuditLogs: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  className: PropTypes.string,
};

UserActivityAuditLogTable.defaultProps = {
  className: "pt-2",
};

export default UserActivityAuditLogTable;
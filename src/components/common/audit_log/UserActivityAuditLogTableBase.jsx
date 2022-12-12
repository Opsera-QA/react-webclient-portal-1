import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  getOwnerNameField,
  getTableCreatedAtColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import userActivityAuditLogMetadata from "@opsera/definitions/constants/audit-logs/user/userActivityAuditLog.metadata";

export default function UserActivityAuditLogTableBase(
  {
    auditLogs,
    filterModel,
    setFilterModel,
    isLoading,
    loadDataFunction,
    setSelectedActivityLogId,
  }) {
  const fields = userActivityAuditLogMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "action")),
      getOwnerNameField("User"),
      getTableCreatedAtColumn("Date"),
    ],
    [fields]
  );

  const rowClickFunction = (row) => {
    setSelectedActivityLogId(row?.original?._id);
  };

  return (
    <CustomTable
      isLoading={isLoading}
      data={auditLogs}
      columns={columns}
      paginationDto={filterModel}
      setPaginationDto={setFilterModel}
      loadData={loadDataFunction}
      onRowSelect={rowClickFunction}
      nextGeneration={true}
    />
  );
}

UserActivityAuditLogTableBase.propTypes = {
  auditLogs: PropTypes.array,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadDataFunction: PropTypes.func,
  setSelectedActivityLogId: PropTypes.func,
};
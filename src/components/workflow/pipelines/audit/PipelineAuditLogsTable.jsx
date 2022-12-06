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

export default function PipelineAuditLogsTable(
  {
    auditLogs,
    filterModel,
    setFilterModel,
    isLoading,
    loadDataFunction,
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

  return (
    <CustomTable
      isLoading={isLoading}
      data={auditLogs}
      columns={columns}
      paginationDto={filterModel}
      setPaginationDto={setFilterModel}
      loadData={loadDataFunction}
    />
  );
}

PipelineAuditLogsTable.propTypes = {
  auditLogs: PropTypes.array,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadDataFunction: PropTypes.func,
};
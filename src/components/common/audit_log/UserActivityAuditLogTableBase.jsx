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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
  const activeFilters = DataParsingHelper.parseArray(filterModel?.getActiveFilters(), []);

  const columns = useMemo(
    () => {
      const columns = [];

      const hasActionFilterValue = filterModel?.hasActiveFilterValue("actions");
      const actions = DataParsingHelper.parseArray(filterModel?.getData("actions"), []);

      if (hasActionFilterValue !== true || actions.length !== -1) {
        if (actions.length !== 1) {
          columns.push(getTableTextColumn(getField(fields, "action")));
        }
      }

      if (filterModel?.hasActiveFilterValue("user") !== true) {
        columns.push(getOwnerNameField("User"));
      }

      columns.push(getTableCreatedAtColumn("Date"));
      return columns;
    },
    [fields, activeFilters]
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
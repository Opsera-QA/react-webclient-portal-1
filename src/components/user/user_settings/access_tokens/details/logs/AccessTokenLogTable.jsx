import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getFormattedLabelWithFunctionColumnDefinition, getOwnerNameField,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import {accessTokenLogMetadata} from "components/user/user_settings/access_tokens/details/logs/access-token-log-metadata";
import accessTokenScopeConstants from "@opsera/definitions/constants/access_tokens/accessTokenScope.constants";

function AccessTokenLogTable(
  {
    isLoading,
    loadData,
    activityLogs,
    filterModel,
    setFilterModel,
    error,
    className,
    showUserField,
  }) {
  const fields = accessTokenLogMetadata.fields;

  const columns = useMemo(
    () => {
      const columnDefinitions = [
        getTableTextColumn(getField(fields, "token_id")),
        getTableTextColumn(getField(fields, "target")),
        getFormattedLabelWithFunctionColumnDefinition(getField(fields, "scope"), accessTokenScopeConstants.getScopeLabel),
        getTableDateTimeColumn(getField(fields, "createdAt")),
      ];

      if (showUserField === true) {
        columnDefinitions.push(getOwnerNameField("User"));
      }

      return columnDefinitions;
    },
    [fields, showUserField]
  );

  const noDataMessage = "No logs have been generated.";

  const getActivityLogsTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        noDataMessage={noDataMessage}
        loadData={loadData}
        data={activityLogs}
        columns={columns}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        error={error}
      />
    );
  };

  return (
    <FilterContainer
      className={className}
      loadData={loadData}
      isLoading={isLoading}
      body={getActivityLogsTable()}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
      supportSearch={true}
      titleIcon={faTable}
      title={"Token Activity Log"}
      error={error}
    />
  );
}

AccessTokenLogTable.propTypes = {
  activityLogs: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  error: PropTypes.any,
  className: PropTypes.string,
  showUserField: PropTypes.bool,
};

export default AccessTokenLogTable;
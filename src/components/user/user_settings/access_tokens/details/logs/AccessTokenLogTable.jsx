import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import {accessTokenLogMetadata} from "components/user/user_settings/access_tokens/details/logs/access-token-log-metadata";

function AccessTokenLogTable({isLoading, loadData, activityLogs, filterModel, setFilterModel}) {
  const fields = accessTokenLogMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "token_id")),
      getTableTextColumn(getField(fields, "target")),
      getTableTextColumn(getField(fields, "scope")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const noDataMessage = "No logs have been generated for this token.";

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
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getActivityLogsTable()}
      filterDto={filterModel}
      setFilterDto={setFilterModel}
      supportSearch={true}
      titleIcon={faTable}
      title={"Token Activity Log"}
    />
  );
}

AccessTokenLogTable.propTypes = {
  activityLogs: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func
};

export default AccessTokenLogTable;
import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn, getTableDateTimeColumn, getTableDeleteColumn, getTableInfoIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {accessTokenMetadata} from "components/user/user_settings/access_tokens/access-token-metadata";

function AccessTokenLogTable({data, isLoading}) {
  // let fields = accessTokenMetadata.fields;

  const columns = useMemo(
    () => [
      // getTableTextColumn(getField(fields, "name")),
      // getTableTextColumn(getField(fields, "scope")),
      // getTableDateColumn(getField(fields, "createdAt")),
      // getTableDateTimeColumn(getField(fields, "expiration")),
    ],
    []
  );

  const noDataMessage = "No logs have been generated for this token.";

  return (
    <div className="px-2 pb-2">
      <CustomTable
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        isLoading={isLoading}
        tableTitle={"Access Tokens"}
        type={"Access Token"}
      />
    </div>
  );
}

AccessTokenLogTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

export default AccessTokenLogTable;
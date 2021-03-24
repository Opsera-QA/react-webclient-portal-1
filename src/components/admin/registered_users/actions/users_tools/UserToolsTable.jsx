import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import usersToolMetadata from "components/admin/registered_users/actions/users_tools/users-tool-metadata";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";

function UserToolsTable({ data }) {
  const fields = usersToolMetadata.fields;

  const tableInitialState = {
    pageIndex: 0,
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "toolStatus";})),
      getTableTextColumn(fields.find(field => { return field.id === "dnsName";})),
    ],
    []
  );

  return (
    <div className="px-2 pb-2">
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        tableTitle={"Tools"}
        initialState={tableInitialState}
      />
    </div>
  );
}

UserToolsTable.propTypes = {
  data: PropTypes.array,
};

export default UserToolsTable;
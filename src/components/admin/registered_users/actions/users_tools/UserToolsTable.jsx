import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import usersToolMetadata from "components/admin/registered_users/actions/users_tools/users-tool-metadata";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";

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

  const getUserToolsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        initialState={tableInitialState}
      />
    );
  };

  return (
    <FilterContainer
      className={"my-2"}
      showBorder={false}
      body={getUserToolsTable()}
      metadata={usersToolMetadata}
      titleIcon={faTools}
      title={"Tools"}
    />
  );
}

UserToolsTable.propTypes = {
  data: PropTypes.array,
};

export default UserToolsTable;
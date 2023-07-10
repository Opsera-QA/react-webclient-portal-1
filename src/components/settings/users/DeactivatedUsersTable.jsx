import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {usersMetadata} from "components/settings/users/users.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import FilterContainer from "components/common/table/FilterContainer";
import {faUsers, faUsersSlash} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";

export default function DeactivatedUsersTable(
  {
    users,
    isLoading,
    loadData,
  }) {
  const fields = usersMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "preferredName")),
      getTableTextColumn(getField(fields, "firstName")),
      getTableTextColumn(getField(fields, "lastName")),
      getTableTextColumn(getField(fields, "emailAddress")),
      getTableTextColumn(getField(fields, "title")),
      getTableTextColumn(getField(fields, "departmentName")),
      getTableTextColumn(getField(fields, "division")),
      getTableTextColumn(getField(fields, "region")),
    ],
    [fields]
  );

  const getUsersTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        data={users}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getUsersTable()}
      titleIcon={faUsersSlash}
      showBorder={false}
      title={"Deactivated Users"}
      type={"User"}
    />
  );
}

DeactivatedUsersTable.propTypes = {
  users: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

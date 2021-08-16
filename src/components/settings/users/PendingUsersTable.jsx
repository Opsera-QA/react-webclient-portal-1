import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserHardHat} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";
import {ssoUserMetadata} from "components/settings/users/sso-user-metadata";

function PendingUsersTable({ pendingUserData, isLoading, loadData }) {
  const fields = ssoUserMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "firstName")),
      getTableTextColumn(getField(fields, "lastName")),
      getTableTextColumn(getField(fields, "email")),
      getTableTextColumn(getField(fields, "organizationName")),
      getTableTextColumn(getField(fields, "domain")),
    ],
    [fields]
  );

  const getUsersTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        data={pendingUserData}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getUsersTable()}
      titleIcon={faUserHardHat}
      showBorder={false}
      title={"Pending Users"}
    />
  );
}

PendingUsersTable.propTypes = {
  pendingUserData: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default PendingUsersTable;
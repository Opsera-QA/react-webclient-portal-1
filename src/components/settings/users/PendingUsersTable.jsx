import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserHardHat} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";
import {ssoUserMetadata} from "components/settings/users/ssoUser.metadata";
import {useHistory} from "react-router-dom";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

function PendingUsersTable({ pendingUserData, isLoading, loadData }) {
  const fields = ssoUserMetadata.fields;
  const history = useHistory();

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
        onRowSelect={onRowSelect}
        noDataMessage={"There are no pending users."}
      />
    );
  };

  const onRowSelect = (grid, row) => {
    history.push(`/settings/user-management/pending/${row?._id}/details`);
  };

  return (
    <div>
      <InlineWarning
        className={"mx-2"}
        warningMessage={`
        These users have started registration but have not logged into the platform yet.
        Until they complete a successful login, they will not be available for user management or group association.
        `}
      />
      <FilterContainer
        loadData={loadData}
        isLoading={isLoading}
        body={getUsersTable()}
        titleIcon={faUserHardHat}
        showBorder={false}
        title={"Pending Users"}
      />
    </div>
  );
}

PendingUsersTable.propTypes = {
  pendingUserData: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default PendingUsersTable;
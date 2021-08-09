import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {usersMetadata} from "components/settings/users/users-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import NewLdapUserModal from "components/settings/ldap_users/NewLdapUserModal";
import FilterContainer from "components/common/table/FilterContainer";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";

function UsersTable({ userData, orgDomain, isLoading, authorizedActions, loadData }) {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const fields = usersMetadata.fields;
  const history = useHistory();

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

  const onRowSelect = (grid, row) => {
    history.push(`/settings/user-management/${row?.emailAddress}/details`);
  };

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  const getUsersTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        // onRowSelect={onRowSelect}
        data={userData}
        columns={columns}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        addRecordFunction={authorizedActions?.includes("create_user") ? createUser : null}
        isLoading={isLoading}
        body={getUsersTable()}
        titleIcon={faSitemap}
        showBorder={false}
        title={"Users"}
        type={"User"}
      />
      <NewLdapUserModal
        authorizedActions={authorizedActions}
        showModal={showCreateUserModal}
        setShowModal={setShowCreateUserModal}
        loadData={loadData}
        orgDomain={orgDomain}
      />
    </div>
  );
}

UsersTable.propTypes = {
  userData: PropTypes.array,
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default UsersTable;
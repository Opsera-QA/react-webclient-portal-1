import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {usersMetadata} from "components/settings/users/users.metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import FilterContainer from "components/common/table/FilterContainer";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";
import NewUserOverlay from "components/settings/users/NewUserOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import LdapUserRoleHelper from "@opsera/know-your-role/roles/accounts/users/ldapUserRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function UsersTable(
  {
    users,
    orgDomain,
    isLoading,
    loadData,
    allowUserCreation,
  }) {
  const toastContext = useContext(DialogToastContext);
  const fields = usersMetadata.fields;
  const history = useHistory();
  const { userData } = useComponentStateReference();

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
    history.push(`/settings/user-management/active/${orgDomain}/${row?.emailAddress}/details`);
  };

  const createUser = () => {
    toastContext.showOverlayPanel(
      <NewUserOverlay
        loadData={loadData}
      />
    );
  };

  const getUsersTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={users}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={allowUserCreation !== false && LdapUserRoleHelper.canCreateUser(userData) === true ? createUser : null}
      isLoading={isLoading}
      body={getUsersTable()}
      titleIcon={faUsers}
      showBorder={false}
      title={"Users"}
      type={"User"}
    />
  );
}

UsersTable.propTypes = {
  users: PropTypes.array,
  orgDomain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  allowUserCreation: PropTypes.bool,
};

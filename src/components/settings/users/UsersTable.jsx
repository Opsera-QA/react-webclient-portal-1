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

function UsersTable({ userData, orgDomain, isLoading, authorizedActions, loadData, isMounted }) {
  const toastContext = useContext(DialogToastContext);
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
    history.push(`/settings/user-management/active/${orgDomain}/${row?.emailAddress}/details`);
  };

  const createUser = () => {
    toastContext.showOverlayPanel(
      <NewUserOverlay
        loadData={loadData}
        isMounted={isMounted}
        authorizedActions={authorizedActions}
      />
    );
  };

  const getUsersTable = () => {
    return (
      <VanityTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={userData}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={authorizedActions?.includes("create_user") ? createUser : null}
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
  userData: PropTypes.array,
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
};

export default UsersTable;
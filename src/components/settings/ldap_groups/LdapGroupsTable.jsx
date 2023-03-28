import React, {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateLdapGroupOverlay from "components/settings/ldap_groups/CreateLdapGroupOverlay";
import LdapUserGroupRoleHelper from "@opsera/know-your-role/roles/accounts/groups/user/ldapUserGroupRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";

export default function LdapGroupsTable(
  {
    groupData,
    orgDomain,
    isLoading,
    loadData,
    existingGroupNames,
    className,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = ldapGroupMetadata.fields;
  const {
    userData,
  } = useComponentStateReference();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "ownerEmail")),
      getTableTextColumn(getField(fields, "memberCount")),
    ],
    []
  );

  const createGroup = () => {
    toastContext.showOverlayPanel(
      <CreateLdapGroupOverlay
        loadData={loadData}
        isMounted={isMounted}
        orgDomain={orgDomain}
        existingGroupNames={existingGroupNames}
      />
    );
  };
  
  const onRowSelect = (rowData, type) => {
    history.push(`/settings/${orgDomain}/groups/details/${rowData.original.name}`);
  };

  const getGroupsTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={groupData}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={LdapUserGroupRoleHelper.canCreateGroup(userData) === true ? createGroup : undefined}
      isLoading={isLoading}
      body={getGroupsTable()}
      titleIcon={faUserFriends}
      title={"Groups"}
      type={"Group"}
      className={className}
    />
  );
}

LdapGroupsTable.propTypes = {
  groupData: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  existingGroupNames: PropTypes.array,
  className: PropTypes.string,
  isMounted: PropTypes.object,
};

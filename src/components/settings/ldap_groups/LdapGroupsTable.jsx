import React, {useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateLdapGroupOverlay from "components/settings/ldap_groups/CreateLdapGroupOverlay";

function LdapGroupsTable(
  {
    groupData,
    orgDomain,
    isLoading,
    loadData,
    currentUserEmail,
    existingGroupNames,
    className,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const fields = ldapGroupMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "externalSyncGroup")),
      getTableTextColumn(getField(fields, "memberCount")),
      getTableBooleanIconColumn(getField(fields, "isSync"))
    ],
    []
  );

  const createGroup = () => {
    toastContext.showOverlayPanel(
      <CreateLdapGroupOverlay
        loadData={loadData}
        isMounted={isMounted}
        orgDomain={orgDomain}
        currentUserEmail={currentUserEmail}
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
        className={"no-table-border"}
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
      addRecordFunction={createGroup}
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
  currentUserEmail: PropTypes.string,
  existingGroupNames: PropTypes.array,
  className: PropTypes.string,
  isMounted: PropTypes.object,
};

export default LdapGroupsTable;
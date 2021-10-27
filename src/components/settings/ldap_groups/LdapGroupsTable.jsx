import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import NewLdapGroupModal from "components/settings/ldap_groups/NewLdapGroupOverlay";
import {
  getCountColumnWithoutField,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";

function LdapGroupsTable(
  {
    groupData,
    orgDomain,
    isLoading,
    authorizedActions,
    loadData,
    currentUserEmail,
    useMembers,
    existingGroupNames,
    className,
  }) {
  let fields = ldapGroupMetaData.fields;
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const history = useHistory();

  // TODO: This should be static
  const getDynamicColumn = () => {
    if (useMembers) {
      return (getCountColumnWithoutField("Members", "members"));
    }

    return getTableTextColumn(getField(fields, "memberCount"));
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "externalSyncGroup")),
      getDynamicColumn(),
      getTableBooleanIconColumn(getField(fields, "isSync"))
    ],
    []
  );

  const createGroup = () => {
    setShowCreateGroupModal(true);
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
    <div className={className}>
      <FilterContainer
        loadData={loadData}
        addRecordFunction={!useMembers && authorizedActions ? createGroup : undefined}
        isLoading={isLoading}
        body={getGroupsTable()}
        titleIcon={faUserFriends}
        title={"Groups"}
        type={"Group"}
      />
      <NewLdapGroupModal
        loadData={loadData}
        authorizedActions={authorizedActions}
        orgDomain={orgDomain}
        showModal={showCreateGroupModal}
        currentUserEmail={currentUserEmail}
        setShowModal={setShowCreateGroupModal}
        existingGroupNames={existingGroupNames}
      />
    </div>
  );
}

LdapGroupsTable.propTypes = {
  groupData: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUserEmail: PropTypes.string,
  useMembers: PropTypes.bool,
  existingGroupNames: PropTypes.array,
  className: PropTypes.string,
};

export default LdapGroupsTable;
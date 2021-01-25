import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapGroupMetaData} from "./ldap-groups-metadata";
import NewLdapGroupModal from "components/settings/ldap_groups/NewLdapGroupModal";
import {
  getCountColumnWithoutField,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";

function LdapGroupsTable({ groupData, orgDomain, isLoading, authorizedActions, loadData, currentUserEmail }) {
  let fields = ldapGroupMetaData.fields;
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "externalSyncGroup"})),
      getTableTextColumn(fields.find(field => { return field.id === "groupType"})),
      getCountColumnWithoutField("Members", "members"),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "isSync"}))
    ],
    []
  );

  const createGroup = () => {
    setShowCreateGroupModal(true);
  };
  
  const onRowSelect = (rowData, type) => {
    history.push(`/settings/${orgDomain}/groups/details/${rowData.original.name}`);
  };

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={groupData}
        columns={columns}
        tableTitle={"Groups"}
        type={"Group"}
        createNewRecord={createGroup}
      />
      <NewLdapGroupModal
        loadData={loadData}
        authorizedActions={authorizedActions}
        orgDomain={orgDomain}
        showModal={showCreateGroupModal}
        currentUserEmail={currentUserEmail}
        setShowModal={setShowCreateGroupModal}
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
  currentUserEmail: PropTypes.string
};

export default LdapGroupsTable;
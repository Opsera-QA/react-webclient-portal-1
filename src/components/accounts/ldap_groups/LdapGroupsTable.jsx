import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import { useHistory } from "react-router-dom";
import ldapGroupFormFields from "./ldap-groups-form-fields";
import {
  getTableArrayCountColumn,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";

function LdapGroupsTable({ groupData, orgDomain }) {
  let fields = ldapGroupFormFields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.name),
      getTableTextColumn(fields.externalSyncGroup),
      getTableArrayCountColumn(fields.members),
      getTableBooleanIconColumn(fields.isSync)
    ],
    []
  );
  
  const onRowSelect = (rowData, type) => {
    history.push(`/accounts/${orgDomain}/groups/details/${rowData.original.name}`);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable tableStyleName="custom-table-2" onRowSelect={onRowSelect} data={groupData} columns={columns} />
      </div>
    </>
  );
}

LdapGroupsTable.propTypes = {
  groupData: PropTypes.array,
  orgDomain: PropTypes.string
};

export default LdapGroupsTable;
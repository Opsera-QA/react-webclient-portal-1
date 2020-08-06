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

function LdapGroupsTable({ data, domain }) {
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
    history.push(`/accounts/groups/${domain}/${rowData.original.name}`);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable tableStyleName="custom-table-2" onRowSelect={onRowSelect} data={data} columns={columns} />
      </div>
    </>
  );
}

LdapGroupsTable.propTypes = {
  data: PropTypes.array,
  domain: PropTypes.string
};

export default LdapGroupsTable;
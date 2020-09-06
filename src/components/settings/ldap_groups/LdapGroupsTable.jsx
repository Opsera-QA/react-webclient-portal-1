import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapGroupMetaData} from "./ldap-groups-metadata";
import {
  getCountColumnWithoutField,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";

function LdapGroupsTable({ groupData, orgDomain, isLoading }) {
  let fields = ldapGroupMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "externalSyncGroup"})),
      getTableTextColumn(fields.find(field => { return field.id === "groupType"})),
      // TODO: Determine the best way to keep fields that shouldn't be included in regular metadata?
      //  Maybe we have an extraFields parameter
      getCountColumnWithoutField("Members", "members"),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "isSync"}))
    ],
    []
  );
  
  const onRowSelect = (rowData, type) => {
    history.push(`/settings/${orgDomain}/groups/details/${rowData.original.name}`);
  };

  return (
    <>
      <div className="table-content-block">
        <CustomTable tableStyleName="custom-table-2" isLoading={isLoading} onRowSelect={onRowSelect} data={groupData} columns={columns} />
      </div>
    </>
  );
}

LdapGroupsTable.propTypes = {
  groupData: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool
};

export default LdapGroupsTable;
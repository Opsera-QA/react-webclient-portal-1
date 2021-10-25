import React, { useMemo } from "react";
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
import {faServer} from "@fortawesome/pro-light-svg-icons";

function SiteRolesTable({ groupData, orgDomain, isLoading, loadData }) {
  let fields = ldapGroupMetaData.fields;
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

  const onRowSelect = (rowData) => {
    history.push(`/settings/${orgDomain}/site-roles/details/${rowData.original.name}`);
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
      isLoading={isLoading}
      body={getGroupsTable()}
      titleIcon={faServer}
      title={"Site Roles"}
      className={"px-2 pb-2"}
    />
  );
}

SiteRolesTable.propTypes = {
  groupData: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUserEmail: PropTypes.string,
  useMembers: PropTypes.bool,
  existingGroupNames: PropTypes.array
};

export default SiteRolesTable;
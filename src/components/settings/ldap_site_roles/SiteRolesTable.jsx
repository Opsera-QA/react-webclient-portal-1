import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faServer} from "@fortawesome/pro-light-svg-icons";
import ldapSiteRoleMetadata from "@opsera/definitions/constants/accounts/groups/role/ldapSiteRoles.metadata";

export default function SiteRolesTable({ siteRoles, orgDomain, isLoading, loadData, className }) {
  const history = useHistory();
  const fields = ldapSiteRoleMetadata.fields;

  const columns = useMemo(
    () => [
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "name"), handleNameFormatting),
      getTableTextColumn(getField(fields, "memberCount")),
    ],
    [fields]
  );

  const handleNameFormatting = (name) => {
    if (name === "PowerUsers") {
      return "Power Users";
    }

    return name;
  };

  const onRowSelect = (rowData) => {
    history.push(`/settings/${orgDomain}/site-roles/details/${rowData.original.name}`);
  };

  const getGroupsTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={siteRoles}
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
      className={className}
    />
  );
}

SiteRolesTable.propTypes = {
  siteRoles: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  className: PropTypes.string,
};
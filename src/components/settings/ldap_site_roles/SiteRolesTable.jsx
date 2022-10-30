import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getTableBooleanIconColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faServer} from "@fortawesome/pro-light-svg-icons";

function SiteRolesTable({ siteRoles, isMounted, siteRoleMetadata, orgDomain, isLoading, loadData, className }) {
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(siteRoleMetadata);
  }, [JSON.stringify(siteRoleMetadata)]);

  const handleNameFormatting = (name) => {
    if (name === "PowerUsers") {
      return "Power Users";
    }

    return name;
  };

  const loadColumnMetadata = (metadata) => {
    if (isMounted?.current === true && metadata?.fields) {
      const fields = metadata.fields;

      setColumns(
        [
          getFormattedLabelWithFunctionColumnDefinition(getField(fields, "name"), handleNameFormatting),
          getTableTextColumn(getField(fields, "memberCount")),
        ]
      );
    }
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
  siteRoleMetadata: PropTypes.object,
  isMounted: PropTypes.object,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  className: PropTypes.string,
};

export default SiteRolesTable;
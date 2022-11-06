import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getGroupRoleLevelColumnDefinition,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import scriptsLibraryMetadata from "@opsera/definitions/constants/registry/script_library/scriptsLibrary.metadata";

export default function LdapGroupAssignedRolesScriptsTable(
  {
    group,
    scripts,
    isLoading,
  }) {
  const fields = scriptsLibraryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
      getGroupRoleLevelColumnDefinition(group),
    ],
    [fields],
  );

  return (
    <CustomTable
      isLoading={isLoading}
      data={scripts}
      columns={columns}
    />
  );
}

LdapGroupAssignedRolesScriptsTable.propTypes = {
  scripts: PropTypes.array,
  isLoading: PropTypes.bool,
  group: PropTypes.string,
};
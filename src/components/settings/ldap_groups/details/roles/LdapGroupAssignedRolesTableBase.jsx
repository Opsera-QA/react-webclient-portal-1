import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";

export default function LdapGroupAssignedRolesTableBase(
  {
    items,
    isLoading,
    onRowSelectFunction,
  }) {
  const fields = registryToolMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
    ],
    [fields],
  );

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelectFunction}
      data={items}
      columns={columns}
    />
  );
}

LdapGroupAssignedRolesTableBase.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  onRowSelectFunction: PropTypes.func,
};
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import customParametersMetadata
  from "@opsera/definitions/constants/registry/custom_parameters/customParameters.metadata";

export default function LdapGroupAssignedRolesParametersTable(
  {
    parameters,
    isLoading,
  }) {
  const fields = customParametersMetadata.fields;

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
      data={parameters}
      columns={columns}
    />
  );
}

LdapGroupAssignedRolesParametersTable.propTypes = {
  parameters: PropTypes.array,
  isLoading: PropTypes.bool,
};
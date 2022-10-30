import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import { toolHelper } from "components/inventory/tools/tool.helper";
import { useHistory } from "react-router-dom";

export default function LdapGroupAssignedRolesToolsTable(
  {
    tools,
    isLoading,
  }) {
  const history = useHistory();
  const fields = registryToolMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
    ],
    [fields],
  );

  const onRowSelectFunction = (row, data) => {
    history.push(toolHelper.getDetailViewLink(data?._id));
  };

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelectFunction}
      data={tools}
      columns={columns}
    />
  );
}

LdapGroupAssignedRolesToolsTable.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
};
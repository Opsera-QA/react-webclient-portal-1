import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";

export default function FreeTrialWorkspaceRegistryTable(
  {
    tools,
    loadData,
    isLoading,
    rowClickFunction,
  }) {
  const fields = registryToolMetadata.fields;
  const history = useHistory();
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "tool_identifier"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "_id")),
      getTableDateColumn(getField(fields, "createdAt")),
    ],
    [fields]
  );

  // TODO: This is temporary until I finish the tool info overlay
  const onRowSelect = (rowData) => {
    if (rowClickFunction) {
      rowClickFunction(rowData?.original);
    }
    else {
      history.push(`/inventory/tools/details/${rowData.original._id}`);
    }
  };

  return (
    <CustomTable
      columns={columns}
      data={tools}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      loadData={loadData}
    />
  );
}

FreeTrialWorkspaceRegistryTable.propTypes = {
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolMetadata: PropTypes.object,
  rowClickFunction: PropTypes.func,
};
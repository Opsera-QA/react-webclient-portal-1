import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import {workspaceHelper} from "components/workspace/workspace.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function WorkspaceRegistryTable(
  {
    tools,
    loadData,
    isLoading,
  }) {
  const fields = registryToolMetadata.fields;
  const history = useHistory();
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "tool_identifier"), "no-wrap-inline"),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    [fields]
  );

  const onRowSelect = (rowData) => {
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(rowData?.original);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
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

WorkspaceRegistryTable.propTypes = {
  tools: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getLimitedTableTextColumn,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import { toolHelper } from "components/inventory/tools/tool.helper";

function ToolsTable({ data, toolFilterDto, setToolFilterDto, loadData, isLoading, rowClickFunction, }) {
  const history = useHistory();
  const fields = registryToolMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
      getTableTextColumn(getField(fields, "tool_identifier"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "owner_name"), "no-wrap-inline"),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  // TODO: This is temporary until I finish the tool info overlay
  const onRowSelect = (rowData) => {
    if (rowClickFunction) {
      rowClickFunction(rowData?.original);
    }
    else {
      history.push(toolHelper.getDetailViewLink(rowData?.original?._id));
    }
  };

  return (
    <CustomTable
      nextGeneration={true}
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      paginationDto={toolFilterDto}
      setPaginationDto={setToolFilterDto}
      rowStyling={rowStyling}
      loadData={loadData}
    />
  );
}

ToolsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  rowClickFunction: PropTypes.func,
};

export default ToolsTable;
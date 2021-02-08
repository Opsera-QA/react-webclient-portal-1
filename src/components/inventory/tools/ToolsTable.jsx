import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import toolMetadata from "components/inventory/tools/tool-metadata";
import {getField} from "components/common/metadata/metadata-helpers";

function ToolsTable({ data, toolFilterDto, setToolFilterDto, loadData, isLoading }) {
  let history = useHistory();
  const fields = toolMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "tool_identifier"), "no-wrap-inline"),
      getTableTextColumn(getField(fields, "owner_name"), "no-wrap-inline"),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableBooleanIconColumn(getField(fields, "active")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${rowData.original._id}`);
  };

  return (
    <CustomTable
      className="table-no-border"
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
};

export default ToolsTable;
import React, {useEffect, useState} from "react";
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

function ToolsTable({ data, toolMetadata, isMounted, toolFilterDto, setToolFilterDto, loadData, isLoading, rowClickFunction, }) {
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(toolMetadata);
  }, [JSON.stringify(toolMetadata)]);

  const loadColumnMetadata = (newToolMetadata) => {
    if (isMounted?.current === true && newToolMetadata?.fields) {
      const fields = newToolMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
          getLimitedTableTextColumn(getField(fields, "description"), 100),
          getTableTextColumn(getField(fields, "tool_identifier"), "no-wrap-inline"),
          getTableTextColumn(getField(fields, "owner_name"), "no-wrap-inline"),
          getTableDateColumn(getField(fields, "createdAt")),
          getTableBooleanIconColumn(getField(fields, "active")),
        ]
      );
    }
  };

  // TODO: This is temporary until I finish the tool info overlay
  const onRowSelect = (rowData) => {
    if (rowClickFunction) {
      rowClickFunction(rowData?.original);
    }
    else {
      history.push(`/inventory/tools/details/${rowData.original._id}`);
    }
  };

  if (toolMetadata == null) {
    return null;
  }

  return (
    <CustomTable
      nextGeneration={true}
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
  toolMetadata: PropTypes.object,
  isMounted: PropTypes.object,
  rowClickFunction: PropTypes.func,
};

export default ToolsTable;
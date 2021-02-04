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
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function ToolsTable({ data, toolFilterDto, setToolFilterDto, loadData, isLoading }) {
  let history = useHistory();
  const fields = toolMetadata.fields;

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
      getTableTextColumn(getField(fields, "tool_identifier")),
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
      columns={columns}
      data={data}
      isLoading={isLoading}
      onRowSelect={onRowSelect}
      paginationDto={toolFilterDto}
      setPaginationDto={setToolFilterDto}
      rowStyling={rowStyling}
      loadData={loadData}
      tableTitle={"Tools"}
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
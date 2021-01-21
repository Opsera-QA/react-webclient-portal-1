import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import toolCountsMetadata from "components/reports/tools/counts/tool-counts-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";

function ToolCountTable({ data, isLoading }) {
  let fields = toolCountsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "_id"})),
      getTableTextColumn(fields.find(field => { return field.id === "count"})),
    ],
    []
  );

  const rowStyling = (row) => {
    return row["count"] === 0 ? " inactive-row" : "";
  };

  return (
    <CustomTable
      columns={columns}
      data={data}
      rowStyling={rowStyling}
      isLoading={isLoading}
      tableTitle={"Tool Counts"}
      type={"Tool Counts"}
    />
  );
}

ToolCountTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default ToolCountTable;
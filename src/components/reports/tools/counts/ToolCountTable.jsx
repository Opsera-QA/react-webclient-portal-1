import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import toolCountsMetadata from "components/reports/tools/counts/tool-counts-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faSitemap, faTally} from "@fortawesome/pro-light-svg-icons";

function ToolCountTable({ data, isLoading, loadData }) {
  let fields = toolCountsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "_id";})),
      getTableTextColumn(fields.find(field => { return field.id === "count";})),
    ],
    []
  );

  const rowStyling = (row) => {
    return row["count"] === 0 ? " inactive-row" : "";
  };

  const getToolCountsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        isLoading={isLoading}
        body={getToolCountsTable()}
        titleIcon={faTally}
        title={"Tool Counts"}
      />
    </div>
  );
}

ToolCountTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func
};

export default ToolCountTable;
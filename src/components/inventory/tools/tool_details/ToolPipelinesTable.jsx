import React, {useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getTableDateColumn} from "../../../common/table/table-column-helpers";

function ToolPipelinesTable({ data, isLoading }) {
  const fields = pipelineSummaryMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "_id"})),
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
    ],
    []
  );

  return (
    <div className="p-2">
      <CustomTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        noDataMessage={"This tool is not used by any pipelines."}
      />
    </div>
  );
}

ToolPipelinesTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ToolPipelinesTable;
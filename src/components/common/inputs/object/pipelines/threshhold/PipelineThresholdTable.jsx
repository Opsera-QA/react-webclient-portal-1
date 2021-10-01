import React, {useMemo} from "react";
import PropTypes from "prop-types";
import TableBase from "components/common/table/TableBase";
import {
  getPipelineThresholdLevelColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import pipelineThresholdMetadata
  from "components/common/inputs/object/pipelines/threshhold/pipeline-threshold-metadata";

function PipelineThresholdTable({ thresholdRows, isLoading }) {
  let fields = pipelineThresholdMetadata.fields;

  const columns = useMemo(
    () => [
      getPipelineThresholdLevelColumn(getField(fields, "level"), "upper-case-first"),
      getTableTextColumn(getField(fields, "count")),
    ],
    []
  );

  if (thresholdRows == null) {
    return <></>;
  }

  return (
    <TableBase
      columns={columns}
      data={thresholdRows}
      isLoading={isLoading}
      noDataMessage={"No Threshold rows have been added yet."}
      height={"250px"}
    />
  );
}

PipelineThresholdTable.propTypes = {
  thresholdRows: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default PipelineThresholdTable;
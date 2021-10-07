import React, {useMemo} from "react";
import PropTypes from "prop-types";
import TableBase from "components/common/table/TableBase";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import pipelineThresholdMetadata
  from "components/common/inputs/object/pipelines/threshhold/pipeline-threshold-metadata";

function OctopusTenantConfigurationTable({ thresholdRows, isLoading }) {
  let fields = pipelineThresholdMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "id")),
      getTableTextColumn(getField(fields, "environmentId")),
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

OctopusTenantConfigurationTable.propTypes = {
  thresholdRows: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default OctopusTenantConfigurationTable;
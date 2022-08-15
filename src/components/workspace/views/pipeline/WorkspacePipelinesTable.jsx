import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getCustomTablePipelineStateColumnDefinition,
  getPipelineTypeColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";

export default function WorkspacePipelinesTable({ pipelines, isLoading, paginationModel, setPaginationModel, loadData, onRowClickFunction, }) {
  const fields = pipelineMetadata.fields;

  const columns = useMemo(
    () => [
      getPipelineTypeColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "_id")),
      getCustomTablePipelineStateColumnDefinition(getField(fields, "state")),
      getTableTextColumn(getField(fields, "workflow.run_count")),
      getTableDateTimeColumn(getField(fields, "workflow.last_run.completed")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
    ],
    [],
  );

  return (
    <CustomTable
      nextGeneration={true}
      columns={columns}
      onRowSelect={onRowClickFunction}
      paginationDto={paginationModel}
      loadData={loadData}
      setPaginationDto={setPaginationModel}
      data={pipelines}
      isLoading={isLoading}
    />
  );
}

WorkspacePipelinesTable.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  onRowClickFunction: PropTypes.func,
};
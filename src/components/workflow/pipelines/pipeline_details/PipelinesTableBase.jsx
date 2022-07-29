import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getCustomTablePipelineStateColumnDefinition,
  getPipelineTypeColumn,
  getTableDateColumn, getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import pipelineMetadata from "./pipeline-metadata";
import { getField } from "components/common/metadata/metadata-helpers";

function PipelinesTableBase({ pipelines, isLoading, paginationModel, setPaginationModel, loadData, onRowClickFunction, }) {
  const fields = pipelineMetadata.fields;

  const columns = useMemo(
    () => [
      getPipelineTypeColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "owner_name")),
      getCustomTablePipelineStateColumnDefinition(getField(fields, "state")),
      getTableTextColumn(getField(fields, "workflow.run_count")),
      getTableDateTimeColumn(getField(fields, "workflow.last_run.completed")),
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

PipelinesTableBase.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  onRowClickFunction: PropTypes.func,
};

export default PipelinesTableBase;
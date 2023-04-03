import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getCustomTablePipelineStateColumnDefinition, getOwnerNameField,
  getPipelineTypeColumn, getTableBooleanIconColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { pipelineHelper } from "components/workflow/pipeline.helper";
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WorkspacePipelinesTable(
  {
    pipelines,
    isLoading,
    paginationModel,
    setPaginationModel,
    loadData,
  }) {
  const history = useHistory();
  const fields = pipelineMetadata.fields;
  const { isSaasUser } = useComponentStateReference();

  const columns = useMemo(
    () => {
      const columnsArray = [];

      columnsArray.push(
        getPipelineTypeColumn(getField(fields, "type")),
        getTableTextColumn(getField(fields, "name")),
      );

      if (isSaasUser === false) {
        columnsArray.push(getOwnerNameField());
      }

      columnsArray.push(
        getCustomTablePipelineStateColumnDefinition(getField(fields, "state")),
        getTableTextColumn(getField(fields, "workflow.run_count")),
        getTableDateTimeColumn(getField(fields, "workflow.last_run.completed")),
        getTableDateTimeColumn(getField(fields, "createdAt")),
        getTableBooleanIconColumn(getField(fields, "active")),
      );

      return columnsArray;
    },
    [fields, isSaasUser],
  );

  const onRowClickFunction = (row) => {
    history.push(pipelineHelper.getDetailViewLink(row?.original?._id));
  };

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
};
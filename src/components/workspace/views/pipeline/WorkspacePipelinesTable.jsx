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
import { useHistory } from "react-router-dom";
import useComponentStateReference from "hooks/useComponentStateReference";
import {workspaceHelper} from "components/workspace/workspace.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function WorkspacePipelinesTable(
  {
    pipelines,
    isLoading,
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
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(row?.original);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
    }
  };

  return (
    <CustomTable
      columns={columns}
      onRowSelect={onRowClickFunction}
      loadData={loadData}
      data={pipelines}
      isLoading={isLoading}
    />
  );
}

WorkspacePipelinesTable.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { workspaceItemMetadata } from "components/workspace/workspaceItem.metadata";

export default function WorkspaceItemTable({ pipelines, isLoading, paginationModel, setPaginationModel, loadData, onRowClickFunction, }) {
  const fields = workspaceItemMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "workspaceType")),
      getTableTextColumn(getField(fields, "name")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
      getTableTextColumn(getField(fields, "_id")),
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

WorkspaceItemTable.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
  onRowClickFunction: PropTypes.func,
};
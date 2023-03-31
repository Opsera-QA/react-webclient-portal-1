import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn, getUserObjectRoleLevelColumnDefinition,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { pipelineHelper } from "components/workflow/pipeline.helper";
import { useHistory } from "react-router-dom";

export default function UserAssignedRolesPipelinesTable(
  {
    userEmailAddress,
    pipelines,
    isLoading,
  }) {
  const history = useHistory();
  const fields = pipelineMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getUserObjectRoleLevelColumnDefinition(userEmailAddress),
    ],
    [fields],
  );

  const onRowSelectFunction = (row, data) => {
    history.push(pipelineHelper.getDetailViewLink(data?._id));
  };

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelectFunction}
      data={pipelines}
      columns={columns}
    />
  );
}

UserAssignedRolesPipelinesTable.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  userEmailAddress: PropTypes.string,
};
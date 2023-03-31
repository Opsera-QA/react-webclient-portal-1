import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableTextColumn, getUserObjectRoleLevelColumnDefinition,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import { useHistory } from "react-router-dom";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";
import pipelineInstructionsMetadata
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructions.metadata";

export default function UserAssignedRolesPipelineInstructionsTable(
  {
    userEmailAddress,
    pipelineInstructions,
    isLoading,
  }) {
  const history = useHistory();
  const fields = pipelineInstructionsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getUserObjectRoleLevelColumnDefinition(userEmailAddress),
    ],
    [fields],
  );

  const onRowSelectFunction = (row, data) => {
    history.push(pipelineInstructionsHelper.getDetailViewLink(data?._id));
  };

  return (
    <CustomTable
      isLoading={isLoading}
      onRowSelect={onRowSelectFunction}
      data={pipelineInstructions}
      columns={columns}
    />
  );
}

UserAssignedRolesPipelineInstructionsTable.propTypes = {
  pipelineInstructions: PropTypes.array,
  isLoading: PropTypes.bool,
  userEmailAddress: PropTypes.string,
};
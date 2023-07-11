import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { getGroupRoleLevelColumnDefinition, getTableTextColumn } from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import { useHistory } from "react-router-dom";
import {pipelineInstructionsHelper} from "components/workflow/instructions/pipelineInstructions.helper";
import pipelineInstructionsMetadata from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructions.metadata";

export default function LdapGroupAssignedRolesPipelineInstructionsTable(
  {
    group,
    pipelineInstructions,
    isLoading,
  }) {
  const history = useHistory();
  const fields = pipelineInstructionsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name"), "no-wrap-inline"),
      getGroupRoleLevelColumnDefinition(group),
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

LdapGroupAssignedRolesPipelineInstructionsTable.propTypes = {
  pipelineInstructions: PropTypes.array,
  isLoading: PropTypes.bool,
  group: PropTypes.string,
};
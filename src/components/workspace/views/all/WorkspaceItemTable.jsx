import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getFormattedLabelWithFunctionColumnDefinition, getOwnerNameField, getTableBooleanIconColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { workspaceItemMetadata } from "components/workspace/workspaceItem.metadata";
import { workspaceHelper } from "components/workspace/workspace.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { useHistory } from "react-router-dom";
import { workspaceConstants } from "components/workspace/workspace.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WorkspaceItemTable(
  {
    workspaceItems,
    isLoading,
    paginationModel,
    setPaginationModel,
    loadData,
  }) {
  const history = useHistory();
  const fields = workspaceItemMetadata.fields;
  const {isFreeTrial, isSaasUser} = useComponentStateReference();
  const columns = useMemo(
    () => {
      const columns = [
        getFormattedLabelWithFunctionColumnDefinition(getField(fields, "workspaceType"), workspaceConstants.getLabelForWorkspaceType),
        getTableTextColumn(getField(fields, "name")),
        getTableDateTimeColumn(getField(fields, "createdAt")),
      ];

      if (isFreeTrial === true) {
        columns.push(
          getFormattedLabelWithFunctionColumnDefinition(
            getField(fields, "templateIdentifier"),
            workspaceConstants.getIdentifierLabelForWorkspaceItem,
            undefined,
            true
          ),
        );
      }

      if (isSaasUser === false) {
        columns.push(getOwnerNameField());
        columns.push(getTableBooleanIconColumn(getField(fields, "active")));
      }

      return columns;

    },
    [],
  );

  const onRowClickFunction = (workspaceItem) => {
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(workspaceItem);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
    }
  };

  return (
    <CustomTable
      nextGeneration={true}
      columns={columns}
      onRowSelect={(row) => onRowClickFunction(row?.original)}
      paginationDto={paginationModel}
      loadData={loadData}
      setPaginationDto={setPaginationModel}
      data={workspaceItems}
      isLoading={isLoading}
    />
  );
}

WorkspaceItemTable.propTypes = {
  workspaceItems: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadData: PropTypes.func,
};
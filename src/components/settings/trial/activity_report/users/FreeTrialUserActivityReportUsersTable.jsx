import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getCustomTablePipelineStateColumnDefinition,
  getFormattedLabelWithFunctionColumnDefinition, getSsoUserNameField, getTableBooleanIconColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer, {
} from "components/common/table/FilterContainer";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import { workspaceHelper } from "components/workspace/workspace.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import {
  freeTrialUserActivityReportUserMetadata
} from "components/settings/trial/activity_report/users/freeTrialUserActivityReportUser.metadata";

export default function FreeTrialUserActivityReportUsersTable(
  {
    freeTrialUsers,
    loadData,
    isLoading,
  }) {
  const fields = freeTrialUserActivityReportUserMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getSsoUserNameField(),
      getTableTextColumn(getField(fields, "email")),
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "toolCount")),
      getTableTextColumn(getField(fields, "workflowCount")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
      getTableDateTimeColumn(getField(fields, "updatedAt")),
      getTableBooleanIconColumn(getField(fields, "expired")),
    ],
    [fields]
  );

  const onRowSelect = (row) => {
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(row?.original);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
    }
  };

  const getTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={freeTrialUsers}
        columns={columns}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getTable()}
      titleIcon={faUsers}
      title={"Free Trial Users"}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialUserActivityReportUsersTable.propTypes = {
  freeTrialUsers: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

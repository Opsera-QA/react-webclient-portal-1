import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getCustomTablePipelineStateColumnDefinition,
  getFormattedLabelWithFunctionColumnDefinition,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer, {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION,
} from "components/common/table/FilterContainer";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import { workspaceHelper } from "components/workspace/workspace.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import {
  freeTrialUserActivityReportMetadata
} from "components/settings/trial/activity_report/freeTrialUserActivityReport.metadata";
import { workspaceConstants } from "components/workspace/workspace.constants";
import InlinePlatformSsoUserFilterSelectInput
  from "components/common/list_of_values_input/users/sso/platform/InlinePlatformSsoUserFilterSelectInput";

export default function FreeTrialUserActivityReportWorkflowsTable(
  {
    activityReportWorkflows,
    activityReportFilterModel,
    setActivityReportFilterModel,
    loadData,
    isLoading,
  }) {
  let fields = freeTrialUserActivityReportMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "owner_email")),
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "workspaceType"),
        workspaceConstants.getLabelForWorkspaceType,
      ),
      getTableTextColumn(getField(fields, "run_count")),
      getTableDateTimeColumn(getField(fields, "firstRunDate")),
      getTableDateTimeColumn(getField(fields, "lastRunDate")),
      getCustomTablePipelineStateColumnDefinition(getField(fields, "lastRunStatus")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = (row) => {
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(row?.original);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
    }
  };

  const getInlineFilters = () => {
    return (
      <div className={"d-flex"}>
        <InlinePlatformSsoUserFilterSelectInput
          filterModel={activityReportFilterModel}
          fieldName={"userId"}
          loadDataFunction={loadData}
          className={"mr-2"}
        />
      </div>
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={activityReportWorkflows}
        columns={columns}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      inlineFilters={getInlineFilters()}
      filterDto={activityReportFilterModel}
      setFilterDto={setActivityReportFilterModel}
      body={getTable()}
      supportSearch={true}
      titleIcon={faUsers}
      title={"Free Trial Users"}
      minimumHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialUserActivityReportWorkflowsTable.propTypes = {
  activityReportWorkflows: PropTypes.array,
  activityReportFilterModel: PropTypes.object,
  setActivityReportFilterModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

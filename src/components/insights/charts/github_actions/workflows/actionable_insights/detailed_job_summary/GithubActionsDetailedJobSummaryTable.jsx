import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  githubActionsDetailedJobSummaryMetadata,
} from "components/insights/charts/github_actions/workflows/actionable_insights/detailed_job_summary/githubActionsDetailedJobSummary.metadata";
import CustomTable from "components/common/table/CustomTable";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionsWorkflowReportButton
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionWorkflowReportButton";
import ExportGithubActionsWorkflowReportActionableInsights1Panel
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import GithubActionsWorkflowWarningMessage
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowWarningMessage";

function GithubActionsDetailedJobSummaryTable(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
    stats,
  }) {
  const noDataMessage = "No data available";
  const fields = githubActionsDetailedJobSummaryMetadata.fields;
  const [showExportPanel, setShowExportPanel] = useState(false);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jobName")),
      getTableTextColumn(getField(fields, "jobs")),
      getTableTextColumn(getField(fields, "jobsSuccess")),
      getTableTextColumn(getField(fields, "jobsFailures")),
      getTableTextColumn(getField(fields, "skipped")),
      getTableTextColumn(getField(fields, "canceled")),
      getTableTextColumn(getField(fields, "successPercentage")),
      getTableTextColumn(getField(fields, "failedPercentage")),
      getTableTextColumn(getField(fields, "skippedPercentage")),
      getTableTextColumn(getField(fields, "canceledPercentage")),
      getTableTextColumn(getField(fields, "successTime")),
      getTableTextColumn(getField(fields, "failedTime")),
    ],
    [],
  );

  const getTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportGithubActionsWorkflowReportActionableInsights1Panel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          githubActionData={data}
        />
      );
    }

    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <div className={"mx-3"}>
      <div className={"p-2"}>
        <div className={"d-flex details-title-text"}>
          <div className={"mr-4"}>
            <b>Most Skipped Steps:</b> {stats?.mostSkipped}
          </div>
          <div className={"mr-4"}>
            <b>Most Failed Steps:</b> {stats?.mostFailed}
          </div>
          <div className={"mr-4"}>
            <b>Most Time Consuming Steps:</b> {stats?.mostTime}
          </div>
        </div>
      </div>
      <div>
        <FilterContainer
          body={getTable()}
          metadata={data}
          isLoading={isLoading}
          title={"Github Actions Workflow Step Summary"}
          titleIcon={faDraftingCompass}
          loadData={loadData}
          setFilterDto={setFilterModel}
          filterDto={filterModel}
          className={"pb-2"}
          supportSearch={true}
          exportButton={
            <ExportGithubActionsWorkflowReportButton
              className={"ml-2"}
              setShowExportPanel={setShowExportPanel}
              showExportPanel={showExportPanel}
            />
          }
        />
        <GithubActionsWorkflowWarningMessage />
      </div>
    </div>
  );
}

GithubActionsDetailedJobSummaryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  stats: PropTypes.object,
};

export default GithubActionsDetailedJobSummaryTable;
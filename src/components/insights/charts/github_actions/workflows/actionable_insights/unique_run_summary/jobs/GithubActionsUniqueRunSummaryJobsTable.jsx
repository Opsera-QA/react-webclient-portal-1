import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getStaticIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionsWorkflowReportActionableInsights1Panel
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "components/insights/charts/github_actions/workflows/export/ExportGithubActionWorkflowReportButton";
import {githubActionsUniqueRunJobsSummaryMetadata} from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/jobs/githubActionsUniqueRunJobsSummary.metadata";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import GithubActionsWorkflowWarningMessage
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowWarningMessage";

function GithubActionsUniqueRunSummaryJobsTable(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
    stats,
    setCurrentScreen,
    setSelectedJobName,
  }) {
  const noDataMessage = "No data available";
  const fields = githubActionsUniqueRunJobsSummaryMetadata.fields;
  const [showExportPanel, setShowExportPanel] = useState(false);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jobName")),
      getTableTextColumn(getField(fields, "runs")),
      getTableTextColumn(getField(fields, "success")),
      getTableTextColumn(getField(fields, "failures")),
      getTableTextColumn(getField(fields, "runsSkipped")),
      getTableTextColumn(getField(fields, "runsCanceled")),
      getTableTextColumn(getField(fields, "successPercentage")),
      getTableTextColumn(getField(fields, "failedPercentage")),
      getTableTextColumn(getField(fields, "skippedPercentage")),
      getTableTextColumn(getField(fields, "canceledPercentage")),
      getTableTextColumn(getField(fields, "successTime")),
      getTableTextColumn(getField(fields, "failedTime")),
      getStaticIconColumn(faExternalLink),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_STEP_SUMMARY);
    setSelectedJobName(rowData?.original?.jobName);
  };

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
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <div className={"mt-2"}>
      <div>
        <div className={"d-flex details-title-text"}>
          <div className={'mr-4'}>
            <b>Most Skipped Job:</b> {stats?.mostSkipped}
          </div>
          <div className={'mr-4'}>
            <b>Most Failed Job:</b> {stats?.mostFailed}
          </div>
          <div className={'mr-4'}>
            <b>Most Time Consuming Job:</b> {stats?.mostTime}
          </div>
        </div>
      </div>
      <div>
        <FilterContainer
          body={getTable()}
          metadata={data}
          isLoading={isLoading}
          title={"Github Actions Workflow Job Summary"}
          titleIcon={faDraftingCompass}
          loadData={loadData}
          setFilterDto={setFilterModel}
          filterDto={filterModel}
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

GithubActionsUniqueRunSummaryJobsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  stats: PropTypes.object,
  setSelectedJobName: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

export default GithubActionsUniqueRunSummaryJobsTable;
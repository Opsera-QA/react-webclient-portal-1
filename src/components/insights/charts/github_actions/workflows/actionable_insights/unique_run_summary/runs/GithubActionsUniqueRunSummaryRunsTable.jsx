import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
    getExternalLinkIconColumnDefinition,
    getStaticIconColumn,
    getTableDateTimeColumn,
    getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionWorkflowReportActionableInsights4Panel
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionsWorkflowReportActionableInsights4Panel";
import ExportGithubActionsWorkflowReportButton from "components/insights/charts/github_actions/workflows/export/ExportGithubActionWorkflowReportButton";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import GithubActionsWorkflowWarningMessage
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowWarningMessage";
import {
  githubActionsUniqueRunRunsSummaryMetadata
} from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/runs/githubActionsUniqueRunRunsSummary.metadata";

function GithubActionsUniqueRunSummaryRunsTable(
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
  const fields = githubActionsUniqueRunRunsSummaryMetadata.fields;
  const [showExportPanel, setShowExportPanel] = useState(false);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "workflowRunId")),
      getTableTextColumn(getField(fields, "workflowName")),
      getTableDateTimeColumn(getField(fields, "workflowStartTime")),
      getTableDateTimeColumn(getField(fields, "workflowEndTime")),
      getTableTextColumn(getField(fields, "triggeredBy")),
      getTableTextColumn(getField(fields, "triggerEvent")),
      getTableTextColumn(getField(fields, "totalDuration")),
      getTableTextColumn(getField(fields, "conclusion")),
      getTableTextColumn(getField(fields, "numberOfRuns")),
      getExternalLinkIconColumnDefinition(getField(fields, "workflowURL")), // TODO: Make external link column
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
        <ExportGithubActionWorkflowReportActionableInsights4Panel
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
        // onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <div className={"mt-2"}>
      {/*<div>*/}
      {/*  <div className={"d-flex details-title-text"}>*/}
      {/*    <div className={'mr-4'}>*/}
      {/*      <b>Most Skipped Job:</b> {stats?.mostSkipped}*/}
      {/*    </div>*/}
      {/*    <div className={'mr-4'}>*/}
      {/*      <b>Most Failed Job:</b> {stats?.mostFailed}*/}
      {/*    </div>*/}
      {/*    <div className={'mr-4'}>*/}
      {/*      <b>Most Time Consuming Job:</b> {stats?.mostTime}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div>
        <FilterContainer
          body={getTable()}
          metadata={githubActionsUniqueRunRunsSummaryMetadata}
          isLoading={isLoading}
          title={"Github Actions Workflow Runs Summary"}
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

GithubActionsUniqueRunSummaryRunsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  stats: PropTypes.object,
  setSelectedJobName: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

export default GithubActionsUniqueRunSummaryRunsTable;
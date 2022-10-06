import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getStaticIconColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionsWorkflowReportActionableInsights1Panel
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "components/insights/charts/github_actions/workflows/export/ExportGithubActionWorkflowReportButton";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import GithubActionsWorkflowWarningMessage
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowWarningMessage";
import {
  githubActionsUniqueRunRunsSummaryMetadata
} from "components/insights/charts/github_actions/workflows/actionable_insights/unique_run_summary/runs/githubActionsUniqueRunRunsSummary.metadata";

const TEMP_DATA = [
  {
    "workflowRunId" : 526329,
    "workflowName" : "Build Main on 4x8 pilot",
    "workflowURL" : "https://github.aexp.com/amex-eng/cicd-msl/526329",
    "workflowStartTime" : "2022-10-05T14:06:40.000Z",
    "workflowEndTime" : "2022-10-05T14:07:16.559Z",
    "triggeredBy" : "Venkata Praveen Kumar Yarabothu",
    "triggerEvent" : "schedule",
    "totalDuration" : 0.35,
    "conclusion" : "success",
    "numberOfRuns" : 1.0
  },
  {
    "workflowRunId" : 515714,
    "workflowName" : "Auto TMS Subtree Update",
    "workflowURL" : "https://github.aexp.com/amex-eng/m1-msl/515714",
    "workflowStartTime" : "2022-10-03T14:00:36.000Z",
    "workflowEndTime" : "2022-10-03T14:01:22.211Z",
    "triggeredBy" : "Iulian Rosca",
    "triggerEvent" : "schedule",
    "totalDuration" : 0.45,
    "conclusion" : "success",
    "numberOfRuns" : 1.0
  },
  {
    "workflowRunId" : 509418,
    "workflowName" : "Build Pull Requests on 2x4 pilot",
    "workflowURL" : "https://github.aexp.com/amex-eng/cicd-msl/509418",
    "workflowStartTime" : "2022-10-01T20:43:04.000Z",
    "workflowEndTime" : "2022-10-01T20:44:07.784Z",
    "triggeredBy" : "Venkata Praveen Kumar Yarabothu",
    "triggerEvent" : "schedule",
    "totalDuration" : 1.16666666666667,
    "conclusion" : "success",
    "numberOfRuns" : 1.0
  },
  {
    "workflowRunId" : 473217,
    "workflowName" : "Release Branch Approval Check",
    "workflowURL" : "https://github.aexp.com/amex-eng/m1-msl/473217",
    "workflowStartTime" : "2022-09-20T14:04:31.000Z",
    "workflowEndTime" : "2022-09-20T14:04:35.069Z",
    "triggeredBy" : "Terry Lewis",
    "triggerEvent" : "pull_request_review",
    "totalDuration" : 0,
    "conclusion" : "skipped",
    "numberOfRuns" : 1.0
  },
  {
    "workflowRunId" : 495415,
    "workflowName" : "Build Pull Requests",
    "workflowURL" : "https://github.aexp.com/amex-eng/m1-msl/495415",
    "workflowStartTime" : "2022-09-28T17:36:22.000Z",
    "workflowEndTime" : "2022-09-28T17:38:40.676Z",
    "triggeredBy" : "smami14",
    "triggerEvent" : "pull_request",
    "totalDuration" : 0,
    "conclusion" : "cancelled",
    "numberOfRuns" : 1.0
  }
];

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
      getTableTextColumn(getField(fields, "workflowURL")), // TODO: Make external link column
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
        data={TEMP_DATA}
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
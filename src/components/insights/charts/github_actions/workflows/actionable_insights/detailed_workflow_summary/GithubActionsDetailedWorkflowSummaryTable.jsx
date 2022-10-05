import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getStaticIconColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionsWorkflowReportActionableInsights1Panel from "components/insights/charts/github_actions/workflows/export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "components/insights/charts/github_actions/workflows/export/ExportGithubActionWorkflowReportButton";
import {githubActionsWorkflowMetadata} from "components/insights/charts/github_actions/workflows/githubActionsWorkflow.metadata";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import { Col, Row } from "react-bootstrap";
import GithubActionsWorkflowWarningMessage
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowWarningMessage";

// TODO: Convert to cards
export default function GithubActionsDetailedWorkflowSummaryTable(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
    stats,
    setActionableInsight1DataObject,
    setCurrentScreen,
    workflowName,
  }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = githubActionsWorkflowMetadata.fields;
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "repoName")),
      getTableTextColumn(getField(fields, "branchName")),
      getTableTextColumn(getField(fields, "appName")),
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
    [],
  );

  const onRowSelect = (rowData) => {
    setActionableInsight1DataObject(rowData.original);
    setCurrentScreen(GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS.GITHUB_ACTIONS_WORKFLOW_JOB_SUMMARY);
  };

  const getTable = () => {
    return (
      <div>
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
      </div>
    );
  };

  const getBody = () => {
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
      <>
        <FilterContainer
          isLoading={isLoading}
          title={`${workflowName} Workflow Summary Details`}
          titleIcon={faDraftingCompass}
          body={getTable()}
          className={"px-2 pb-2"}
          loadData={loadData}
          setFilterDto={setFilterModel}
          filterDto={filterModel}
          exportButton={
            <ExportGithubActionsWorkflowReportButton
              className={"ml-2"}
              setShowExportPanel={setShowExportPanel}
              showExportPanel={showExportPanel}
            />
          }
        />
        <GithubActionsWorkflowWarningMessage />
      </>
    );
  };

  return (
    <div>
      <div className={"p-2"}>
        <div className={"d-flex details-title-text"}>
          <div className={'mr-4'}>
            <b>Repository With Most Failed Runs:</b> {stats?.mostFailed}
          </div>
          <div className={'mr-4'}>
            <b>Repositories With Most Time Consuming Runs:</b> {stats?.mostTime}
          </div>
        </div>
      </div>
      <div>
        {getBody()}
      </div>
    </div>
  );
}

GithubActionsDetailedWorkflowSummaryTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  dashboardFilters: PropTypes.any,
  stats: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
  workflowName: PropTypes.string,
};

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
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportGithubActionsWorkflowReportActionableInsights1Panel from "../../export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "../../export/ExportGithubActionWorkflowReportButton";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import GithubActionsWorkflowActionableInsights2 from "../ActionableInsights2/GithubActionsWorkflowActionableInsights2";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsightOverlay";

// TODO: Convert to cards
function GitlabActionsWorkflowActionableInsightTable1(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
    dashboardFilters,
    stats,
    setActionableInsight1DataObject,
    setCurrentScreen,
  }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = githubActionsWorkflowMetadata.fields;
  const tableTitle = "Github Actions Detailed Workflow Summary";
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "workflow")),
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

  const getBody = () => {
    return (
      <FilterContainer
        isLoading={isLoading}
        title={tableTitle}
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
      <div className={"p-2"}>
        {getBody()}
      </div>
    </div>
  );
}

GitlabActionsWorkflowActionableInsightTable1.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  dashboardFilters: PropTypes.any,
  stats: PropTypes.object,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};

export default GitlabActionsWorkflowActionableInsightTable1;

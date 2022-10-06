import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getStaticIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionsWorkflowReportActionableInsights1Panel
  from "../../export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "../../export/ExportGithubActionWorkflowReportButton";
import {githubActionsWorkflowActionableInsights2Metadata} from "./githubActionsWorkflowActionableInsights2.metadata";
import {
  GITHUB_ACTIONS_WORKFLOW_ACTIONABLE_INSIGHT_SCREENS
} from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsightOverlay";

function GithubActionsWorkflowActionableInsightTable2(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
      mostFailed,
      mostSkipped,
      mostSuccessTime,
      mostFailedTime,
    setCurrentScreen,
    setSelectedJobName,
  }) {
  const tableTitle = "Github Actions Workflow Job Summary";
  const noDataMessage = "No data available";
  const fields = githubActionsWorkflowActionableInsights2Metadata.fields;
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

  const getBody = () => {
    return (
      <FilterContainer
        body={getTable()}
        metadata={data}
        isLoading={isLoading}
        title={tableTitle}
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
    );
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
      <div className="m-3">{"*Average times may be higher than seen in GitHub due to workflow runs being re-tried or re-run. Duration is considered from the first run attempt to the final attempt."}</div>
      </div>
    );
  };

  return (
    <div>
      <div className={"p-2"}>
        <div className={"d-flex details-title-text"}>
            <div className={'mr-4'}>
                <b>Most Failed Job:</b> {mostFailed}
            </div>
            <div className={'mr-4'}>
                <b>Most Skipped Job:</b> {mostSkipped}
            </div>
            <div className={'mr-4'}>
                <b>Job With Most Time Consuming Successful Runs:</b> {mostSuccessTime}
            </div>
            <div className={'mr-4'}>
                <b>Job With Most Time Consuming Failed Runs:</b> {mostFailedTime}
            </div>
        </div>
      </div>
      <div className={"p-3"}>
        {getBody()}
      </div>
    </div>
  );
}

GithubActionsWorkflowActionableInsightTable2.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  mostFailed: PropTypes.string,
  mostSkipped: PropTypes.string,
  mostSuccessTime:PropTypes.string,
  mostFailedTime:PropTypes.string,
  setSelectedJobName: PropTypes.func,
  setCurrentScreen: PropTypes.func,
};

export default GithubActionsWorkflowActionableInsightTable2;
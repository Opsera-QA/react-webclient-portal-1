import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import CustomTable from "../../../../../../../common/table/CustomTable";
import {getStaticIconColumn, getTableTextColumn} from "../../../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../../../common/metadata/metadata-helpers";
import FilterContainer from "../../../../../../../common/table/FilterContainer";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import GithubActionsWorkflowActionableInsight3 from "../ActionableInsights3/GithubActionsWorkflowActionableInsight3";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import ExportGithubActionsWorkflowReportActionableInsights1Panel
  from "../../export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "../../export/ExportGithubActionWorkflowReportButton";

function GithubActionsWorkflowActionableInsightTable2({ data, isLoading, loadData, filterModel, setFilterModel,
                                                        kpiConfiguration,dashboardData, repoName, appName,
                                                        branchName, workflowName, stats }) {
  const tableTitle = "Github Actions Workflow Job Summary";
  const noDataMessage = "No data available";
  const fields = githubActionsWorkflowMetadata.fields;
  const toastContext = useContext(DialogToastContext);
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
    toastContext.showInfoOverlayPanel(
      <GithubActionsWorkflowActionableInsight3
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        appName={appName}
        repoName={repoName}
        workflowName={workflowName}
        branchName={branchName}
        jobName={rowData.original.jobName}
      />
    );
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
    <div>
      <div className={"p-2"}>
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
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  repoName:PropTypes.string,
  appName: PropTypes.string,
  branchName: PropTypes.string,
  workflowName: PropTypes.string,
  stats: PropTypes.object
};

export default GithubActionsWorkflowActionableInsightTable2;
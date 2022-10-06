import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router-dom";
import { githubActionsWorkflowMetadata } from "./githubActionsWorkflow.metadata";
import GithubActionsWorkflowActionableInsight1 from "./GithubActionsWorkflowActionableInsights/ActionableInsights1/GithubActionsWorkflowActionableInsight1";
import { getStaticIconColumn } from "../../../../../common/table/table-column-helpers";
import ExportGithubActionsWorkflowReportPanel from "./export/ExportGithubActionsWorkflowReportPanel";
import ExportGithubActionsWorkflowReportButton from "./export/ExportGithubActionWorkflowReportButton";
import GithubActionsWorkflowActionableInsightOverlay
  from "components/insights/charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowActionableInsightOverlay";
// TODO: Convert to cards
function GithubActionsBottomTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  kpiConfiguration,
  dashboardData,
  dashboardFilters,
  mostFailed,
    mostSuccessTime,
    mostFailedTime,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const fields = githubActionsWorkflowMetadata.fields;
  const tableTitle = "Github Actions Unique Workflow Summary";
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "runs")),
      getTableTextColumn(getField(fields, "repos")),
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
    toastContext.showInfoOverlayPanel(
      <GithubActionsWorkflowActionableInsightOverlay
        workflowName={rowData.original._id}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        dashboardFilters={dashboardFilters}
      />,
    );
  };

  const getTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportGithubActionsWorkflowReportPanel
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
  const getBody = () => {
  return (
    <FilterContainer
      isLoading={isLoading}
      title={tableTitle}
      titleIcon={faDraftingCompass}
      body={getTable()}
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

  return (
    <div>
      <div className={"d-flex details-title-text"}>
          <div className={'mr-4'}>
              <b>Most Failed Workflow:</b> {mostFailed}
          </div>
          <div className={'mr-4'}>
              <b>Most Time Consuming for Successful Workflow:</b> {mostSuccessTime}
          </div>
          <div className={'mr-4'}>
              <b>Most Time Consuming for Failed Workflow:</b> {mostFailedTime}
          </div>
      </div>
      {getBody()}
    </div>
  );
}

GithubActionsBottomTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  mostFailed: PropTypes.string,
  mostSuccessTime:PropTypes.string,
  mostFailedTime:PropTypes.string,
};

export default GithubActionsBottomTable;

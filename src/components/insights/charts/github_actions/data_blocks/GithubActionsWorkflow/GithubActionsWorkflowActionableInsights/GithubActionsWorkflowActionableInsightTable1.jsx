import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getStaticIconColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { githubActionsWorkflowMetadata } from "../githubActionsWorkflow.metadata";
import GithubActionsWorkflowActionableInsight2 from "./GithubActionsWorkflowActionableInsight2";
import ExportGithubActionsWorkflowReportActionableInsights1Panel from "../export/ExportGithubActionsWorkflowReportActionableInsights1Panel";
import ExportGithubActionsWorkflowReportButton from "../export/ExportGithubActionWorkflowReportButton";

// TODO: Convert to cards
function GitlabActionsWorkflowActionableInsightTable1({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  kpiConfiguration,
  dashboardData,
  workflowName,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const fields = githubActionsWorkflowMetadata.fields;
  const tableTitle = "Github Actions Workflow Summary";
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
      getTableTextColumn(getField(fields, "successPercentage")),
      getTableTextColumn(getField(fields, "failedPercentage")),
      getTableTextColumn(getField(fields, "successTime")),
      getTableTextColumn(getField(fields, "failedTime")),
      getStaticIconColumn(faExternalLink),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    toastContext.showInfoOverlayPanel(
      <GithubActionsWorkflowActionableInsight2
        workflowName={workflowName}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        appName={rowData.original.appName}
        repoName={rowData.original.repoName}
        workflow={rowData.original.workflow}
        branchName={rowData.original.branchName}
      />,
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
}

GitlabActionsWorkflowActionableInsightTable1.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
};

export default GitlabActionsWorkflowActionableInsightTable1;

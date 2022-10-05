import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableTextColumn, getStaticIconColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  githubActionsWorkflowMetadata,
} from "components/insights/charts/github_actions/workflows/githubActionsWorkflow.metadata";
import ExportGithubActionsWorkflowReportPanel
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionsWorkflowReportPanel";
import ExportGithubActionsWorkflowReportButton
  from "components/insights/charts/github_actions/workflows/export/ExportGithubActionWorkflowReportButton";
import GithubActionsWorkflowActionableInsightOverlay
  from "components/insights/charts/github_actions/workflows/actionable_insights/GithubActionsWorkflowActionableInsightOverlay";
import { Col, Row } from "react-bootstrap";

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
                                    stats,
                                  }) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const fields = githubActionsWorkflowMetadata.fields;
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
      </div>
    );
  };

  const getBody = () => {
    return (
      <>
        <FilterContainer
          isLoading={isLoading}
          title={"Github Actions Unique Workflow Summary"}
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
        <Row>
          <Col xs={12} className={"mt-2 w-100 d-flex"}>
            <div className={"ml-auto"}>
              {"* Average times may be higher than seen in GitHub due to workflow runs being re-tried or re-run. Duration is considered from the first run attempt to the final attempt."}
            </div>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div className={"mx-3"}>
      <div className={"d-flex details-title-text"}>
        <div className={"mr-4"}>
          <b>Most Failed Workflow:</b> {stats?.mostFailed}
        </div>
        <div className={"mr-4"}>
          <b>Most Time Consuming Workflow:</b> {stats?.mostTime}
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
  stats: PropTypes.object,
};

export default GithubActionsBottomTable;

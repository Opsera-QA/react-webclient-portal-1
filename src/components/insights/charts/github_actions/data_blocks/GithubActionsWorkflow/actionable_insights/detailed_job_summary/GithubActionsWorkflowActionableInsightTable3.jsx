import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { githubActionsWorkflowActionableInsights3Metadata } from "./githubActionsWorkflowActionableInsights3.metadata";
import CustomTable from "components/common/table/CustomTable";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import ExportGithubActionsWorkflowReportButton from "../../export/ExportGithubActionWorkflowReportButton";
import ExportGithubActionsWorkflowReportActionableInsights1Panel
    from "../../export/ExportGithubActionsWorkflowReportActionableInsights1Panel";

function GithubActionsWorkflowActionableInsightTable3(
  {
    data,
    isLoading,
    loadData,
    filterModel,
    setFilterModel,
    stats,
  }) {
  const tableTitle = "Github Actions Workflow Step Summary";
  const noDataMessage = "No data available";
  const fields = githubActionsWorkflowActionableInsights3Metadata.fields;
  const [showExportPanel, setShowExportPanel] = useState(false);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "jobName")),
      getTableTextColumn(getField(fields, "jobs")),
      getTableTextColumn(getField(fields, "jobsSuccess")),
      getTableTextColumn(getField(fields, "jobsFailures")),
      getTableTextColumn(getField(fields, "skipped")),
      getTableTextColumn(getField(fields, "canceled")),
      getTableTextColumn(getField(fields, "successPercentage")),
      getTableTextColumn(getField(fields, "failedPercentage")),
      getTableTextColumn(getField(fields, "skippedPercentage")),
      getTableTextColumn(getField(fields, "canceledPercentage")),
      getTableTextColumn(getField(fields, "successTime")),
      getTableTextColumn(getField(fields, "failedTime")),
    ],
    [],
  );

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
      />
      <div className="m-3">{"*Average times may be higher than seen in GitHub due to workflow runs being re-tried or re-run. Duration is considered from the first run attempt to the final attempt."}</div>
      </div>
    );
  };

  return (
    <div>
      <div className={"p-2"}>
        <div className={"d-flex details-title-text"}>
          <div className={"mr-4"}>
            <b>Most Skipped Steps:</b> {stats?.mostSkipped}
          </div>
          <div className={"mr-4"}>
            <b>Most Failed Steps:</b> {stats?.mostFailed}
          </div>
          <div className={"mr-4"}>
            <b>Most Time Consuming Steps:</b> {stats?.mostTime}
          </div>
        </div>
      </div>
      <div className={"p-2"}>
        {getBody()}
      </div>
    </div>
  );
}

GithubActionsWorkflowActionableInsightTable3.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  stats: PropTypes.object,
};

export default GithubActionsWorkflowActionableInsightTable3;
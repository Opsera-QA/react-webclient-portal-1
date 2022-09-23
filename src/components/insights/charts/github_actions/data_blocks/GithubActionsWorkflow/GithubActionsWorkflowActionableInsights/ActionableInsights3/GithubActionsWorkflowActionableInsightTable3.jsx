import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import {githubActionsWorkflowActionableInsights3Metadata} from "./githubActionsWorkflowActionableInsights3.metadata";
import CustomTable from "../../../../../../../common/table/CustomTable";
import {getTableTextColumn} from "../../../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../../../common/metadata/metadata-helpers";
import FilterContainer from "../../../../../../../common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import ExportGithubActionsWorkflowReportActionableInsights3Panel from "../../export/ExportGithubActionsWorkflowReportActionableInsights3Panel";
import ExportGithubActionsWorkflowReportButton from "../../export/ExportGithubActionWorkflowReportButton";

function GithubActionsWorkflowActionableInsightTable3({ data, isLoading, loadData, filterModel, setFilterModel, stats,
                                                        kpiConfiguration,dashboardData, repoName, appName,
                                                        branchName, workflowName }) {
  const toastContext = useContext(DialogToastContext);
  const tableTitle = "Github Actions Workflow Step Summary";
  const noDataMessage = "No data available";
  const fields = githubActionsWorkflowActionableInsights3Metadata.fields;
  const [showExportPanel, setShowExportPanel] = useState(false);

    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "jobName")),
            getTableTextColumn(getField(fields, "runs")),
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
        []
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
          <ExportGithubActionsWorkflowReportActionableInsights3Panel
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
            />
        );
    };

    return (
        <div>
            <div className={"p-2"}>
                <div className={"d-flex details-title-text"}>
                    <div className={'mr-4'}>
                        <b>Most Skipped Steps:</b> {stats?.mostSkipped}
                    </div>
                    <div className={'mr-4'}>
                        <b>Most Failed Steps:</b> {stats?.mostFailed}
                    </div>
                    <div className={'mr-4'}>
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
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    repoName:PropTypes.string,
    appName: PropTypes.string,
    branchName: PropTypes.string,
    workflowName: PropTypes.string,
    stats: PropTypes.object
};

export default GithubActionsWorkflowActionableInsightTable3;
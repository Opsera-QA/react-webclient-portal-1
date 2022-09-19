import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {
  getTableTextColumn,
  getStaticIconColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import GithubActionsWorkflowActionableInsight2 from "../ActionableInsights2/GithubActionsWorkflowActionableInsight2";

// TODO: Convert to cards
function GitlabActionsWorkflowActionableInsightTable1({ data, isLoading, loadData, filterModel, setFilterModel, kpiConfiguration,dashboardData, workflowName }) {
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
      []
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
        />
    );
  };

  const getTable = () => {
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
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        supportSearch={true}
      />
    );
  };

  return (
    <div>
      <div className={"p-2"}>
        <div className={"d-flex details-title-text"}>
          <div className={'mr-4'}>
            <b>Most Skipped Job:</b> {''}
          </div>
          <div className={'mr-4'}>
            <b>Most Failed Job:</b> {''}
          </div>
          <div className={'mr-4'}>
            <b>Most Time Consuming Job:</b> {''}
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
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string
};

export default GitlabActionsWorkflowActionableInsightTable1;

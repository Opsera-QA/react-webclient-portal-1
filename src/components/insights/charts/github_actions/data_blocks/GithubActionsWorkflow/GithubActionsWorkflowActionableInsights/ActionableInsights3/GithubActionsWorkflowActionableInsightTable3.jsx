import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import CustomTable from "../../../../../../../common/table/CustomTable";
import {getStaticIconColumn, getTableTextColumn} from "../../../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../../../common/metadata/metadata-helpers";
import FilterContainer from "../../../../../../../common/table/FilterContainer";
import {faDraftingCompass, faExternalLink} from "@fortawesome/pro-light-svg-icons";
import GithubActionsWorkflowActionableInsight3 from "../ActionableInsights2/GithubActionsWorkflowActionableInsights2";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";

function GithubActionsWorkflowActionableInsightTable3({ data, isLoading, loadData, filterModel, setFilterModel,
                                                        kpiConfiguration,dashboardData, repoName, appName,
                                                        branchName, workflowName }) {
  const toastContext = useContext(DialogToastContext);
  const tableTitle = "Github Actions Jobs Summary";
  const noDataMessage = "No data available";
  const fields = githubActionsWorkflowMetadata.fields;

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
  workflowName: PropTypes.string
};

export default GithubActionsWorkflowActionableInsightTable3;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {githubActionsWorkflowMetadata} from "../../githubActionsWorkflow.metadata";
import GitlabActionsWorkflowActionableInsightTable2 from "./GithubActionsWorkslfowActionableInsightTable2";
import {metricHelpers} from "../../../../../../metric.helpers";
import githubActionsWorkflowActions from "../../github-actions-workflow-actions";
import useComponentStateReference from "hooks/useComponentStateReference";

function GithubActionsWorkflowTableOverlay2(
  {
    kpiConfiguration,
    dashboardData,
    repoName,
    appName,
    workflow,
    branchName,
    setCurrentScreen,
    setSelectedJobName,
  }) {
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...githubActionsWorkflowMetadata.newObjectFields },
      githubActionsWorkflowMetadata,
      false
    )
  );
  const {
    getAccessToken,
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsActionableTwoTable(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        filterDto,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        workflow,
        repoName,
        appName,
        branchName
      );

      let dataObject = response?.data ? response?.data?.data[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.count[0]?.count
        : [];
      let stats = response?.data?.stats;


      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setStats(stats);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <GitlabActionsWorkflowActionableInsightTable2
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      appName={appName}
      stats={stats}
      setCurrentScreen={setCurrentScreen}
      setSelectedJobName={setSelectedJobName}
    />
  );
}

GithubActionsWorkflowTableOverlay2.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedJobName: PropTypes.func,
};

export default GithubActionsWorkflowTableOverlay2;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { githubActionsWorkflowMetadata } from "../../githubActionsWorkflow.metadata";
import GitlabActionsWorkflowActionableInsightTable1 from "./GithubActionsWorkflowActionableInsightTable1";
import { metricHelpers } from "../../../../../../metric.helpers";
import githubActionsWorkflowActions from "../../github-actions-workflow-actions";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function GithubActionsWorkflowTableOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    workflowName,
    setCurrentScreen,
    setActionableInsight1DataObject,
  }) {
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [mostFailed, setMostFailed] = useState("");
  const [mostSkipped, setMostSkipped] = useState("");
  const [mostFailedTime, setMostFailedTime] = useState("");
  const [mostSuccessTime, setMostSuccessTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...githubActionsWorkflowMetadata.newObjectFields },
      githubActionsWorkflowMetadata,
      false,
    ),
  );
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
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
      //let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsActionableOneTable(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        filterDto,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        workflowName,
      );
      let dataObject = response?.data ? response?.data?.data[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.count[0]?.count
        : [];
      let mostFailed = response?.data ? response?.data?.data[0]?.mostFailed[0]?.mostFailed : "N/A";
      let mostSkipped = response?.data ? response?.data?.data[0]?.mostSkipped[0]?.mostSkipped : "N/A";
      let mostSuccessTime = response?.data ? response?.data?.data[0]?.mostSuccessTime[0]?.mostSuccessTime : "N/A";
      let mostFailedTime = response?.data ? response?.data?.data[0]?.mostFailedTime[0]?.mostFailedTime : "N/A";

      console.log("mostFailed before", mostFailed);


      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setMostFailed(mostFailed);
        setMostSkipped(mostSkipped);
        setMostSuccessTime(mostSuccessTime);
        setMostFailedTime(mostFailedTime);
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

  console.log(" aftre mostFailed", mostFailed);

  return (
    <GitlabActionsWorkflowActionableInsightTable1
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      dashboardFilters={dashboardFilters}
      mostFailed={mostFailed}
      mostSkipped={mostSkipped}
      mostSuccessTime={mostSuccessTime}
      mostFailedTime={mostFailedTime}
      setCurrentScreen={setCurrentScreen}
      setActionableInsight1DataObject={setActionableInsight1DataObject}
    />
  );
}

GithubActionsWorkflowTableOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setActionableInsight1DataObject: PropTypes.func,
};

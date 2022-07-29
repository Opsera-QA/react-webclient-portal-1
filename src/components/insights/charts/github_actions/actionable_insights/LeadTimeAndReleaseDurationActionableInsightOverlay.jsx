import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { faExternalLink, faTable } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import chartsActions from "components/insights/charts/charts-actions";
import { useHistory } from "react-router-dom";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import LeadTimeAndReleaseDurationDataBlockContainer from "./LeadTimeAndReleaseDurationDataBlockContainer";
import actionableInsightsGenericChartFilterMetadata from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import IconBase from "components/common/icons/IconBase";
import { assignStandardLineColors } from "components/insights/charts/charts-views";

function LeadTimeAndReleaseDurationActionableInsightOverlay({
  title,
  actionableInsightsQueryData,
  kpiConfiguration,
  dashboardData,
}) {

  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataBlockValues, setDataBlockValues] = useState({});
  const [dataBlockMeanValues, setDataBlockMeanValues] = useState({});
  const [statisticsData, setBuildAndDeployMetricData] = useState([]);
  const [chartData, setBuildAndDeployChartData] = useState([]);
  const [goalsData, setGoalsData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );

  const DEFAULT_GOALS = {
    build_success_rate: 90,
    average_builds: 1,
    deployment_success_rate: 90,
    average_deployments: 1,
  };

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);
  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;

        let summary = {
          "total_commits": 80,
          "total_repo_changes": 1000,
          "total_merges": 25,
          "total_deployments": 5,
          "mean_time_to_build": 15,
          "mean_time_to_commit": 10,
          "mean_time_to_merge": 20,
          "mean_time_to_deploy": 30
      };
        let deploymentsResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTotalDeployments",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      summary["total_deployments"] = deploymentsResponse?.data?.data[0]?.count;
      let repositoriesResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTotalRepositories",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      summary["total_repo_changes"] = repositoriesResponse?.data?.data[0]?.count;
      let commitsResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubTotalCommits",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      summary["total_commits"] = commitsResponse?.data?.data[0];
      let mergesResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubTotalMerges",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      summary["total_merges"] = mergesResponse?.data?.data[0];
      let averageTimeToBuildResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsAverageTimeToBuild",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      summary["mean_time_to_build"] = averageTimeToBuildResponse?.data?.data[0];
      let averageTimeToDeployResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsAverageTimeToDeploy",
        kpiConfiguration,
        dashboardTags,
        filterDto,
        null,
        dashboardOrgs,
        null,
        null,
        null,
        actionableInsightsQueryData
      );
      summary["mean_time_to_deploy"] = averageTimeToDeployResponse?.data?.data[0];

      if (isMounted?.current === true) {
        setDataBlockValues(summary);
        setBuildAndDeployMetricData(statisticsData);
        setBuildAndDeployChartData(chartData);
        setGoalsData(goals);
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

  const getFooterDetails = () => {
    if (!dataBlockValues) {
      return null;
    }
    return null;
  };

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData?.data?._id?.pipelineId}/${rowData?.data?._id?.run}`);
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateBadge = () => {
    const date = actionableInsightsQueryData?.data;
    return <MetricDateRangeBadge startDate={date?.lowerBound} endDate={date?.upperBound} />;
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={title}
      showToasts={true}
      titleIcon={faTable}
      isLoading={false}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        {getDateBadge()}
        <LeadTimeAndReleaseDurationDataBlockContainer 
          data={dataBlockValues}
          metric={metrics[0]}
          kpiConfiguration={kpiConfiguration}
          meanData={dataBlockMeanValues[0]?.deploy_mean}
          countData={dataBlockMeanValues[0]?.deploy_count}
          goalsData={goalsData?.average_deploy}
          dashboardData={dashboardData}
          statisticsData={statisticsData}
          chartData={chartData}
        />

      </div>
    </FullScreenCenterOverlayContainer>
  );
}

LeadTimeAndReleaseDurationActionableInsightOverlay.propTypes = {
  title: PropTypes.string,
  actionableInsightsQueryData: PropTypes.any,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default LeadTimeAndReleaseDurationActionableInsightOverlay;

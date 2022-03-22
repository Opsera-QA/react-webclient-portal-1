import React, {useState, useEffect, useContext, useRef} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLineNumberDataBlock from "../../../../common/metrics/number/ThreeLineNumberDataBlock";
import LeadTimeAndReleaseDurationActionableInsightOverlay from "../actionable_insights/LeadTimeAndReleaseDurationActionableInsightOverlay";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";

function LeadTimeAndReleaseTraceabilityDataBlock({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
  showViewDetailsToggle}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
  const [deploymentMetrics, setDeploymentMetrics] = useState([]);
  const [applicationDeploymentMetrics, setApplicationDeploymentMetrics] = useState([]);
  const [applicationLeadTimeMetrics, setApplicationLeadTimeMetrics] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      // await loadDataPoints(cancelSource);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsLeadTime",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const metrics = response?.data?.data[0]?.leadTime?.data;

      const deploymentResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsDeploymentFrequency",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );

      const deploymentMetrics = deploymentResponse?.data?.data[0]?.deploymentFrequency?.data;

      const applicationDeploymentResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsApplicationDeploymentFrequency",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );

      const applicationDeploymentMetrics = applicationDeploymentResponse?.data?.data[0]?.deploymentFrequency?.data;

      const applicationLeadTimeResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsApplicationLeadTime",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );

      const applicationLeadTimeMetrics = applicationLeadTimeResponse?.data?.data[0]?.leadTime?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setMetrics(metrics[0]);
        setDeploymentMetrics(deploymentMetrics[0]);
        setApplicationDeploymentMetrics(applicationDeploymentMetrics);
        setApplicationLeadTimeMetrics(applicationLeadTimeMetrics);
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

  const viewDetailsComponent = () => {
    toastContext.showOverlayPanel(
      <LeadTimeAndReleaseDurationActionableInsightOverlay
        title={"Lead time and Release Duration"}
        actionableInsightsQueryData={null}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getIcon = (severity) => {
    switch (severity) {
      case "Up":
        return faArrowCircleUp;
      case "Down":
        return faArrowCircleDown;
      case "Neutral":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case "Down":
        return "red";
      case "Up":
        return "green";
      case "Neutral":
        return "light-gray-text-secondary";
      case "-":
        return "black";
      default:
        break;
    }
  };

  const getDescription = (severity) => {
    switch (severity) {
      case "Up":
        return "This project is trending upward.";
      case "Down":
        return "This project is trending downward.";
      case "Neutral":
        return "Neutral: This project has experienced no change.";
    }
  };

  const getChartBody = () => {
    const durationDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
        "lead-time-and-release-traceability-duration-data-point");
    const frequencyDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
        "lead-time-and-release-traceability-frequency-data-point");
    const timeToFirstCommitDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
        "lead-time-and-release-traceability-time-to-first-commit-data-point");
    return (
      <>
        <div className="new-chart m-3 p-0 all-github-actions-data-block">
          <Row>
            {dataPointHelpers.isDataPointVisible(durationDataPoint) &&
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={durationDataPoint}
                      numberData={metrics.avgLeadTime}
                      supportingText={"minutes"}
                      className={`${getIconColor(metrics.trend)}`}
                      topText={"Lead Time"}
                      bottomText={"Previous result: " + applicationLeadTimeMetrics.previousResult}
                      icon={getIcon(metrics.trend)}
                      iconOverlayBody={getDescription(metrics.trend)}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>}
            {dataPointHelpers.isDataPointVisible(frequencyDataPoint) &&
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={frequencyDataPoint}
                      className={`${getIconColor(metrics.trend)}`}
                      numberData={deploymentMetrics.deploymentFrequency}
                      supportingText={deploymentMetrics.deploymentFrequency === 1 ? "deployment/day" : "deployments/day"}
                      topText={"Frequency"}
                      bottomText={"Previous result: " + deploymentMetrics.previousResult}
                      icon={getIcon(deploymentMetrics.trend)}
                      iconOverlayBody={getDescription(deploymentMetrics.trend)}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>}
            {dataPointHelpers.isDataPointVisible(timeToFirstCommitDataPoint) &&
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={timeToFirstCommitDataPoint}
                      className={`${getIconColor(metrics.trend)}`}
                      numberData={metrics.avgLeadTime}
                      supportingText={"minutes"}
                      topText={"Average Time to First Commit"}
                      bottomText={"Previous result: " + metrics.previousResult}
                      icon={getIcon(metrics.trend)}
                      iconOverlayBody={getDescription(metrics.trend)}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>}
          </Row>
          {/*<Row className={"mt-5"}>*/}
          {/*  <Col xs={12}>*/}
          {/*    <H4MetricSubHeader subheaderText={'Top Applications'} />*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"High Lead Time"}*/}
          {/*        content={"oswestry"}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"High Deployment Frequency"}*/}
          {/*        content={"grosmont"}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row style={{marginTop:'1rem'}}>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"Minimal/No activity in last few weeks"}*/}
          {/*        content={"oswestry"}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"Highest Commits"}*/}
          {/*        content={""}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
        showViewDetailsToggle={showViewDetailsToggle}
        launchActionableInsightsFunction={viewDetailsComponent}
      />
      <ModalLogs
        header="Lead Time And Release Traceability"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

LeadTimeAndReleaseTraceabilityDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
  showViewDetailsToggle: PropTypes.bool
};

export default LeadTimeAndReleaseTraceabilityDataBlock;
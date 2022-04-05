import React, {useState, useEffect, useContext, useRef} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../../common/panels/insights/charts/ChartContainer";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ModalLogs from "../../../../../common/modal/modalLogs";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import SuccessPercentActionableInsights from "./SuccessPercent/SuccessPercentActionableInsights";
import SuccessExecutionsActionableInsights from "./SuccessExecutions/SuccessExecutionsActionableInsights";
import FailedExecutionsActionableInsights from "./FailedExecutions/FailedExecutionsActionableInsights";
import ThreeLinePercentageBlockBase from "../../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";

function AllGithubActionsDataBlock({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
  const [applicationMetrics, setApplicationMetrics] = useState([]);
  const [reasonsMetrics, setReasonsMetrics] = useState([]);
  const [durationMetrics, setDurationMetrics] = useState([]);
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
        "githubActionsTraceability",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const metrics = response?.data?.data[0]?.traceability?.data;

      const applicationResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTopApplicationsSuccessAndFailurePercentage",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const applicationMetrics = applicationResponse?.data?.data;

      const reasonsResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsCommonReasonsForFailure",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const reasonsMetrics = reasonsResponse?.data?.data[0]?.commonReasonsForFailure?.data;

      const durationResponse = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTopApplicationsDuration",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );

      const durationMetrics = durationResponse?.data?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setMetrics(metrics[0]);
        setApplicationMetrics(applicationMetrics[0]);
        setReasonsMetrics(reasonsMetrics);
        setDurationMetrics(durationMetrics[0]);
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

  const toastContext = useContext(DialogToastContext);

  const onSuccessPercentRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Actionable Report: Success %`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <SuccessPercentActionableInsights kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
        </div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const onSuccessExecutionsRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Actionable Report: Success Runs`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <SuccessExecutionsActionableInsights kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
        </div>
      </FullScreenCenterOverlayContainer>
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
        return "Neutral: This project has experienced no change";
    }
  };

  const onFailedExecutionsRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Actionable Report: Failed Runs`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <FailedExecutionsActionableInsights kpiConfiguration={kpiConfiguration} dashboardData={dashboardData}/>
        </div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getChartBody = () => {
    const successPercent = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints, "all-github-actions-success-data-point");
    return (
      <>
        <div className="new-chart m-3 p-0 all-github-actions-data-block">
          <Row>
            {dataPointHelpers.isDataPointVisible(successPercent) &&
            <Col md={4}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true} onClickFunction={() => onSuccessPercentRowSelect()}>
                  <ThreeLinePercentageBlockBase
                    className={`${getIconColor(metrics.trend)} p-2`}
                    dataPoint={successPercent}
                    percentage={metrics.successPercentage}
                    topText={"Success %"}
                    bottomText={"Previous result: " + metrics.trendSuccessPercentage}
                    icon={getIcon(metrics.trend)}
                    iconOverlayBody={getDescription(metrics.trend)}
                  />
                </DataBlockBoxContainer>
              </div>
            </Col> }
            <Col md={4}>
              <DataBlockBoxContainer showBorder={true} onClickFunction={() => onSuccessExecutionsRowSelect()}>
                <TwoLineScoreDataBlock
                  className="p-3 m-1"
                  score={metrics.successCount}
                  subtitle={"Total Successful Executions"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={4}>
              <DataBlockBoxContainer showBorder={true} onClickFunction={() => onFailedExecutionsRowSelect()}>
                <TwoLineScoreDataBlock
                  className="p-3 m-1"
                  score={metrics.failureCount}
                  subtitle={"Total Failed Executions"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          {/*<Row style={{marginTop:'1rem'}}>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"Top applications with higher success rate"}*/}
          {/*        content={"oswestry"}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"Top applications with higher failure rate"}*/}
          {/*        content={"grosmont"}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          {/*<Row style={{marginTop:'1rem'}}>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"Application with Complex Builds (based on duration and size of logs)"}*/}
          {/*        content={"oswestry"}*/}
          {/*      />*/}
          {/*    </DataBlockBoxContainer>*/}
          {/*  </Col>*/}
          {/*  <Col md={6}>*/}
          {/*    <DataBlockBoxContainer showBorder={true}>*/}
          {/*      <MetricContentDataBlockBase*/}
          {/*        title={"Top most common reasons of failure"}*/}
          {/*        content={*/}
          {/*          <div style={{display: "grid"}}>*/}
          {/*            <span>Missing File or directory</span>*/}
          {/*            <span>Incorrect Configuration</span>*/}
          {/*          </div>*/}
          {/*        }*/}
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
      />
      <ModalLogs
        header="Github Actions Statistics"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

AllGithubActionsDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default AllGithubActionsDataBlock;
import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import Model from "../../../../../core/data_model/model";
import CoverityIssuesByCategoryActionableMetadata from "./actionable_insights/coverity-actionable-insight-metadata";
import ChartDetailsOverlay from "../../detail_overlay/ChartDetailsOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import CoverityIssuesByCategoryHelpDocumentation from "components/common/help/documentation/insights/charts/CoverityIssuesByCategoryHelpDocumentation";
import CoverityActionableInsightOverlay from "./actionable_insights/CoverityActionableInsightOverlay";

function CoverityIssuesByCategory({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "overallCoverityIssuesTrend",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data ? response?.data?.data[0]?.overallCoverityIssuesTrend?.data : [];

      if (isMounted?.current === true && dataObject) {
        dataObject[0]?.docs?.sort((a, b) =>
          a.currentTotalIssues < b.currentTotalIssues ? 1 : b.currentTotalIssues < a.currentTotalIssues ? -1 : 0
        );
        dataObject[0]?.docs?.slice(0, 2);

        setMetrics(dataObject);
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

  const onRowSelect = (stat) => {
    const chartModel = new Model(
      { ...CoverityIssuesByCategoryActionableMetadata.newObjectFields },
      CoverityIssuesByCategoryActionableMetadata,
      false
    );
    toastContext.showOverlayPanel(
      <CoverityActionableInsightOverlay
        title={ stat + " Issues Insights"}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        coveritySeverity={stat}
      />
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    const getIcon = (severity) => {
      switch (severity) {
        case "Red":
          return faArrowCircleUp;
        case "Neutral":
          return faPauseCircle;
        case "Green":
          return faArrowCircleDown;
        case "-":
          return faMinusCircle;
        default:
          break;
      }
    };

    const getIconColor = (severity) => {
      switch (severity) {
        case "Red":
          return "red";
        case "Green":
          return "green";
        case "Neutral":
        case "-":
          return "black";
        default:
          break;
      }
    };

    const getIconTitle = (severity) => {
      switch (severity) {
        case "Red":
          return "Risk";
        case "Green":
          return "Success";
        case "Neutral":
          return "Same as Earlier";
        case "-":
          return "No Trend";
        default:
          break;
      }
    };

    return (
      <div className="new-chart mb-3" style={{ height: "300px" }}>
        <Container>
          <Row className="p-1">
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric pointer" onClick={() => onRowSelect("Low")}>
                  <div>{metrics[0].currentTotalLow}</div>
                </div>
                <div className="icon-box fa-pull-right">
                  <FontAwesomeIcon
                    icon={getIcon(metrics[0].overallLowTrend)}
                    className="fa-pull-right ml-0"
                    size={"lg"}
                    onClick={() => document.body.click()}
                    color={getIconColor(metrics[0].overallLowTrend)}
                    title={getIconTitle(metrics[0].overallLowTrend)}
                  />
                </div>
                <div className="w-100 text-muted mb-1">Low</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric pointer" onClick={() => onRowSelect("Medium")}>
                  <div>{metrics[0].currentTotalMedium}</div>
                </div>

                <div className="icon-box fa-pull-right">
                  <FontAwesomeIcon
                    icon={getIcon(metrics[0].overallMediumTrend)}
                    className="fa-pull-right ml-0"
                    size={"lg"}
                    onClick={() => document.body.click()}
                    color={getIconColor(metrics[0].overallMediumTrend)}
                    title={getIconTitle(metrics[0].overallMediumTrend)}
                  />
                </div>
                <div className="w-100 text-muted mb-1">Medium</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box p-3 text-center">
                <div className="box-metric pointer" onClick={() => onRowSelect("High")}>
                  <div>{metrics[0].currentTotalHigh}</div>
                </div>
                <div className="icon-box fa-pull-right">
                  <FontAwesomeIcon
                    icon={getIcon(metrics[0].overallHighTrend)}
                    className="fa-pull-right ml-0"
                    size={"lg"}
                    onClick={() => document.body.click()}
                    color={getIconColor(metrics[0].overallHighTrend)}
                    title={getIconTitle(metrics[0].overallHighTrend)}
                  />
                </div>
                <div className="w-100 text-muted mb-1">High</div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="p-4">
              <div>Top 3 Projects with Highest number of Issues & their Trend: </div>
              <br></br>
              {(() => {
                if (metrics[0]?.docs?.length && metrics[0]?.docs[0]) {
                  return (
                    <div>
                      <FontAwesomeIcon
                        // icon={faMinus}
                        icon={getIcon(metrics[0]?.docs[0]?.projectTotalIssuesTrend)}
                        color={getIconColor(metrics[0]?.docs[0]?.projectTotalIssuesTrend)}
                        title={getIconTitle(metrics[0]?.docs[0]?.projectTotalIssuesTrend)}
                      />{" "}
                      {metrics[0]?.docs[0]?.coverityStreamName}
                    </div>
                  );
                }
              })()}
              {(() => {
                if (metrics[0]?.docs?.length && metrics[0]?.docs[1]) {
                  return (
                    <div>
                      <FontAwesomeIcon
                        // icon={faMinus}
                        icon={getIcon(metrics[0]?.docs[1]?.projectTotalIssuesTrend)}
                        color={getIconColor(metrics[0]?.docs[1]?.projectTotalIssuesTrend)}
                        title={getIconTitle(metrics[0]?.docs[1]?.projectTotalIssuesTrend)}
                      />{" "}
                      {metrics[0]?.docs[1]?.coverityStreamName}
                    </div>
                  );
                }
              })()}
              {(() => {
                if (metrics[0]?.docs?.length && metrics[0]?.docs[2]) {
                  return (
                    <div>
                      <FontAwesomeIcon
                        // icon={faMinus}
                        icon={getIcon(metrics[0]?.docs[2]?.projectTotalIssuesTrend)}
                        color={getIconColor(metrics[0]?.docs[2]?.projectTotalIssuesTrend)}
                        title={getIconTitle(metrics[0]?.docs[2]?.projectTotalIssuesTrend)}
                      />{" "}
                      {metrics[0]?.docs[2]?.coverityStreamName}
                    </div>
                  );
                }
              })()}
            </div>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <div>
      <ChartContainer
        title={kpiConfiguration?.kpi_name}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <CoverityIssuesByCategoryHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Coverity Issues By Category"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

CoverityIssuesByCategory.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default CoverityIssuesByCategory;

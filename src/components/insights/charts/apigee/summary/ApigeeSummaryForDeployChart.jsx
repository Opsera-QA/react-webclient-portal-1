import React, {useState, useEffect, useRef} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLinePercentageBlockBase from "../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import ThreeLineScoreDataBlock from "../../../../common/metrics/score/ThreeLineScoreDataBlock";
import LoadingDialog from "../../../../common/status_notifications/loading";

function ApigeeSummaryForDeployChart({ kpiConfiguration, deployData, isLoading }) {
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [deployData]);

  const getIcon = (severity) => {
    switch (severity) {
      case "Green":
        return faArrowCircleUp;
      case "Red":
        return faArrowCircleDown;
      case "Neutral":
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
        return "light-gray-text-secondary";
      case "-":
        return "black";
      default:
        break;
    }
  };

  const getDescription = (severity) => {
    switch (severity) {
      case "Green":
        return "This project is trending upward.";
      case "Red":
        return "This project is trending downward.";
      case "Neutral":
        return "Neutral: This project has experienced no change";
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    const successPercent = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints, "apigee-summary-success-percent-data-point");
    const frequency = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints, "apigee-summary-frequency-data-point");
    return (
      <>
        <div>
          <div className={"d-flex details-title-text"}>
            <div className={'mr-3'}>
              <b>APIGEE Summary For Deploy</b>
            </div>
          </div>
          <Row>
            {dataPointHelpers.isDataPointVisible(successPercent) &&
              <Col md={3}>
                <div className={"github-actions-success-rate-contained-data-block"}>
                  <DataBlockBoxContainer showBorder={true}>
                    <ThreeLinePercentageBlockBase
                      className={`${getIconColor(deployData?.successPercentageTrend)} p-2`}
                      dataPoint={successPercent}
                      percentage={deployData?.successPercentage}
                      topText={"Success %"}
                      // bottomText={deployData?.successPercentageTrend ? "Previous result: " + deployData?.successPercentageTrend : "No previous result"}
                      icon={getIcon(deployData?.successPercentageTrend)}
                      iconOverlayBody={getDescription(deployData?.successPercentageTrend)}
                    />
                  </DataBlockBoxContainer>
                </div>
              </Col> }
            <Col md={3}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true}>
                  <ThreeLineScoreDataBlock
                    className={`${getIconColor(deployData?.totalRunsTrend)} p-2`}
                    score={deployData?.totalRuns}
                    topText={"Total Executions"}
                    // bottomText={deployData?.totalRunsTrend? "Previous result: " + deployData?.totalRunsTrend : "No previous result"}
                    icon={getIcon(deployData?.totalRunsTrend)}
                    iconOverlayBody={getDescription(deployData?.totalRunsTrend)}
                  />
                </DataBlockBoxContainer>
              </div>
            </Col>
            {dataPointHelpers.isDataPointVisible(frequency) &&
              <Col md={3}>
                <div className={"github-actions-success-rate-contained-data-block"}>
                  <DataBlockBoxContainer showBorder={true}>
                    <ThreeLineScoreDataBlock
                      className={`${getIconColor(deployData?.frequencyPerMonthTrend)} p-2`}
                      dataPoint={frequency}
                      score={deployData?.frequencyPerMonth}
                      topText={"Monthly Frequency"}
                      // bottomText={deployData?.frequencyPerMonthTrend ? "Previous result: " + deployData?.frequencyPerMonthTrend : "No previous result"}
                      icon={getIcon(deployData?.frequencyPerMonthTrend)}
                      iconOverlayBody={getDescription(deployData?.frequencyPerMonthTrend)}
                    />
                  </DataBlockBoxContainer>
                </div>
              </Col>
            }
            <Col md={3}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true}>
                  <ThreeLineScoreDataBlock
                    className={`${getIconColor(deployData?.averageDurationTrend)} p-2`}
                    score={deployData?.averageDurationInSecs ? `${deployData?.averageDurationInSecs}s` : deployData?.averageDurationInSecs}
                    topText={"Average Duration"}
                    // bottomText={deployData?.averageDurationTrend ? "Previous result: " + deployData?.averageDurationTrend : "No previous result"}
                    icon={getIcon(deployData?.averageDurationTrend)}
                    iconOverlayBody={getDescription(deployData?.averageDurationTrend)}
                  />
                </DataBlockBoxContainer>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return getBody();
}

ApigeeSummaryForDeployChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  deployData:PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ApigeeSummaryForDeployChart;
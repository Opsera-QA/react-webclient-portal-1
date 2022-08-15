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

function ApigeeSummaryDetails({ kpiConfiguration, summaryData, isLoading, type }) {

  console.log({summaryData});

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
  }, [summaryData]);

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

  const getDurationIcon = (severity) => {
    switch (severity) {
      case "Green":
        return faArrowCircleDown;
      case "Red":
        return faArrowCircleUp;
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
              <b>APIGEE Summary For {type}</b>
            </div>
          </div>
          <Row>
            {dataPointHelpers.isDataPointVisible(successPercent) &&
              <Col md={3}>
                <div className={"github-actions-success-rate-contained-data-block"}>
                  <DataBlockBoxContainer showBorder={true}>
                    <ThreeLinePercentageBlockBase
                      className={`${getIconColor(summaryData?.trend?.successPercentage)} p-2`}
                      dataPoint={successPercent}
                      percentage={summaryData?.current?.successPercentage}
                      topText={"Success %"}
                      bottomText={summaryData?.previous?.successPercentage ? "Previous result: " + summaryData?.previous?.successPercentage : "No previous result"}
                      icon={getIcon(summaryData?.trend?.successPercentage)}
                      iconOverlayBody={getDescription(summaryData?.trend?.successPercentage)}
                    />
                  </DataBlockBoxContainer>
                </div>
              </Col> }
            <Col md={3}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true}>
                  <ThreeLineScoreDataBlock
                    className={`${getIconColor(summaryData?.trend?.totalRuns)} p-2`}
                    score={summaryData?.current?.totalRuns}
                    topText={"Total Executions"}
                    bottomText={summaryData?.previous?.totalRuns ? "Previous result: " + summaryData?.previous?.totalRuns : "No previous result"}
                    icon={getIcon(summaryData?.trend?.totalRuns)}
                    iconOverlayBody={getDescription(summaryData?.trend?.totalRuns)}
                  />
                </DataBlockBoxContainer>
              </div>
            </Col>
            {dataPointHelpers.isDataPointVisible(frequency) &&
              <Col md={3}>
                <div className={"github-actions-success-rate-contained-data-block"}>
                  <DataBlockBoxContainer showBorder={true}>
                    <ThreeLineScoreDataBlock
                      className={`${getIconColor(summaryData?.trend?.frequencyPerMonth)} p-2`}
                      dataPoint={frequency}
                      score={summaryData?.current?.frequencyPerMonth}
                      topText={"Monthly Frequency"}
                      bottomText={summaryData?.previous?.frequencyPerMonth ? "Previous result: " + summaryData?.previous?.frequencyPerMonth : "No previous result"}
                      icon={getIcon(summaryData?.trend?.frequencyPerMonth)}
                      iconOverlayBody={getDescription(summaryData?.trend?.frequencyPerMonth)}
                    />
                  </DataBlockBoxContainer>
                </div>
              </Col>
            }
            <Col md={3}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true}>
                  <ThreeLineScoreDataBlock
                    className={`${getIconColor(summaryData?.trend?.averageDuration)} p-2`}
                    score={summaryData?.current?.averageDurationInSecs ? `${summaryData?.current?.averageDurationInSecs}s` : summaryData?.current?.averageDurationInSecs}
                    topText={"Average Duration"}
                    bottomText={summaryData?.previous?.averageDurationInSecs ? `Previous result: ${summaryData?.previous?.averageDurationInSecs}s` : "No previous result"}
                    icon={getDurationIcon(summaryData?.trend?.averageDuration)}
                    iconOverlayBody={getDescription(summaryData?.trend?.averageDuration)}
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

ApigeeSummaryDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  summaryData:PropTypes.object,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
};

export default ApigeeSummaryDetails;

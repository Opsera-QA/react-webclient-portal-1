import React, {useState} from "react";
import MetricContentDataBlockBase from "../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import { Row,Col } from "react-bootstrap";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLineNumberDataBlock from "../../../../common/metrics/number/ThreeLineNumberDataBlock";

function LeadTimeAndReleaseTraceabilityDataBlock({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const dataPointIdentifiers = {
    duration: "lead-time-and-release-traceability-duration-data-point"
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
        <div className="new-chart m-3 p-0 all-github-actions-data-block" style={{ minHeight: "300px"}}>
          <Row>
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={durationDataPoint}
                      numberData={5}
                      supportingText={"days"}
                      middleText={"Duration"}
                      bottomText={"Goal:4 days"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={frequencyDataPoint}
                      numberData={2}
                      supportingText={"deployments/day"}
                      middleText={"Frequency"}
                      bottomText={"Goal:2/Day"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={timeToFirstCommitDataPoint}
                      numberData={10}
                      supportingText={"days"}
                      middleText={"Time to first commit"}
                      bottomText={"Goal:5 Days"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Applications with longest duration to complete"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top applications with more deployment frequencies/day"}
                  content={"grosmont"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Application with zero/less activity in past few weeks"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Applications with more number of commits"}
                  content={""}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
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

LeadTimeAndReleaseTraceabilityDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default LeadTimeAndReleaseTraceabilityDataBlock;
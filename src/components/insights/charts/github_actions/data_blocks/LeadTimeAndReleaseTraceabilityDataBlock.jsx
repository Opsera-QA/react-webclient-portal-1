import React, {useState} from "react";
import MetricContentDataBlockBase from "../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import { Row,Col } from "react-bootstrap";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLineNumberDataBlock from "../../../../common/metrics/number/ThreeLineNumberDataBlock";
import H4FieldSubHeader from "../../../../common/fields/subheader/H4FieldSubHeader";
import H5FieldSubHeader from "../../../../common/fields/subheader/H5FieldSubHeader";

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
                      middleText={"Lead Time"}
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
                      middleText={"Average Time to First Commit"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
          </Row>
          <Row style={{marginTop:'2rem'}}>
            <Col md={6}>
              <H4FieldSubHeader subheaderText={'Top Applications'} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"High Lead Time"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"High Deployment Frequency"}
                  content={"grosmont"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Minimal/No activity in last few weeks"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Highest Commits"}
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
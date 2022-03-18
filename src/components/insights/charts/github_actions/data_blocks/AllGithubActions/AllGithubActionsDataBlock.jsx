import React, {useContext, useState} from "react";
import MetricContentDataBlockBase from "../../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import { Row,Col } from "react-bootstrap";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../../../common/modal/modalLogs";
import TwoLinePercentageDataBlock from "../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import BuildStatisticsActionableInsightsTable
  from "../../../opsera/build_and_deploy_statistics/build_statistics/BuildStatisticsActionableInsightsTable";
import SuccessPercentActionableInsights from "./SuccessPercent/SuccessPercentActionableInsights";
import SuccessExecutionsActionableInsights from "./SuccessExecutions/SuccessExecutionsActionableInsights";
import FailedExecutionsActionableInsights from "./FailedExecutions/FailedExecutionsActionableInsights";

function AllGithubActionsDataBlock({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [metrics, setMetrics] = useState([]);

  const toastContext = useContext(DialogToastContext);

  const onSuccessPercentRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Release Traceability: Success %`}
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
        titleText={`Release Traceability: Success`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <SuccessExecutionsActionableInsights kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
        </div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const onFailedExecutionsRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Release Traceability: Failed`}
        showToasts={true}
        isLoading={false}
      >
        <div className={"p-3"}>
          <FailedExecutionsActionableInsights kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
        </div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getChartBody = () => {
    return (
      <>
        <div className="new-chart m-3 p-0 all-github-actions-data-block" style={{ minHeight: "300px"}}>
          <Row>
            <Col md={4}>
              <div className={"github-actions-success-rate-contained-data-block"}>
                <DataBlockBoxContainer showBorder={true} onClickFunction={() => onSuccessPercentRowSelect()}>
                  <div className={"p-3"}>
                    <TwoLinePercentageDataBlock dataPoint={dataPointHelpers.getDataPoint(
                        kpiConfiguration?.dataPoints,
                        "all-github-actions-success-data-point"
                    )} percentage={98} subtitle={"Goal: 95%"} />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
            <Col md={4}>
              <DataBlockBoxContainer showBorder={true} onClickFunction={() => onSuccessExecutionsRowSelect()}>
                <TwoLineScoreDataBlock
                  className="p-3"
                  score={98}
                  subtitle={"Total Success Executions"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={4}>
              <DataBlockBoxContainer showBorder={true} onClickFunction={() => onFailedExecutionsRowSelect()}>
                <TwoLineScoreDataBlock
                  className="p-3"
                  score={2}
                  subtitle={"Total Failed Executions"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top applications with higher success rate"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top applications with higher failure rate"}
                  content={"grosmont"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Application with Complex Builds (based on duration and size of logs)"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Top most common reasons of failure"}
                  content={
                    <div style={{display: "grid"}}>
                      <span>Missing File or directory</span>
                      <span>Incorrect Configuration</span>
                    </div>
                  }
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

AllGithubActionsDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default AllGithubActionsDataBlock;
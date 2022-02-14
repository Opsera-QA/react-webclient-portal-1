import React, {useState} from "react";
import {METRIC_QUALITY_LEVELS} from "../../../common/metrics/text/MetricTextBase";
import MetricsTextWithBodyContent from "../../../common/metrics/text/MetricsTextWithBodyContent";
import { Row,Col } from "react-bootstrap";
import SuccessRateContainedDataBlock
    from "components/common/metrics/data_blocks/success/success_rate/SuccessRateContainedDataBlock";
import TwoLineScoreDataBlock from "../../../common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import ModalLogs from "../../../common/modal/modalLogs";
import "./AllGitHubActionsDataBlock.css";

function AllGithubActionsDataBlock(
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    setKpis,
    showSettingsToggle,
) {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [metrics, setMetrics] = useState([]);

    const getChartBody = () => {
        return (
            <>
                <div className="new-chart m-3 p-0 all-github-actions-data-block" style={{ minHeight: "300px"}}>
                    <Row>
                        <Col md={4}>
                            <div className={"github-actions-success-rate-contained-data-block"}>
                                <SuccessRateContainedDataBlock
                                    qualityLevel={METRIC_QUALITY_LEVELS.SUCCESS}
                                    successPercentage={98}
                                    bottomText={"GOAL: 95%"}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <DataBlockBoxContainer showBorder={true}>
                                <TwoLineScoreDataBlock
                                    className="p-3"
                                    score={98}
                                    subtitle={"Total Success Executions"}
                                />
                            </DataBlockBoxContainer>
                        </Col>
                        <Col md={4}>
                            <DataBlockBoxContainer showBorder={true}>
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
                                <MetricsTextWithBodyContent
                                    titleText={"Top applications with higher success rate"}
                                    contentText={"oswestry"}
                                />
                            </DataBlockBoxContainer>
                        </Col>
                        <Col md={6}>
                            <DataBlockBoxContainer showBorder={true}>
                                <MetricsTextWithBodyContent
                                    titleText={"Top applications with higher failure rate"}
                                    contentText={"grosmont"}
                                />
                            </DataBlockBoxContainer>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'1rem'}}>
                        <Col md={6}>
                            <DataBlockBoxContainer showBorder={true}>
                                <MetricsTextWithBodyContent
                                    titleText={"Application with Complex Builds (based on duration and size of logs)"}
                                    contentText={"oswestry"}
                                />
                            </DataBlockBoxContainer>
                        </Col>
                        <Col md={6}>
                            <DataBlockBoxContainer showBorder={true}>
                                <MetricsTextWithBodyContent
                                    titleText={"Top most common reasons of failure"}
                                    contentText={
                                        <div style={{display: "grid"}}>
                                            <span>Missing File or directory</span>
                                            <span>Incorrect Configuration</span>
                                        </div>}
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
    bars: PropTypes.any,
    xScale: PropTypes.any,
    yScale: PropTypes.any,
    showSettingsToggle: PropTypes.bool,
};

export default AllGithubActionsDataBlock;
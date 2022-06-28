import React, {useContext} from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig } from 'components/insights/charts/charts-views';
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../QuickDeployLineChartConfig";
import MetricPercentageText from "components/common/metrics/percentage/MetricPercentageText";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import { goalSuccessColor } from "../../../../charts/charts-views";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import MetricScoreText from "../../../../../common/metrics/score/MetricScoreText";
import QuickDeployTotalExecutionsDataBlock
    from "../../quick_deploy_statistics/data_blocks/QuickDeployTotalExecutionsDataBlock";
import QuickDeploySuccessRateDataBlock from "../../quick_deploy_statistics/data_blocks/QuickDeploySuccessRateDataBlock";
import QuickDeployTotalComponentsDataBlock
    from "../../quick_deploy_statistics/data_blocks/QuickDeployTotalComponentsDataBlock";
import {faArrowCircleUp} from "@fortawesome/free-solid-svg-icons";

// TODO: Pass in relevant data and don't use hardcoded data
function SuccessRateDataBlockContainer({ metricData, chartData, kpiConfiguration, dashboardData, goalsData, dataPoint }) {
    // const toastContext = useContext(DialogToastContext);
    //
    // const onRowSelect = () => {
    //     toastContext.showOverlayPanel(
    //         <FullScreenCenterOverlayContainer
    //             closePanel={closePanel}
    //             showPanel={true}
    //             showToasts={true}
    //             titleIcon={faTable}
    //             isLoading={false}
    //         >
    //             <div className={"p-3"}>
    //                 <DeploymentStatisticsActionableInsightsTable kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} />
    //             </div>
    //         </FullScreenCenterOverlayContainer>
    //     );
    // };
    //
    // const closePanel = () => {
    //     toastContext.removeInlineMessage();
    //     toastContext.clearOverlayPanel();
    // };

    let successChartData = [
        {
            "id": "success rate",
            "data": chartData?.deploySuccess
        }
    ];

    const getLeftDataBlock = () => {
        return (
            <ThreeLineDataBlockBase
                className={"build-and-deployment-statistics-kpi"}
                topText={"Total Executions"}
                middleText={
                    <MetricScoreText
                        score={metricData?.deploy?.successPercent}
                        dataPoint={dataPoint}
                        className={"metric-block-content-text"}
                    />}
                dataPoint={dataPoint}
            />
        );
    };
    const getmiddleDataBlock = () => {
        return (
            <ThreeLineDataBlockBase
                className={"build-and-deployment-statistics-kpi"}
                topText={"Success Rate"}
                middleText={
                    <MetricPercentageText
                        percentage={metricData?.deploy?.successPercent}
                        dataPoint={dataPoint}
                        className={"metric-block-content-text"}
                    />}
                dataPoint={dataPoint}
            />
        );
    };
    const getRightDataBlock = () => {
        return (
            <ThreeLineDataBlockBase
                className={"build-and-deployment-statistics-kpi"}
                topText={"Total Components"}
                middleText={
                    <MetricScoreText
                        score={metricData?.deploy?.successPercent}
                        dataPoint={dataPoint}
                        className={"metric-block-content-text"}
                    />}
                dataPoint={dataPoint}
            />
        );
    };

    const getSuccessTrendChart = () => {
        return(
            <div className="new-chart m-3 p-0" style={{height: "300px"}}>
                <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
                    Goal<b> ({goalsData} %)</b>{" "}
                    <IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />
                    <br></br>
                    Success Rate{" "}
                    <IconBase icon={faSquare} iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} iconSize={"lg"} />
                </div>
                <ResponsiveLine
                    data={successChartData}
                    {...defaultConfig("", "Date",
                        false, true, "wholeNumbers", "monthDate2")}
                    {...config()}
                    tooltip={(node) => (
                        <ChartTooltip
                            titles={["Date Range", "Number of Deployments", "Success Rate"]}
                            values={[node.point.data.range, node.point.data.total, String(node.point.data.y) + " %"]}
                        />
                    )}
                    markers={[
                        {
                            axis: 'y',
                            value: goalsData,
                            lineStyle: { stroke: goalSuccessColor, strokeWidth: 2 },
                            legend: '',
                        }
                    ]}
                />
            </div>
        );
    };

    return (
        <Container>
            <Row className="align-items-center">
                <Col sm={3} className={"p-2"}>
                    <Row lg={12} className={"my-3"}>
                        <QuickDeployTotalExecutionsDataBlock
                            score={
                                metricData?.total
                            }
                            icon={faArrowCircleUp}
                            className={"green"}
                            lastScore={0}
                            //iconOverlayBody={getDescription(metrics[0].overallLowTrend)}
                        />
                    </Row>
                    <Row lg={12} className={"my-3"}>
                        <QuickDeploySuccessRateDataBlock
                            score={
                                metricData?.success
                            }
                            icon={faArrowCircleUp}
                            className={"green"}
                            lastScore={0}
                            //iconOverlayBody={getDescription(metrics[0].overallMediumTrend)}
                        />
                    </Row>
                    <Row lg={12} className={"mb-3"}>
                        <QuickDeployTotalComponentsDataBlock
                            score={
                                metricData?.totalComponents
                            }
                            icon={faArrowCircleUp}
                            className={"green"}
                            lastScore={0}
                            //iconOverlayBody={getDescription(metrics[0].overallHighTrend)}
                        />
                    </Row>
                </Col>
                <Col sm={9} className={"p-2"}>
                    {getSuccessTrendChart()}
                </Col>
            </Row>
        </Container>
    );
}

SuccessRateDataBlockContainer.propTypes = {
    metricData: PropTypes.object,
    chartData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    goalsData: PropTypes.number,
    dataPoint: PropTypes.object
};

export default SuccessRateDataBlockContainer;

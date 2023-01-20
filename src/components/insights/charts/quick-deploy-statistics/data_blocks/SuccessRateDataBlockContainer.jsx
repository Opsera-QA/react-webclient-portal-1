import React, {useContext} from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import {defaultConfig, goalSuccessColor} from 'components/insights/charts/charts-views';
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "../QuickDeployLineChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import QuickDeployTotalExecutionsDataBlock
    from "./QuickDeployTotalExecutionsDataBlock";
import QuickDeploySuccessRateDataBlock from "./QuickDeploySuccessRateDateBlock";
import QuickDeployTotalComponentsDataBlock
    from "./QuickDeployTotalComponentsDataBlock";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import QuickDeployTotalSuccessActionableOverlay from "../actionable_insights/QuickDeployTotalSuccessActionableOverlay";
import QuickDeployTotalExecutionsActionableOverlay
    from "../actionable_insights/QuickDeployTotalExecutionsActionableOverlay";
import QuickDeployTotalComponentsActionableOverlay
    from "../actionable_insights/QuickDeployTotalComponentsActionableOverlay";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";

// TODO: Pass in relevant data and don't use hardcoded data
function SuccessRateDataBlockContainer({ metricData, chartData, kpiConfiguration, dashboardData, goalsData, dataPoint1, dataPoint2,dataPoint3,dataPoint4 }) {
    const toastContext = useContext(DialogToastContext);

    const onRowSelect = (stat) => {
        if(stat === "success") {
            console.log("here");
            toastContext.showOverlayPanel(
                <QuickDeployTotalSuccessActionableOverlay
                    kpiConfiguration={kpiConfiguration}
                    dashboardData={dashboardData}
                />
            );
        }
        else if(stat === "executions") {
            toastContext.showOverlayPanel(
                <QuickDeployTotalExecutionsActionableOverlay
                    kpiConfiguration={kpiConfiguration}
                    dashboardData={dashboardData}
                />
            );
        }
        else if(stat === "components") {
            toastContext.showOverlayPanel(
                <QuickDeployTotalComponentsActionableOverlay
                    kpiConfiguration={kpiConfiguration}
                    dashboardData={dashboardData}
                />
            );
        }
    };
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

    const getIcon = (severity) => {
        switch (severity) {
            case "red":
                return faArrowCircleDown;
            case "green":
                return faArrowCircleUp;
            case "light-gray-text-secondary":
                return faMinusCircle;
            default:
                break;
        }
    };

    return (
        <Container>
            <Row className="align-items-center">
                <Col sm={3} className={"p-2"}>
                    {dataPointHelpers.isDataPointVisible(dataPoint2) &&
                        <Row lg={12} className={"my-3"}>
                            <QuickDeployTotalExecutionsDataBlock
                                score={
                                    metricData?.total
                                }
                                icon={getIcon(metricData?.executionsTrend?.trend)}
                                className={metricData?.executionsTrend?.trend}
                                lastScore={metricData?.prevTotal}
                                onSelect={() => onRowSelect("executions")}
                                //iconOverlayBody={getDescription(metrics[0].overallLowTrend)}
                            />
                        </Row>}
                    {dataPointHelpers.isDataPointVisible(dataPoint1) &&
                        <Row lg={12} className={"my-3"}>
                            <QuickDeploySuccessRateDataBlock
                                score={
                                    metricData?.success
                                }
                                icon={getIcon(metricData?.successTrend?.trend)}
                                className={metricData?.successTrend?.trend}
                                lastScore={metricData?.prevSuccess}
                                onSelect={() => onRowSelect("success")}
                                //iconOverlayBody={getDescription(metrics[0].overallMediumTrend)}
                            />
                        </Row>
                    }
                    {dataPointHelpers.isDataPointVisible(dataPoint4) &&
                        <Row lg={12} className={"mb-3"}>
                            <QuickDeployTotalComponentsDataBlock
                                score={
                                    metricData?.totalComponents
                                }
                                icon={getIcon(metricData?.componentsTrend?.trend)}
                                className={metricData?.componentsTrend?.trend}
                                lastScore={metricData?.prevComponents}
                                onSelect={() => onRowSelect("components")}
                                //iconOverlayBody={getDescription(metrics[0].overallHighTrend)}
                            />
                        </Row>
                    }
                </Col>
                {dataPointHelpers.isDataPointVisible(dataPoint3) &&
                    <Col sm={9} className={"p-2"}>
                        {getSuccessTrendChart()}
                    </Col>
                }
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
    dataPoint1: PropTypes.object,
    dataPoint2: PropTypes.object,
    dataPoint3: PropTypes.object,
    dataPoint4: PropTypes.object
};

export default SuccessRateDataBlockContainer;
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import {defaultConfig, goalSuccessColor} from "components/insights/charts/charts-views";
import _ from "lodash";
import {faMinus, faSquare} from "@fortawesome/pro-solid-svg-icons";
import config from "./JiraChageFailureRateChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import ChartTooltip from "../../../ChartTooltip";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import {getResultFromKpiConfiguration} from "../../../charts-helpers";
import JiraChangeFailureRateInsightsOverlay from "./JiraChangeFailureRateInsightsOverlay";

function JiraChangeFailureRateLineChartContainer({ chartData, goalsData }) {
    const [maxGoalsValue, setMaxGoalsValue] = useState(goalsData);

    const toastContext = useContext(DialogToastContext);

    useEffect(() => {
        let dataHigh = {x: "", y: 0};
        dataHigh = _.maxBy(chartData, 'y');
        const high = dataHigh?.y > goalsData ? dataHigh?.y : goalsData;
        setMaxGoalsValue(Math.ceil(high));
    }, [goalsData, chartData]);

    let cfrChartData = [
        {
            "id": "cfr",
            "data": chartData
        }
    ];

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const onNodeSelect = (node) => {
        toastContext.showOverlayPanel(
            <JiraChangeFailureRateInsightsOverlay
                data={node?.data?.report || []}
                closePanel={closePanel}
            />
        );
    };


    const getTrendChart = () => {
        return (
            <>
                <div
                    className={"mr-2"}
                    style={{ float: "right", fontSize: "10px" }}
                >
                    Goal<b> ({goalsData})</b>
                    <IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />
                    <div className="row"/>
                    Change Failures{" "}
                    <IconBase icon={faSquare} iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} iconSize={"lg"} />
                </div>
                <ResponsiveLine
                    data={cfrChartData}
                    {...defaultConfig("", "Date",
                        false, true, "numbers", "monthDate2")}
                    {...config()}
                    yScale={{ type: 'linear', min: '0', max: maxGoalsValue, stacked: false, reverse: false }}
                    axisLeft={{
                        tickValues: [0, maxGoalsValue],
                        legend: 'Failures',
                        legendOffset: -38,
                        legendPosition: 'middle'
                    }}
                    onClick={(node) => onNodeSelect(node)}
                    tooltip={(node) => (
                        <ChartTooltip
                            titles={["Date Range", "Total Changes", "Failures"]}
                            values={[node.point.data.range, node.point.data.total, node.point.data.y]}
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
            </>
        );
    };

    return getTrendChart();
}

JiraChangeFailureRateLineChartContainer.propTypes = {
    chartData: PropTypes.object,
};

export default JiraChangeFailureRateLineChartContainer;

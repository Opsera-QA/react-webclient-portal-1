import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveSwarmPlot } from '@nivo/swarmplot';

import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {getDateObjectFromKpiConfiguration} from "../../charts-helpers";
import TooltipWrapper from "../../../../common/tooltip/TooltipWrapper";
import {Badge, OverlayTrigger, Popover} from "react-bootstrap";
import IconBase from "../../../../common/icons/IconBase";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import {METRIC_THEME_CHART_PALETTE_COLORS} from "../../../../common/helpers/metrics/metricTheme.helpers";


function GitLogCommitActivitiesSwarmPlot({ chartData, kpiConfiguration }) {
    const localeTimeFormat = (value) => value.toISOString().substr(0,10);
    const [clickedTicket,setClickedTicket] = useState('');
    const toastContext = useContext(DialogToastContext);
    const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
    const startDate = new Date(dateRange?.start);
    const endDate = new Date(dateRange?.end);
    const diff = Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000);
    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };


    const onNodeSelect = (node) => {
        console.log(node);
        // toastContext.showOverlayPanel(
        //     <JiraChangeFailureRateInsightsOverlay
        //         data={node?.data?.report || []}
        //         closePanel={closePanel}
        //     />
        // );
    };

    const onTicketSelect = (ticketId) => {
        setClickedTicket(ticketId);
    };
    const authors = [];
    const swarmPlotData = chartData?.chartData;
    swarmPlotData.forEach(item=>{
        if(authors.indexOf(item.group) == -1){
            authors.push(item.group);
        }
    });
    let data = swarmPlotData;
    const showVulnerableCommits = (hasSecret, props) => {
        if(hasSecret){
            return <circle r={props.node.size / 2} stroke="palevioletred" strokeWidth={12} />;
        }
    };
    const getToolTipBody = (tooltipText) => {
        return <Popover id="popover-basic">
            <Popover.Content style={{ maxWidth: "500px" }}>
                <div
                    style={{
                        background: "white",
                        padding: "9px 12px",
                        border: "1px solid #ccc"
                    }}
                >
                    {tooltipText?.map((toolTip, i) => (
                        <div key={i}>
                            <strong style={{color:toolTip.color}}> {toolTip.text} </strong>
                        </div>
                    ))}
                </div>
            </Popover.Content>
        </Popover>;

    };

    const getTicketBadges = (jiraData, naTickets) => {
        return <div>
            <div onClick={()=>onTicketSelect("ALL")} className={"badge badge-warning mb-1 pointer mr-1"}>
                <div className={"my-auto mr-1 p-1"}>
                    ALL
                </div>
            </div>
            {jiraData?.map((item, i) => (
                <TooltipWrapper key={i} innerText={item?.status || "NA"}>
                    <div onClick={()=>onTicketSelect(item?.ticketId)} className={"badge badge-info mb-1 pointer mr-1"}>
                        <div className={"my-auto mr-1 p-1"}>
                            {item?.ticketId}
                        </div>
                    </div>
                </TooltipWrapper>
            ))}
            {naTickets?.map((item, i) => (
                <TooltipWrapper key={i} innerText={"N/A"}>
                    <div onClick={()=>onTicketSelect(item)} className={"badge badge-secondary mb-1 pointer mr-1"}>
                        <div className={"my-auto mr-1 p-1"}>
                            {item}
                        </div>
                    </div>
                </TooltipWrapper>
            ))}
        </div>;
    };
    const getCircleComponent = (props) => {
        const hasSecret = props.node.data.commitTypes.hasSecret;
        const isClickedTicket = props.node.data.ticketIds.flat(1).indexOf(clickedTicket) != -1;
        const circleColor = isClickedTicket ?
            METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_3:
            METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1;
        return (
            <OverlayTrigger
                trigger={["hover", "focus"]}
                overlay={getToolTipBody(props.node.data.toolTipTexts)}
            >
                <g transform={`translate(${props.node.x},${props.node.y})`}>
                    {showVulnerableCommits(hasSecret, props)}
                    <circle
                        r={props.node.size / 2}
                        fill={circleColor}
                        stroke={circleColor}
                        strokeWidth={6}
                        onClick={()=>onNodeSelect(props.node.data)}
                        className={"pointer"}
                    />
                </g>
            </OverlayTrigger>
        );
    };
    const getInitials = (text) => {
        text = text.split(" ");
        if(text[1]){
            return text[0].charAt(0) + text[1].charAt(0);
        } else {
            return text[0].charAt(0) + text[0].charAt(1);
        }
    };

    const getCustomTick = (tick) => {
        return (
            <TooltipWrapper innerText={tick.value}>
                <g transform={`translate(${tick.x-45},${tick.y})`}>
                    <circle x={-12} y={-12} cx={2} cy={2} r={24} fill="grey"/>
                    <line stroke="grey" strokeWidth={1.5} y1={-22} y2={-12} />
                    <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                            fill: '#111',
                            fontSize: 20,
                        }}
                    >
                        {getInitials(tick.value)}
                    </text>
                </g>
            </TooltipWrapper>
        );
    };
    const getTrendChart = () => {

        const tickDays = Math.floor(diff/30) + 1;
        return (
            <div
                style={{ height: authors?.length <= 3 ?  450 : 650}}
            >
                {getTicketBadges(chartData?.statisticsData?.jiraData,chartData?.statisticsData?.naTickets)}
                <ResponsiveSwarmPlot
                    height={authors?.length <= 3 ?  450 : 600 }
                    data={data}
                    groups={authors}
                    identity="identifier"
                    value="date"
                    valueFormat={localeTimeFormat}
                    valueScale={{
                        format: '%Y-%m-%dT%H:%M:%S.%LZ',
                        type: 'time',
                    }}
                    layout={"horizontal"}
                    gap={0}
                    spacing={7}
                    size={{
                        key: 'totalCommitScore',
                        values: [
                            200,
                            10000
                        ],
                        sizes: [
                            7,
                            20
                        ]
                    }}
                    forceStrength={4}
                    simulationIterations={100}
                    margin={{ top: 10, right: 50, bottom: 50, left: 75 }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 2,
                        tickRotation: -35,
                        legend: 'date',
                        format: localeTimeFormat,
                        legendPosition: 'middle',
                        legendOffset: 46,
                        tickValues: `every ${tickDays} day`,
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 1,
                        tickPadding: 25,
                        tickRotation: 0,
                        renderTick:getCustomTick
                    }}
                    enableGridY={true}
                    enableGridX={false}
                    circleComponent={getCircleComponent}
                />
            </div>
        );
    };

    return getTrendChart();
}

GitLogCommitActivitiesSwarmPlot.propTypes = {
    chartData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
};

export default GitLogCommitActivitiesSwarmPlot;

import PropTypes from "prop-types";
import config from "./gitLabLeadTimeChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import {defaultConfig, getColor, assignStandardColors, getColorByData, adjustBarWidth} from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { Col, Row } from "react-bootstrap";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import GitLabMeanLeadTimeDataBlock from "../../data_blocks/GitLabMeanLeadTimeDataBlock";
import JiraLeadTimeChartHelpDocumentation from "components/common/help/documentation/insights/charts/JiraLeadTimeChartHelpDocumentation";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {ResponsiveBar} from "@nivo/bar";

function GitLabLeadTimeChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [meanData, setMeanData] = useState({});
    const [issueData, setIssueData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);

        isMounted.current = true;
        loadData(source).catch((error) => {
            if (isMounted?.current === true) {
                throw error;
            }
        });

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, [JSON.stringify(dashboardData)]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                    ?.value;
            const response = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "gitlabLeadTimeForChange",
                kpiConfiguration,
                dashboardTags,
                null,
                null,
                dashboardOrgs
            );
            const dataObject = response?.data?.data[0]?.gitlabLeadTimeForChange?.data[0].leadTimeCommits || [];
            const meanDataObject = response?.data?.data[0]?.gitlabLeadTimeForChange?.data[0] || {};

            assignStandardColors(dataObject, true);

            if (isMounted?.current === true && dataObject.length) {
                setMetrics(dataObject);
                setMeanData(meanDataObject);
            }
        } catch (error) {
            if (isMounted?.current === true) {
                console.error(error);
                setError(error);
            }
        } finally {
            if (isMounted?.current === true) {
                setIsLoading(false);
            }
        }
    };
    const getMaxValue = (data) => {
        let countsMax = Math.max.apply(Math,data.map(function(o){return o.count;}));
        return countsMax;
    };
    const getChartBody = () => {
        if (!Array.isArray(metrics) || metrics.length === 0) {
            return null;
        }

        //TODO: Do these need to be passed in via object props?
        // const MeanLineLayer = ({ nodes, xScale, yScale }) => {
        //     const lineGenerator = line()
        //         .x((d) => xScale(d.data.x))
        //         .y((d) => yScale(d.data.mean));
        //     return (
        //         <path
        //             d={lineGenerator(nodes)}
        //             fill="none"
        //             stroke={METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2}
        //             strokeWidth="3"
        //         />
        //     );
        // };

        // const onNodeSelect = (node) => {
        //     setModalData(
        //         issueData.filter(function (item) {
        //             return item.y === node.data.y && item.date_finished === node.data.date_finished;
        //         })
        //     );
        //     setShowModal(true);
        // };

        const getIcon = (data, previousData) => {
            if (data > previousData) {
                return faArrowCircleUp;
            } else
            if (data < previousData) {
                return faArrowCircleDown;
            } else
            if (data === previousData) {
                return faMinusCircle;
            } else {
                return undefined;
            }
        };

        const getLeadTimeIconColor = (data, previousData) => {
            if (data > previousData) {
                return "red";
            } else
            if (data < previousData) {
                return "green";
            } else
            if (data === previousData) {
                return "light-gray-text-secondary";
            } else {
                return "black";
            }
        };

        const toolTipData = (_id) => {
            if(!_id)
                return '1 Day';
            else if(_id === 'Other')
                return 'Other';
            else
                return (_id+ 1) + ' Days';
        };

        return (
            <>
                <div className="new-chart m-3 p-0" style={{ minheight: "300px", display: "flex" }}>
                    <Row>
                        <Col xl={3} lg={3} md={4} className={"d-flex align-content-around"}>
                            <Row>
                                <Col lg={12} className={"my-3"}>
                                    <GitLabMeanLeadTimeDataBlock data={meanData.currentAvgLeadTime} previousData={meanData.previousAvgLeadTime} getIcon={getIcon} getIconColor={getLeadTimeIconColor}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={9} lg={9} md={8} className={"my-2 p-2 d-flex flex-column align-items-end"}>
                            <ResponsiveBar
                                data={metrics}
                                {...defaultConfig("Frequency (commtis)", "Days",
                                    false, false, "wholeNumbers", "wholeNumbers", true)}
                                {...config(getColorByData, getMaxValue(metrics))}
                                {...adjustBarWidth(metrics)}
                                // onClick={(data) => onRowSelect(data)}
                                tooltip={({ indexValue, value, data, color }) => <ChartTooltip
                                    titles={["Lead Time", "Number of Commits"]}
                                    values={[ toolTipData(data._id), data.count ]}
                                    style={false}
                                    color={color} />}
                            />
                        </Col>
                    </Row>
                </div>
            </>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Gitlab Lead Time"}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                chartHelpComponent={(closeHelpPanel) => <JiraLeadTimeChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
            />
            {/*<ModalLogs*/}
            {/*    header="Jira Lead Time"*/}
            {/*    size="lg"*/}
            {/*    jsonMessage={modalData}*/}
            {/*    dataType="bar"*/}
            {/*    show={showModal}*/}
            {/*    setParentVisibility={setShowModal}*/}
            {/*/>*/}
        </div>
    );
}
GitLabLeadTimeChart.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
    nodes: PropTypes.any,
    xScale: PropTypes.any,
    yScale: PropTypes.any,
};

export default GitLabLeadTimeChart;

import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes, {node} from "prop-types";
import config from "./SalesforceCodeAnalyserChartConfigs";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
    METRIC_THEME_CHART_PALETTE_COLORS,
    METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY
} from "components/common/helpers/metrics/metricTheme.helpers";
import {faArrowCircleDown, faArrowCircleUp, faCircleMinus, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import ChartTooltip from "../../ChartTooltip.jsx";
import {
    adjustBarWidth,
    assignStandardColors, assignStandardLineColors,
    defaultConfig,
    getColor,
    spaceOutServiceNowCountBySeverityLegend,
} from "../../charts-views.js";
import { DialogToastContext } from "contexts/DialogToastContext.js";
import { ResponsiveLine } from "@nivo/line";
import chartsActions from "../../charts-actions";
import BoomiChartHelpDocumentation
    from "../../../../common/help/documentation/insights/charts/BoomiChartHelpDocumentation";
import SalesforceCodeAnalyserCategoryDataBlock from "./data_blocks/SalesforceCodeAnalyserCategoryDataBlock";
import SalesforceCodeAnalyserRuleDataBlock from "./data_blocks/SalesforceCodeAnalyserRuleDataBlock";
import IconBase from "../../../../common/icons/IconBase";
import {faSquare} from "@fortawesome/pro-solid-svg-icons";
import GitlabDeploymentFreqActionableMasterTab
    from "../../gitlab/deployment_frequency/actionable_insights/tabs/GitlabDeploymentFreqActionableMasterTab";
import SalesforceCodeAnalyserCategoryActionableOverlay
    from "./actionable_insights/SalesforceCodeAnalyserCategoryActionableOverlay";
import SalesforceCodeAnalyserRuleActionableOverlay
    from "./actionable_insights/SalesforceCodeAnalyserRuleActionableOverlay";
import SalesforceCodeAnalyserPipelineActionableOverlay
    from "./actionable_insights/SalesforceCodeAnalyserPipelineActionableOverlay";
import aquasecActions from "../../aquasec_security_insights/aquasec.action";
import codeAnalyserActions from "./codeanalyser.action";

function SalesforceCodeAnalyserChart({
                           kpiConfiguration,
                           setKpiConfiguration,
                           dashboardData,
                           index,
                           setKpis,
                           showSettingsToggle,
                       }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [dataBlockValues, setDataBlockValues] = useState([]);
    const [goalsData, setGoalsData] = useState(undefined);
    const toastContext = useContext(DialogToastContext);
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
            let dashboardOrgs =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex(
                        (obj) => obj.type === "organizations",
                    )
                    ]?.value;
            const dashboardTags =
                    dashboardData?.data?.filters[
                        dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
                        ]?.value;
            const response = await codeAnalyserActions.salesforceCodeAnalyserBaseKPI(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
            );
            console.log("base kpi", response);

            let dataObject = response?.data?.data[0]?.lineChart,
                datablock = response?.data?.data[0]?.statisticsData;

            assignStandardColors(dataObject, true);
            spaceOutServiceNowCountBySeverityLegend(dataObject);
            assignStandardLineColors(dataObject, true);
            if (isMounted?.current === true && dataObject) {
                setMetrics(dataObject);
                setDataBlockValues(datablock);
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


    const onRowSelect1 = () => {
        toastContext.showOverlayPanel(
            <SalesforceCodeAnalyserCategoryActionableOverlay
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
            />
        );
    };

    const onRowSelect2 = () => {
        toastContext.showOverlayPanel(
            <SalesforceCodeAnalyserRuleActionableOverlay
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
            />
        );
    };

    const onNodeSelect = () => {
        toastContext.showOverlayPanel(
            <SalesforceCodeAnalyserPipelineActionableOverlay
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
            />
        );
    };


    const getChartBody = () => {
        if (!Array.isArray(metrics) || metrics.length === 0) {
            return null;
        }

        // const dataPoints = kpiConfiguration?.dataPoints;
        // const boomiFrequencyPercentageDataPoint = dataPointHelpers.getDataPoint(
        //     dataPoints,
        //     dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BOOMI_SUCCESS_PERCENTAGE_DATA_POINT,
        // );
        //
        // const boomiSuccessPercentageDataPoint = dataPointHelpers.getDataPoint(
        //     dataPoints,
        //     dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS
        //         .BOOMI_SUCCESS_PERCENTAGE_DATA_POINT,
        // );

        const getIcon = (severity1, severity2) => {
            if (severity1 > severity2) {
                return faArrowCircleUp;
            } else if(severity2 > severity1){
                return faArrowCircleDown;
            }
            else if( severity1 == severity2){
                return faCircleMinus;
            }
            else {
                return "black";
            }
        };

        const getIconColor = (severity1, severity2) => {
            if (severity1 > severity2) {
                return "red";
            } else if(severity2 > severity1){
                return "green";
            }
            else if( severity1 == severity2){
                return "light-gray-text-secondary";
            }
            else {
                return "black";
            }
        };

        const getDataBlocks = () =>{
            return (<><Row className={'pb-1'}>
                <Col>
                        <SalesforceCodeAnalyserCategoryDataBlock
                            data={dataBlockValues?.categories}
                            lastScore={ dataBlockValues?.prevCategories}
                            icon={getIcon(dataBlockValues?.categories, dataBlockValues?.prevCategories)}
                            className={getIconColor(dataBlockValues?.categories, dataBlockValues?.prevCategories)}
                            onSelect={onRowSelect1}
                        />
                </Col>
            </Row><Row className={'pb-1 pt-1'}>
                <Col>
                        <SalesforceCodeAnalyserRuleDataBlock
                            data={dataBlockValues?.rules}
                            lastScore={ dataBlockValues?.prevRules}
                            icon={getIcon(dataBlockValues?.rules, dataBlockValues?.prevRules)}
                            className={getIconColor(dataBlockValues?.rules, dataBlockValues?.prevRules)}
                            onSelect={onRowSelect2}
                        />
                </Col>
            </Row></>);
        };

        const getChart = () =>{
            return(<Row>
                <Col md={12} sm={12} lg={12} >
                    <div className="chart" style={{ height: "354px" }} >
                        <ResponsiveLine
                            data={metrics}
                            {...defaultConfig(
                                "Number of Issues",
                                "Date",
                                false,
                                false,
                                "wholeNumbers",
                                "monthDate2",
                            )}
                            {...config()}
                            {...adjustBarWidth(metrics)}
                            //onClick={onNodeSelect}
                            tooltip={({point, color}) => <ChartTooltip
                                titles = {["Date", "Issues"]}
                                values = {[String(point.data.xFormatted), point.data.y]}
                                color = {color} />}
                        />
                    </div>
                </Col>
            </Row>);
        };


        return (
            <>
                <div className="new-chart m-3">
                    <Row>
                        <Col md={3} sm={6} lg={3}>{getDataBlocks()}</Col>
                        <Col md={9} sm={6} lg={9}>{getChart()}</Col>
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
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                showSettingsToggle={showSettingsToggle}
                launchActionableInsightsFunction={onNodeSelect}
                chartHelpComponent={(closeHelpPanel) => (
                    <BoomiChartHelpDocumentation closeHelpPanel={closeHelpPanel} />
                )}
            />
            <ModalLogs
                header="Mean Time to Resolution"
                size="lg"
                jsonMessage={metrics}
                dataType="bar"
                show={showModal}
                setParentVisibility={setShowModal}
            />
        </>
    );
}

SalesforceCodeAnalyserChart.propTypes = {
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

export default SalesforceCodeAnalyserChart;
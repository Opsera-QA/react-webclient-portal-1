import React, { useState, useEffect, useContext, useRef } from "react";
import {Col, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import {ResponsiveLine} from "@nivo/line";
import ChartTooltip from "../../../ChartTooltip";
import pieChartConfig from "./githubSecurityCompliancePieChartConfig";
import lineChartConfig from "./githubSecurityComplianceLineChartConfig";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import {
    defaultConfig,
    assignStandardColors,
    getColor
} from "../../../charts-views";
import GithubSecurityComplianceHelpDocumentation
    from "../../../../../common/help/documentation/insights/charts/github/GithubSecurityComplianceHelpDocumentation";

function GithubSecurityCompliance({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [pieChartMetrics, setPieChartMetrics] = useState([]);
    const [lineChartMetrics, setLineChartMetrics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
                "githubActionsSecurityCompliance",
                kpiConfiguration,
                dashboardTags,
                null,
                null,
                dashboardOrgs
            );
            let dataObject = response?.data ? response?.data?.data[0]?.securityCompliance?.data.workflowPercentage : [];
            const dataObject2 = response?.data ? response?.data?.data[0]?.securityCompliance?.data.workflowCounts : [];
            assignStandardColors(dataObject);
            if (isMounted?.current === true && dataObject) {
                setPieChartMetrics(dataObject);
                setLineChartMetrics(dataObject2);
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

    const getChartBody = () => {
        if (!Array.isArray(pieChartMetrics) || pieChartMetrics.length === 0 ||
            !Array.isArray(lineChartMetrics) || lineChartMetrics.length === 0) {
            return null;
        }

        return (
            <div className="new-chart mb-3" style={{ height: "300px" }}>
                <Row>
                    <Col xl={4} lg={4} md={4} sm={4} className={"mb-3"} style={{ height: "300px" }}>
                            <ResponsivePie
                            data={pieChartMetrics}
                            {...defaultConfig()}
                            {...pieChartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}

                        />
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={8} className={"mb-3"} style={{ height: "300px" }}>
                        <ResponsiveLine
                            data={lineChartMetrics}
                            {...defaultConfig("Number of Workflows", "Date",
                                false, true, "wholeNumbers", "monthDate2")}
                            {...lineChartConfig(getColor)}
                            tooltip={(node) => <ChartTooltip
                                titles = {["Date", node.point.serieId]}
                                values = {[node.point.data.xFormatted, node.point.data.yFormatted]} />}
                        />
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <div>
            <ChartContainer
                title={kpiConfiguration?.kpi_name}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                chartHelpComponent={(closeHelpPanel) => <GithubSecurityComplianceHelpDocumentation closeHelpPanel={closeHelpPanel} />}
            />
        </div>
    );
}

GithubSecurityCompliance.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default GithubSecurityCompliance;

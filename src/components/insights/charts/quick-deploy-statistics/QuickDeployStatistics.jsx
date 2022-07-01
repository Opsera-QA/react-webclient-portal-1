import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import {
    QUICK_DEPLOY_STATISTICS_CONSTANTS as constants
} from "./quickDeploy_kpi_datapoint_identifiers";
import SuccessRateDataBlockContainer from "./data_blocks/SuccessRateDataBlockContainer";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import {dataPointHelpers} from "../../../common/helpers/metrics/data_point/dataPoint.helpers";

const DEFAULT_GOALS = {
    build_success_rate: 90,
    average_builds: 1,
    deployment_success_rate: 90,
    average_deployments: 1,
};

function QuickDeployStatistics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [buildAndDeployMetricData, setBuildAndDeployMetricData] = useState(undefined);
    const [buildAndDeployChartData, setBuildAndDeployChartData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [goalsData, setGoalsData] = useState(undefined);
    const [quickDeploySuccessDataPoint, setQuickDeploySuccessDataPoint] = useState(undefined);
    const [quickDeployChartDataPoint, setQuickDeployChartDataPoint] = useState(undefined);
    const [quickDeployExecutionsDataPoint, setQuickDeployExecutionsDataPoint] = useState(undefined);
    const [quickDeployComponentsDataPoint, setQuickDeployComponentsDataPoint] = useState(undefined);
    const toastContext = useContext(DialogToastContext);

    // TODO: Wire up data pull and pass relevant data down
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

    // TODO: Don't send this complicated object, just send the metric
    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            await loadDataPoints(cancelSource);
            let dashboardTags =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
            console.log("one");
            let dashboardOrgs =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                    ?.value;
            console.log("two");
            let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;
            console.log("three");
            if (goals) {
                setGoalsData(goals);
            } else {
                // kpiConfiguration.filters[
                //     kpiConfiguration.filters.findIndex((obj) => obj.type === "goals")
                //     ].value = DEFAULT_GOALS;
                setGoalsData(DEFAULT_GOALS);
            }
            console.log("four");

            const response = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "quickDeployChartandStatistics",
                kpiConfiguration,
                dashboardTags,
                null,
                null,
                dashboardOrgs
            );

            console.log("response", response);

            const metrics = response?.data?.data[0]?.quickDeployChartandStatistics?.data;
            console.log("mainMetrics", metrics);

            if (isMounted?.current === true && Array.isArray(metrics)) {
                setBuildAndDeployMetricData(metrics[0]?.statisticsData);
                setBuildAndDeployChartData(metrics[0]?.chartData);
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


    const loadDataPoints = async () => {
        const dataPoints = kpiConfiguration?.dataPoints;
        const quickDeployDataPoint1 = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.QUICK_DEPLOY_SUCCESS);
        setQuickDeploySuccessDataPoint(quickDeployDataPoint1);
        const quickDeployDataPoint2 = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.QUICK_DEPLOY_TOTAL_EXECUTIONS);
        setQuickDeployExecutionsDataPoint(quickDeployDataPoint2);
        const quickDeployDataPoint3 = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.QUICK_DEPLOY_COMPONENTS);
        setQuickDeployComponentsDataPoint(quickDeployDataPoint3);
        const quickDeployDataPoint4 = dataPointHelpers.getDataPoint(dataPoints, constants.SUPPORTED_DATA_POINT_IDENTIFIERS.QUICK_DEPLOY_CHART);
        setQuickDeployChartDataPoint(quickDeployDataPoint4);
    };

    const getChartBody = () => {
        if (!buildAndDeployMetricData || !buildAndDeployChartData) {
            return null;
        }
        console.log("chartdate", buildAndDeployMetricData);
        return (
            <Row className={"mx-0 p-2 justify-content-between"}>
                <Col>
                    <SuccessRateDataBlockContainer
                        metricData={buildAndDeployMetricData}
                        chartData={buildAndDeployChartData}
                        kpiConfiguration={kpiConfiguration}
                        dashboardData={dashboardData}
                        goalsData={goalsData?.deployment_success_rate}
                        dataPoint1={quickDeploySuccessDataPoint}
                        dataPoint2={quickDeployExecutionsDataPoint}
                        dataPoint3={quickDeployChartDataPoint}
                        dataPoint4={quickDeployComponentsDataPoint}
                    />
                </Col>
            </Row>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Quick Deploy Metrics"}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
            />
        </div>
    );
}

QuickDeployStatistics.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default QuickDeployStatistics;

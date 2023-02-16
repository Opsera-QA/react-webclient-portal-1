import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import {
    getDeploymentStageFromKpiConfiguration, getResultFromKpiConfiguration, getUseDashboardTagsFromKpiConfiguration,
} from "../../charts-helpers";

import InfoDialog from "../../../../common/status_notifications/info";
import gitlogAction from "../gitlog.action";
import GitLogCommitActivitiesSwarmPlot from "./GitLogCommitActivitiesSwarmPlot";
import JiraChangeFailureRateLineChartContainer
    from "../../jira/line_chart/change_failure_rate/JiraChangeFailureRateLineChartContainer";


function GitLogCommitActivities({
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    setKpis,
 }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metricData, setMetricData] = useState({});
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
    }, []);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
                    ]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[
                    dashboardData?.data?.filters.findIndex(
                        (obj) => obj.type === "organizations",
                    )
                    ]?.value;
                const response = await gitlogAction.getCommitActivities(
                    getAccessToken,
                    cancelSource,
                    kpiConfiguration,
                    dashboardTags,
                    dashboardOrgs,
                );

                const metrics = response?.data?.gitLogCommitActivities?.data;
                if (
                    isMounted?.current === true && metrics?.chartData.length
                ) {
                    setMetricData(metrics);
                } else {

                    setMetricData({});
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
        if (metricData && !metricData?.chartData?.length) {
            return null;
        }
        return (
            <div
                className="new-chart m-3 p-0"
                style={{ minHeight: "450px"}}
            >
                <Col
                    md={12}
                    className={"my-2 p-0"}
                >
                    <GitLogCommitActivitiesSwarmPlot
                        chartData={metricData}
                        kpiConfiguration={kpiConfiguration}
                    />
                </Col>
            </div>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Commit Activities"}
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

GitLogCommitActivities.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
};

export default GitLogCommitActivities;

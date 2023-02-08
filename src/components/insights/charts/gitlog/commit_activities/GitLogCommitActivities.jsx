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
    const [metricData, setMetricData] = useState([]);
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
            const selectedDeploymentStages =
                getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
            const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
            const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
            if(selectedDeploymentStages && jiraResolutionNames?.length && useDashboardTags && dashboardOrgs?.length) {
                const response = await gitlogAction.getCommitActivities(
                    getAccessToken,
                    cancelSource,
                    kpiConfiguration,
                    dashboardTags,
                    dashboardOrgs,
                    jiraResolutionNames
                );

                const metrics = response?.data?.data;

                if (
                    isMounted?.current === true && metrics?.length
                ) {
                    setMetricData(metrics);
                } else {
                    setMetricData([]);
                }
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
        // const selectedDeploymentStages =
        //     getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
        // const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
        // const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);
        // let dashboardOrgs =
        //     dashboardData?.data?.filters[
        //         dashboardData?.data?.filters.findIndex(
        //             (obj) => obj.type === "organizations",
        //         )
        //         ]?.value;
        // if (!selectedDeploymentStages || !jiraResolutionNames?.length || !useDashboardTags || !dashboardOrgs?.length) {
        //     return (
        //         <div className="new-chart mb-3" style={{ height: "300px" }}>
        //             <div className="max-content-width p-5 mt-5"
        //                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        //                 <InfoDialog message="Missing Required Filters. Dashboard Organization tags,Deployment Stages and Jira Resolution Names are Mandatory" />
        //             </div>
        //         </div>
        //     );
        // }
        //
        // if (metricData && !metricData.length) {
        //     return null;
        // }

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
                        chartData={[]}
                    />
                </Col>
            </div>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Dora Rolled up Chart"}
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
